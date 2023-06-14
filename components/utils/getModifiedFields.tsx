import get from 'lodash/get'
import { flattenObject } from './flattenObject'
import set from 'lodash/set'

export default function getModifiedFields<T>(obj: T, current: T): T {
  const flattened = flattenObject(obj)
  let resultObject: any = {}
  Object.entries(flattened)?.map((entry) => {
    const [key, oldVal] = entry
    const newVal = get(current, key)
    if (newVal !== oldVal) {
      set(resultObject, key, newVal)
    }
  })

  return resultObject as T
}
