import type mongoose from 'mongoose'
import { type PaginationOptions, type PaginationResult } from './types'

export function findPaged (
  this: mongoose.Model<unknown>,
  _paginationOptions: PaginationOptions,
  filter: mongoose.FilterQuery<unknown>,
  projection?: mongoose.ProjectionType<unknown> | null | undefined,
  options?: mongoose.QueryOptions<unknown> | null | undefined,
  callback?: mongoose.Callback<PaginationResult<unknown> | null> | undefined): Promise<PaginationResult<unknown>> | void {
  if (callback == null) {
    return new Promise((resolve, reject) => {
      this.find(filter, projection, options).then((docs) => {
        resolve({
          docs
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }

  this.find(filter, projection, options).then((docs) => {
    callback(null, { docs })
  }).catch((err) => {
    callback(err, null)
  })
}
