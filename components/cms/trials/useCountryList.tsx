import { UseListInputState, useListInput } from 'components/hooks/useListInput'
import { useField, useFormikContext } from 'formik'
import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { countries } from '../prices-list/countryList'
import { TrialSettingCountry } from './TrialSettingCountry'
import uniq from 'lodash/uniq'
import { difference } from 'lodash'
import { useSessionStorage } from 'usehooks-ts'
import { useRouter } from 'next/router'

type State = {
  count: number
  selectedCodes: string[]
  filteredCodes: string[]
  pagedcountries: TrialSettingCountry[]
  showEnabled: boolean
  setShowEnabled(value: boolean): void
  selectAllInCurrentPage(value: boolean): void
  selectCountry(code: string): void
  unselectCountry(code: string): void
  selectAll(value: boolean): void
  setValue(enabled: boolean): void
} & UseListInputState

const CountryListContext = createContext<State>(null)

export const CountryListProvider = (props: PropsWithChildren) => {
  const [field] = useField<string[]>('enabledCountries')
  const { setFieldValue } = useFormikContext()
  const [selectedCodes, setSelectedCodes] = useState<string[]>([])
  const router = useRouter()
  const query = router.query
  const showEnabled = query.showEnabled === 'true'
  const input = useListInput({
    page: 1,
    page_size: 50,
    sort_by: 'label',
    sort_order: 1
  })

  const countryCodes = field.value
  console.log('countryCodes', countryCodes)
  const actual_countries = countries.map<TrialSettingCountry>((country) => {
    return {
      ...country,
      enabled: countryCodes.includes(country.code)
    }
  })
  const sorted = [...actual_countries].sort((a, b) => {
    const valueA = a[input.sortBy] + ''
    const valueB = b[input.sortBy] + ''
    let result = valueA.localeCompare(valueB)

    return input.sortOrder * result
  })
  const stage1Filtered = showEnabled ? sorted.filter((c) => c.enabled) : sorted
  // filter using search term
  const filtered = input.searchTerm
    ? stage1Filtered.filter((c) =>
        new RegExp(input.searchTerm, 'i').exec(c.label)
      )
    : stage1Filtered
  const count = filtered.length
  const filteredCodes = filtered.map((country) => country.code)
  // pagination
  const start = (input.page - 1) * input.pageSize
  const end = input.page * input.pageSize
  const pagedcountries = filtered.slice(start, end)

  const selectAllInCurrentPage = (checked: boolean) => {
    const codesForCurrentPage = pagedcountries.map((c) => c.code)
    if (checked) {
      setSelectedCodes(uniq([...selectedCodes, ...codesForCurrentPage]))
    } else {
      setSelectedCodes(difference(selectedCodes, codesForCurrentPage))
    }
  }

  const selectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCodes(uniq([...selectedCodes, ...filteredCodes]))
    } else {
      setSelectedCodes([])
    }
  }
  const selectCountry = (code: string) => {
    setSelectedCodes(uniq([...selectedCodes, code]))
  }
  const unselectCountry = (code: string) => {
    setSelectedCodes(selectedCodes.filter((c) => c !== code))
  }
  const setValue = (value: boolean) => {
    console.log('value', value)
    if (value) {
      setFieldValue(
        'enabledCountries',
        uniq([...field.value, ...selectedCodes])
      )
    } else {
      const newVal = field.value?.filter(
        (code) => !selectedCodes.includes(code)
      )
      setFieldValue('enabledCountries', newVal)
    }
  }

  const setShowEnabled = (value: boolean) => {
    router.push({
      query: {
        ...query,
        page: 1,
        showEnabled: !!value
      }
    })
  }
  return (
    <CountryListContext.Provider
      value={{
        ...input,
        count,
        filteredCodes,
        selectedCodes,
        pagedcountries,
        showEnabled,
        setShowEnabled,
        selectAllInCurrentPage,
        selectCountry,
        unselectCountry,
        selectAll,
        setValue
      }}
    >
      {props.children}
    </CountryListContext.Provider>
  )
}
const useCountryList = () => {
  const context = useContext(CountryListContext)
  if (!context) {
    throw new Error('Please use CountryListProvider in parent element.')
  }
  return context
}

export default useCountryList
