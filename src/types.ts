import { type Expression } from "mongoose"

export type SortOptions = Record<string, 1 | -1 | Expression.Meta>

export interface PaginationOptions {
  limit: number
  sortOptions?: SortOptions
  next?: string
  previous?: string
}

export interface PaginationResult<T> {
  hasNext?: boolean
  hasPrevious?: boolean
  next?: string
  previous?: string
  count: number
  docs: T[]
}
