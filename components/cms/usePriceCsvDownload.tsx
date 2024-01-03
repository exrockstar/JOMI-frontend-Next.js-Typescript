import { useState, useEffect } from 'react'
import { json2csv } from 'json-2-csv'
import { usePricesByCountryLazyQuery } from 'graphql/cms-queries/prices-list.generated'
import currency from 'currency.js'

const usePriceCsvDownload = ({ pageSize = 100, totalCount = 0, ...params }) => {
  const [csvData, setCsvData] = useState([])
  const [loading, setLoading] = useState(false)
  const [defaultPrices, setDefaultPrices] = useState([])
  const [progress, setProgress] = useState(0)

  const [fetchFunc] = usePricesByCountryLazyQuery({ fetchPolicy: 'no-cache' })

  const convertFunc = (data) => {
    let printData = []
    data.map((item) => {
      printData[item.product.toUpperCase()] = {
        ...printData[item.product.toUpperCase()]
      }

      printData[item.product.toUpperCase()][
        item.interval ? item.interval.toLowerCase() + 'ly' : 'N/A'
      ] = currency(item.unit_amount, {
        fromCents: true
      }).format({ precision: 0 })
    })

    return { ...printData }
  }

  useEffect(() => {
    if (csvData.length && !loading) {
      const totalCsv = [
        { 'COUNTRY (CODE)': 'Default Prices', ...convertFunc(defaultPrices) },
        ...csvData
      ]

      let firstLine = ['COUNTRY (CODE)'],
        secondLine = ['Interval']

      Object.keys(totalCsv[0]).map((item) => {
        if (typeof totalCsv[0][item] == 'object') {
          const intervals = Object.keys(totalCsv[0][item])
          firstLine.push(item)
          if (intervals.length == 2) firstLine.push('')
          secondLine.push(...intervals)
        }
      })

      let csvString = json2csv(totalCsv).split('\n')
      csvString[0] = firstLine.join(',') + '\n' + secondLine.join(',')
      let totalStr = csvString.join('\n')

      const csvBlob = new Blob([totalStr], { type: 'text/csv;charset=utf-8;' })
      const csvUrl = URL.createObjectURL(csvBlob)
      const downloadLink = document.createElement('a')
      downloadLink.href = csvUrl
      downloadLink.setAttribute('download', 'price.csv')
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

      setDefaultPrices(data?.pricesByCountry.defaultPrices ?? [])

      const countries = data?.pricesByCountry.countries ?? []

      setCsvData((prev) => [
        ...prev,
        ...countries.map((item) => {
          return {
            'COUNTRY (CODE)': `${item.name} - (${item.code})`,
            ...convertFunc(item.prices)
          }
        })
      ])

      if (data && countries.length == pageSize) {
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

export default usePriceCsvDownload
