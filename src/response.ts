import { type PaginationResult, type PaginationOptions, type SortOptions } from './types'
import { encode } from './utils'
import get from 'lodash/get'

export function prepareResponse<T> (
  _docs: T[],
  options: PaginationOptions,
  count: number
): PaginationResult<T> {
  const hasMore = options.limit && _docs.length > options.limit
  if (hasMore) {
    _docs.pop()
  }
  const docs = options.previous ? _docs.reverse() : _docs

  const hasPrevious = !!(options.next ?? (options.previous && hasMore))
  const hasNext = !!(options.previous ?? hasMore)
  const next = hasNext ? prepareCursor(docs[docs.length - 1], options.sortOptions ?? {}) : undefined
  const previous = hasPrevious ? prepareCursor(docs[0], options.sortOptions ?? {}) : undefined

  const result: PaginationResult<T> = {
    docs,
    hasPrevious,
    hasNext,
    next,
    previous,
    count
  }

  return result
}

function prepareCursor (doc: InstanceType<any>, sortOptions: SortOptions): string {
  const keysExceptId = Object.keys(sortOptions).filter((key) => key !== '_id')
  const values = keysExceptId.map((key) => get(key, doc))
  return encode([
    ...values,
    doc._id
  ])
}
