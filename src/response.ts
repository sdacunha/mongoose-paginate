import get from "lodash/get"
import { normalizeSortOptions } from "./query"
import { PaginationResult, PaginationOptions, SortOptions } from "./types"
import { encode } from "./utils"

function prepareCursor<T>(doc: T, sortOptions: SortOptions): string {
  const keysExceptId = Object.keys(sortOptions).filter((key) => key !== "_id")
  const values = keysExceptId.map((key) => get(doc, key))
  return encode([...values, (doc as { _id: string })["_id"]])
}

export function prepareResponse<T>(_docs: T[], options: PaginationOptions, count: number): PaginationResult<T> {
  const hasMore = options.limit && _docs.length > options.limit
  const sortOptions = normalizeSortOptions(options.sortOptions)
  if (hasMore) {
    _docs.pop()
  }
  const docs = options.previous ? _docs.reverse() : _docs

  const hasPrevious = !!(options.next ?? (options.previous && hasMore))
  const hasNext = !!(options.previous ?? hasMore)
  const next = hasNext ? prepareCursor(docs[docs.length - 1], sortOptions ?? {}) : undefined
  const previous = hasPrevious ? prepareCursor(docs[0], sortOptions ?? {}) : undefined

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
