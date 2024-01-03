import { useState, useEffect } from 'react'
import { json2csv } from 'json-2-csv'

const useCsvDownload = ({
  fetchFunc,
  convertFunc = (data) => {
    return data
  },
  getMainData,
  totalCount = 0,
  collection,
  pageSize = 100,
  ...params
}) => {
  const [csvData, setCsvData] = useState([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (csvData.length && !loading) {
      const csvString = json2csv(csvData)

      const csvBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
      const csvUrl = URL.createObjectURL(csvBlob)
      const downloadLink = document.createElement('a')
      downloadLink.href = csvUrl
      downloadLink.setAttribute('download', collection + '.csv') // Any file name
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }, [csvData])

  const downloadCsv = async () => {
    setLoading(true)
    setCsvData([])
    let current = 0,
      hasNextPage = true

    while (hasNextPage) {
      const { data } = await fetchFunc({
        variables: { input: { ...params, skip: current, limit: pageSize } }
      })

      setCsvData((prev) => [
        ...prev,
        ...getMainData(data).map((item) => convertFunc(item))
      ])
      if (data && getMainData(data).length == pageSize) {
        hasNextPage = true
        current += pageSize
      } else {
        hasNextPage = false
      }

      if (totalCount) {
        setProgress(
          parseFloat(Math.min((current / totalCount) * 100, 100).toFixed(0))
        )
      }
    }

    setLoading(false)
    setProgress(0)
  }

  return { downloadCsv, loading, progress }
}

export default useCsvDownload
