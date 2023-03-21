/* eslint-disable no-unused-vars */
import type * as mongoose from "mongoose"
import { PaginationOptions, PaginationResult } from "./types"

declare module "mongoose" {
  interface Model<T> {
    findPaged: (
      paginationOptions: PaginationOptions,
      filter: mongoose.FilterQuery<T>,
      projection?: mongoose.ProjectionType<T> | null | undefined,
      options?: mongoose.QueryOptions<T> | null | undefined,
      callback?: mongoose.Callback<PaginationResult<T> | null> | undefined
    ) => Promise<PaginationResult<T>> | void
  }

  interface Aggregate<ResultType> {
    execPaged: (
      options: PaginationOptions,
      callback?: mongoose.Callback<PaginationResult<ResultType> | null> | undefined
    ) => Promise<PaginationResult<ResultType>> | void
  }
}
