import { ref, computed, Ref } from 'vue'

export default function useTable(getPageRef: Ref<number>, getLimitRef: Ref<number>, getSearchRef: Ref<string>, getFilter: any, getSort: any) {
  const setEntries = ref<any[]>([])
  
  const getOffset = computed<number>(() => {
    return (Number(getPageRef.value) * Number(getLimitRef.value)) - Number(getLimitRef.value)
  })
  
  const clearEmptyFilter = computed<any>(() => {
    const newObj = {}
    const newSet = new Set(['', 0])
    for(const key of Object.keys(getFilter)) {
      if(!newSet.has(getFilter[key])) {
        newObj[key] = getFilter[key]
      }
    }
    return newObj
  })
  
  const getEntries = computed<any[]>(() => {
    let newEntries = setEntries.value
    if(getSearchRef.value.length >= 2) {
      newEntries = newEntries.filter((entry: any) => {
        for(const key of Object.keys(entry)) {
          if(typeof Number(entry[key]) === 'number' && Number(entry[key]) === Number(getSearchRef.value)) {
            return true
          } else if(typeof entry[key] === 'string' && entry[key].toLowerCase().includes(getSearchRef.value.toLowerCase())) {
            return true
          }
        }
        return false
      })
    }
    if(Object.entries(clearEmptyFilter.value).length >= 1) {
      for(const ftrKey of Object.keys(clearEmptyFilter.value)) {
        newEntries = newEntries.filter(entry => {
          if(ftrKey in entry) {
            if(typeof Number(entry[ftrKey]) === 'number' && Number(entry[ftrKey]) === Number(getFilter[ftrKey])) {
              return true
            } else if(typeof entry[ftrKey] === 'string' && entry[ftrKey].toLowerCase().includes(getFilter[ftrKey].toLowerCase())) {
              return true
            }
          }
          return false
        })
      }
    }
    if('col' in getSort && 'by' in getSort && getSort.col !== '' && getSort.by !== '') {
      if(getSort.by === 'asc') {
        newEntries.sort((a, b) => {
          if(getSort.col in a && getSort.col in b) {
            if(isNaN(a[getSort.col]) === false && isNaN(b[getSort.col]) === false) {
              return Number(a[getSort.col]) - Number(b[getSort.col])
            } else if(typeof a[getSort.col] === 'string' && typeof b[getSort.col] === 'string') {
              const propA = a[getSort.col].toLowerCase()
              const propB = b[getSort.col].toLowerCase()
              let propRes = 0
              
              if(propA < propB) {
                propRes = -1
              } else if(propA > propB) {
                propRes = 1
              }
              return propRes
            }
          }
        })
      } else if(getSort.by === 'desc') {
        newEntries.sort((a, b) => {
          if(getSort.col in a && getSort.col in b) {
            if(isNaN(a[getSort.col]) === false && isNaN(b[getSort.col]) === false) {
              return Number(b[getSort.col]) - Number(a[getSort.col])
            } else if(typeof a[getSort.col] === 'string' && typeof b[getSort.col] === 'string') {
              const propA = a[getSort.col].toLowerCase()
              const propB = b[getSort.col].toLowerCase()
              let propRes = 0
              
              if(propB < propA) {
                propRes = -1
              } else if(propB > propA) {
                propRes = 1
              }
              return propRes
            }
          }
        })
      }
    }
    newEntries = newEntries.slice(getOffset.value, Number(getOffset.value) + Number(getLimitRef.value))
    return newEntries
  })
  
  const getTotalPages = computed<number>(() => {
    return Math.ceil(Number(setEntries.value.length) / Number(getLimitRef.value))
  })
  
  return {
    setEntries,
    getEntries,
    getTotalPages,
    getOffset,
    clearEmptyFilter
  }
}
