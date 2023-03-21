export interface PaginationOptions {
  next?: string
}

export interface PaginationResult<T> {
  docs: T[]
}
