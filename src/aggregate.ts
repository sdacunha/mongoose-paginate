import { type Aggregate, type Callback } from 'mongoose'
import { type PaginationOptions, type PaginationResult } from './types'

export function execPaged (this: Aggregate<unknown>, _paginationOptions: PaginationOptions, callback?: Callback<PaginationResult<unknown>> | undefined): void | Promise<PaginationResult<unknown>> {
  if (callback == null) {
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
  throw new Error('Invalid arguments - options is required')
};
