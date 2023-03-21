import { decode } from './utils'
import { type PaginationOptions, type SortOptions } from './types'
import { type Expression } from 'mongoose'

export const normalizeSortOptions = (sortOptions?: SortOptions): SortOptions => {
  const fields = Object.keys(sortOptions ?? {})
  let newOptions: SortOptions = sortOptions ?? {}
  if (fields.includes('_id')) {
    const keysExceptId = fields.filter((field) => field !== '_id')
    let newSortFields = keysExceptId.reduce((acc, field) => ({
      ...acc,
      [field]: newOptions[field]
    }), {})
    newSortFields = { ...newSortFields, _id: newOptions['_id'] }
    newOptions = newSortFields
  } else if (fields.length > 0) {
    newOptions = { ...newOptions, _id: 1 }
  } else {
    newOptions = { _id: 1 }
  }
  return newOptions
}

const getSortComparer = (isPrevious: boolean, val: -1 | 1 | Expression.Meta): '$gt' | '$lt' => {
  if (val === 1 || val === -1) {
    if (val === 1 || (val === -1 && isPrevious)) {
      return '$gt'
    }
    if (val === -1 || (val === 1 && isPrevious)) {
      return '$lt'
    }
  }
  return '$lt'
}

const generateEqualQuery = (isPrevious: boolean, index: number, key: string, fields: Record<string, 1 | -1 | Expression.Meta>, decoded: any[]): Record<string, unknown> => {
  const keysEqual = Object.keys(fields).slice(0, index)

  const equalQuery = keysEqual.reduce((acc, field, index) => {
    return {
      ...acc,
      [field]: decoded[index]
    }
  }, {})

  const checkQuery = {
    [key]: { [getSortComparer(isPrevious, fields[key] as (1 | -1 | Expression.Meta))]: decoded[index] }
  }

  return {
    ...equalQuery,
    ...checkQuery
  }
}

export function generateCursorQuery (options: PaginationOptions): Record<string, unknown> {
  if (!options.next && !options.previous) {
    return {}
  }

  const cursor = options.previous ?? options.next
  if (!cursor) {
    return {}
  }
  const decoded = decode(cursor)
  const keys = Object.keys(options.sortOptions ?? {})

  const query = keys.map((key, index) => {
    return generateEqualQuery(!!options.previous, index, key, options.sortOptions ?? {}, decoded)
  })

  return { $or: query }
}
