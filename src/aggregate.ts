import { type PipelineStage, type Aggregate, type Callback } from 'mongoose'
import { generateCursorQuery } from './query'
import { prepareResponse } from './response'
import { type PaginationOptions, type PaginationResult } from './types'

export function execPaged (this: Aggregate<unknown>, paginationOptions: PaginationOptions, callback?: Callback<PaginationResult<unknown> | null> | undefined): void | Promise<PaginationResult<unknown>> {
  const userPipeline = this.pipeline()
  const hasProjectsWithoutId = userPipeline
    .filter((item) => Object.keys(item).includes('$project'))
    .filter((item) => (item as PipelineStage.Project)?.$project?.['_id'] === 0)
  if (hasProjectsWithoutId.length) {
    throw new Error('Pipeline has $project that exclude _id, aggregatePaged requires _id')
  }

  const newPipeline: Aggregate<
  Array<{
    results: unknown[]
    totalCount: [{ count: number }]
  }> | unknown[]> = this.model().aggregate()
  const sort = paginationOptions.sortOptions ?? {}
  const match = generateCursorQuery(paginationOptions)
  const shouldSkip = Object.keys(match).length > 0

  newPipeline.append(...userPipeline.filter((item) => !Object.keys(item).includes('$sort')))
  newPipeline.facet({
    results: [
      ...(shouldSkip ? [{ $match: match }] : []),
      { $sort: sort },
      { $limit: paginationOptions.limit + 1 }
    ],
    totalCount: [
      {
        $count: 'count'
      }
    ]
  })

  if (!callback) {
    return new Promise((resolve, reject) => {
      newPipeline.exec().then((response) => {
        const [result] = (response || []) as Array<{
          results: unknown[]
          totalCount: [{
            count: number
          }]
        }>
        const { results, totalCount } = result ?? {
          results: [],
          totalCount: [{ count: 0 }]
        }
        const countResult = totalCount || [{ count: 0 }]
        resolve(prepareResponse(results, paginationOptions, countResult[0]?.count || 0))
      }).catch((err) => {
        reject(err)
      })
    })
  }
  newPipeline.exec().then((response) => {
    const [result] = (response || []) as Array<{
      results: unknown[]
      totalCount: [{
        count: number
      }]
    }>
    const { results, totalCount } = result ?? {
      results: [],
      totalCount: [{ count: 0 }]
    }
    const countResult = totalCount || [{ count: 0 }]
    callback(null, prepareResponse(results, paginationOptions, countResult[0]?.count || 0))
  }).catch((err) => {
    callback(err, null)
  })
};
