import mongoose from "mongoose"
import { generateCursorQuery, normalizeSortOptions } from "./query"
import { prepareResponse } from "./response"
import { PaginationOptions, PaginationResult } from "./types"

// eslint-disable-next-line consistent-return
export function findPaged(
  this: mongoose.Model<unknown>,
  paginationOptions: PaginationOptions,
  filter: mongoose.FilterQuery<unknown>,
  projection?: mongoose.ProjectionType<unknown> | null | undefined,
  options?: mongoose.QueryOptions<unknown> | null | undefined,
  callback?: mongoose.Callback<PaginationResult<unknown> | null> | undefined
): Promise<PaginationResult<unknown>> | void {
  const sort = normalizeSortOptions(paginationOptions.sortOptions)
  const query = { $and: [generateCursorQuery(paginationOptions), filter || {}] }

  if (!callback) {
    return new Promise((resolve, reject) => {
      this.find(query, projection, { ...options, sort })
        .limit(paginationOptions.limit)
        .then((docs) => {
          this.countDocuments(query)
            .exec()
            .then((count) => {
              resolve(prepareResponse<unknown>(docs, paginationOptions, count))
            })
            .catch((err) => {
              reject(err)
            })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  this.find(query, projection, { ...options, sort })
    .limit(paginationOptions.limit)
    .then((docs) => {
      this.countDocuments(query)
        .exec()
        .then((count) => {
          callback(null, prepareResponse<unknown>(docs, paginationOptions, count))
        })
        .catch((err) => {
          callback(err, null)
        })
    })
    .catch((err) => {
      callback(err, null)
    })
}
