import { UseListInputState, useListInput } from 'components/hooks/useListInput'
import { useField, useFormikContext } from 'formik'
import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { countries } from '../prices-list/countryList'
import uniq from 'lodash/uniq'
import { difference, remove } from 'lodash'
import { useSessionStorage } from 'usehooks-ts'
import { useRouter } from 'next/router'
import { Country, CountryListInput } from 'graphql/types'
import { useGetCountriesQuery } from 'graphql/cms-queries/countries.generated'

type State = {
  count: number
  countries: Country[]
  loading: boolean
  error: string
  selected: string[]
  selectAllInCurrentPage(value: boolean): void
  selectAll(value: boolean): void
  setSelected(code: string, value: boolean): void
  refetch(): void
} & UseListInputState

const CountryListContext = createContext<State>(null)

export const CountryManagementListProvider = (props: PropsWithChildren) => {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const state = useListInput({
    page: 1,
    page_size: 50,
    sort_by: 'name',
    sort_order: 1
  })
  const input: CountryListInput = {
    skip: (state.page - 1) * state.pageSize,
    limit: state.pageSize,
    sort_by: state.sortBy,
    sort_order: state.sortOrder,
    filters: state.filters
  }

  if (state.searchTerm) {
    input.search = state.searchTerm
  }
  const { data, loading, error, refetch } = useGetCountriesQuery({
    variables: {
      input: input
    }
  })

  const selectAllInCurrentPage = (checked: boolean) => {
    const codesForCurrentPage = data.getCountries.countries?.map((c) => c.code)
    if (checked) {
      setSelected(uniq([...selected, ...codesForCurrentPage]))
    } else {
      setSelected(difference(selected, codesForCurrentPage))
    }
  }

  const selectAll = (checked: boolean) => {
    if (checked) {
      setSelected(data.getCountries.filteredCodes)
    } else {
      setSelected([])
    }
  }

  return (
    <CountryListContext.Provider
      value={{
        ...state,
        countries: data?.getCountries.countries ?? [],
        count: data?.getCountries.count ?? 0,
        loading: loading,
        error: error?.message,
        selected,
        refetch: refetch,
        selectAll,
        selectAllInCurrentPage,
        setSelected: (code, checked) => {
          if (checked) {
            setSelected(uniq([...selected, code]))
          } else {
            setSelected(selected.filter((c) => c !== code))
          }
        }
      }}
    >
      {props.children}
    </CountryListContext.Provider>
  )
}
const useCountryManagementList = () => {
  const context = useContext(CountryListContext)
  if (!context) {
    throw new Error(
      'Please use CountryManagementListProvider in parent element.'
    )
  }
  return context
}

export default useCountryManagementList
