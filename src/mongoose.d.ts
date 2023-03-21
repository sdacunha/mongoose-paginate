import type * as mongoose from 'mongoose'
import { type PaginationOptions, type PaginationResult } from './types'

declare module 'mongoose' {
  interface Model<T> {
    findPaged: (
      paginationOptions: PaginationOptions,
      filter: mongoose.FilterQuery<T>,
      projection?: mongoose.ProjectionType<T> | null | undefined,
      options?: mongoose.QueryOptions<T> | null | undefined,
      callback?: Callback<PaginationResult<T> | null> | undefined
    ) => Promise<PaginationResult<T>> | void
  }

  interface Aggregate<ResultType> {
    execPaged: (
      options: PaginationOptions,
      callback?: Callback<PaginationResult<ResultType> | null> | undefined,
    ) => Promise<PaginationResult<ResultType>> | void
  }
}
