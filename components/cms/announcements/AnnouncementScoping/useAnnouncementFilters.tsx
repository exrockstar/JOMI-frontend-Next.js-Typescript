import { useField, useFormikContext } from 'formik'
import { FilterExpression } from 'graphql/types'

export const useAnnouncementFilters = () => {
  const [field] = useField<FilterExpression[]>('filters')
  const { setFieldValue } = useFormikContext()
  const filters = field.value
  const setFilters = (newValue: FilterExpression[]) => {
    setFieldValue('filters', newValue)
  }
  const addChild = (newExpr: FilterExpression) => {
    if (newExpr.parentId) {
      const lastChildIndex = filters.findIndex((expr) => expr.id === newExpr.parentId)
      const index = lastChildIndex + 1
      let newFilters = [...filters]
      newFilters.splice(index, 0, newExpr)
      setFilters([...newFilters])
    } else {
      setFilters([...filters, newExpr])
    }
  }

  const deleteExpression = (expression: FilterExpression) => {
    const withoutDeleted = filters.filter((expr) => expr.id !== expression.id)
    const withoutChildren = withoutDeleted.filter((expr) => expr.parentId !== expression.id)
    setFilters(withoutChildren)
  }

  const updateExpression = (expression: FilterExpression) => {
    const updated = filters.map((expr) => {
      if (expression.id === expr.id) {
        return expression
      }

      return expr
    })
    console.log(updated)
    setFilters(updated)
  }
  return {
    filters,
    deleteExpression,
    updateExpression,
    addChild
  }
}
