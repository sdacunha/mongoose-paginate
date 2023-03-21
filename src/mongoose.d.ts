import type * as mongoose from 'mongoose'
import { type PaginationOptions, type PaginationResult } from './types'

declare module 'mongoose' {
  interface Model<T> {
    findPaged: (
      paginationOptions: PaginationOptions,
      filter: mongoose.FilterQuery<T>,
      projection?: mongoose.ProjectionType<T> | null | undefined,
      options?: mongoose.QueryOptions<T> | null | undefined,
      callback?: Callback<T[]> | undefined
    ) => Promise<PaginationResult<T>, T> | void
  }

  interface Aggregate<ResultType> {
    execPaged: (
      options: PaginationOptions,
      callback?: Callback<PaginationResult<ResultType>> | undefined,
    ) => Promise<PaginationResult<ResultType>> | void
  }
}
