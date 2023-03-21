import { type Aggregate, type Callback } from 'mongoose'
import { type PaginationOptions, type PaginationResult } from './types'

export function execPaged (this: Aggregate<unknown>, _paginationOptions: PaginationOptions, callback?: Callback<PaginationResult<unknown> | null> | undefined): void | Promise<PaginationResult<unknown>> {
  if (callback === undefined || callback === null) {
    return new Promise((resolve, reject) => {
      this.exec().then((docs) => {
        resolve({
          docs: docs as unknown[]
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }
  this.exec().then((docs) => {
    callback(null, { docs: docs as unknown[] })
  }).catch((err) => {
    callback(err, null)
  })
};
