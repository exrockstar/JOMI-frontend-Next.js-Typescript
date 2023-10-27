import { useQueryFilters } from 'components/hooks/useQueryFilters'
import { useRouter } from 'next/router'

const useInstitutionAccessInput = () => {
  const router = useRouter()
  const startDate = router.query.start as string | null
  const institutionId = router.query.id as string | null
  const endDate = router.query.end as string | null
  const { filters, setFilters } = useQueryFilters()
  const { filters: globalFilters, setFilters: setGlobalFilters } =
    useQueryFilters('global')
  return {
    startDate,
    endDate,
    institutionId,
    filters,
    setFilters,
    globalFilters,
    setGlobalFilters
  }
}

export default useInstitutionAccessInput
