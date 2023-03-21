import { prepareResponse } from "../src/response"

describe("prepareResponse", () => {
  test("it returns a response with the correct shape when results are empty", () => {
    const response = prepareResponse([], { limit: 10 }, 0)
    expect(response).toHaveProperty("docs")
    expect(response).toHaveProperty("hasPrevious")
    expect(response).toHaveProperty("hasNext")
    expect(response).toHaveProperty("next")
    expect(response).toHaveProperty("previous")
    expect(response).toHaveProperty("count")
  })

  test("it returns a response with the correct shape when results are not empty", () => {
    const response = prepareResponse([{ _id: "5349b4ddd2781d08c09890f3" }], { limit: 10 }, 1)
    expect(response).toHaveProperty("docs")
    expect(response).toHaveProperty("hasPrevious")
    expect(response).toHaveProperty("hasNext")
    expect(response).toHaveProperty("next")
    expect(response).toHaveProperty("previous")
    expect(response).toHaveProperty("count")
  })

  test("it returns the correct value for hasMore when there are more results", () => {
    const response = prepareResponse(
      [{ _id: "5349b4ddd2781d08c09890f3" }, { _id: "5349b4ddd2781d08c09890f4" }],
      { limit: 1 },
      2
    )
    expect(response).toHaveProperty("docs")
    expect(response).toHaveProperty("hasPrevious")
    expect(response).toHaveProperty("hasNext")
    expect(response).toHaveProperty("next")
    expect(response).toHaveProperty("previous")
    expect(response).toHaveProperty("count")
    expect(response.hasNext).toBe(true)
  })

  test("it returns the correct value for hasMore when there are no more results", () => {
    const response = prepareResponse(
      [{ _id: "5349b4ddd2781d08c09890f3" }, { _id: "5349b4ddd2781d08c09890f4" }],
      { limit: 10 },
      2
    )
    expect(response).toHaveProperty("docs")
    expect(response).toHaveProperty("hasPrevious")
    expect(response).toHaveProperty("hasNext")
    expect(response).toHaveProperty("next")
    expect(response).toHaveProperty("previous")
    expect(response).toHaveProperty("count")
    expect(response.hasNext).toBe(false)
  })

  test("returns correct next cursor and previous cursor for first page", () => {
    const response = prepareResponse(
      [
        { _id: "5349b4ddd2781d08c09890f3" },
        { _id: "5349b4ddd2781d08c09890f4" },
        { _id: "5349b4ddd2781d08c09890f5" },
        { _id: "5349b4ddd2781d08c09890f6" },
        { _id: "5349b4ddd2781d08c09890f7" },
        { _id: "5349b4ddd2781d08c09890f8" },
        { _id: "5349b4ddd2781d08c09890f9" },
        { _id: "5349b4ddd2781d08c09890g1" },
        { _id: "5349b4ddd2781d08c09890g2" },
        { _id: "5349b4ddd2781d08c09890g3" },
        { _id: "5349b4ddd2781d08c09890g4" },
        { _id: "5349b4ddd2781d08c09890g5" },
        { _id: "5349b4ddd2781d08c09890g6" },
        { _id: "5349b4ddd2781d08c09890g7" },
        { _id: "5349b4ddd2781d08c09890g8" },
        { _id: "5349b4ddd2781d08c09890g9" },
        { _id: "5349b4ddd2781d08c09890h1" },
        { _id: "5349b4ddd2781d08c09890h2" },
        { _id: "5349b4ddd2781d08c09890h3" },
        { _id: "5349b4ddd2781d08c09890h4" },
        { _id: "5349b4ddd2781d08c09890h5" }
      ],
      { limit: 10 },
      21
    )
    expect(response).toHaveProperty("docs")
    expect(response).toHaveProperty("hasPrevious")
    expect(response).toHaveProperty("hasNext")
    expect(response).toHaveProperty("next")
    expect(response).toHaveProperty("previous")
    expect(response).toHaveProperty("count")
    expect(response.next).toEqual("WyI1MzQ5YjRkZGQyNzgxZDA4YzA5ODkwaDQiXQ")
    expect(response.previous).toEqual(undefined)
  })

  test("returns correct next cursor and previous cursor for non-first page", () => {
    const response = prepareResponse(
      [
        { _id: "5349b4ddd2781d08c09890f3" },
        { _id: "5349b4ddd2781d08c09890f4" },
        { _id: "5349b4ddd2781d08c09890f5" },
        { _id: "5349b4ddd2781d08c09890f6" },
        { _id: "5349b4ddd2781d08c09890f7" },
        { _id: "5349b4ddd2781d08c09890f8" },
        { _id: "5349b4ddd2781d08c09890f9" },
        { _id: "5349b4ddd2781d08c09890g1" },
        { _id: "5349b4ddd2781d08c09890g2" },
        { _id: "5349b4ddd2781d08c09890g3" },
        { _id: "5349b4ddd2781d08c09890g4" },
        { _id: "5349b4ddd2781d08c09890g5" },
        { _id: "5349b4ddd2781d08c09890g6" },
        { _id: "5349b4ddd2781d08c09890g7" },
        { _id: "5349b4ddd2781d08c09890g8" },
        { _id: "5349b4ddd2781d08c09890g9" },
        { _id: "5349b4ddd2781d08c09890h1" },
        { _id: "5349b4ddd2781d08c09890h2" },
        { _id: "5349b4ddd2781d08c09890h3" },
        { _id: "5349b4ddd2781d08c09890h4" },
        { _id: "5349b4ddd2781d08c09890h5" }
      ],
      { limit: 10, next: "WyI1MzQ5YjRkZGQyNzgxZDA4YzA5ODkwaDQiXQ" },
      21
    )
    expect(response).toHaveProperty("docs")
    expect(response).toHaveProperty("hasPrevious")
    expect(response).toHaveProperty("hasNext")
    expect(response).toHaveProperty("next")
    expect(response).toHaveProperty("previous")
    expect(response).toHaveProperty("count")
    expect(response.next).toEqual("WyI1MzQ5YjRkZGQyNzgxZDA4YzA5ODkwaDQiXQ")
    expect(response.previous).toEqual("WyI1MzQ5YjRkZGQyNzgxZDA4YzA5ODkwZjMiXQ")
  })

  test("returns correct previous cursor and next cursor when using previous cursor", () => {
    const response = prepareResponse(
      [
        { _id: "5349b4ddd2781d08c09890f3" },
        { _id: "5349b4ddd2781d08c09890f4" },
        { _id: "5349b4ddd2781d08c09890f5" },
        { _id: "5349b4ddd2781d08c09890f6" },
        { _id: "5349b4ddd2781d08c09890f7" },
        { _id: "5349b4ddd2781d08c09890f8" },
        { _id: "5349b4ddd2781d08c09890f9" },
        { _id: "5349b4ddd2781d08c09890g1" },
        { _id: "5349b4ddd2781d08c09890g2" },
        { _id: "5349b4ddd2781d08c09890g3" },
        { _id: "5349b4ddd2781d08c09890g4" },
        { _id: "5349b4ddd2781d08c09890g5" },
        { _id: "5349b4ddd2781d08c09890g6" },
        { _id: "5349b4ddd2781d08c09890g7" },
        { _id: "5349b4ddd2781d08c09890g8" },
        { _id: "5349b4ddd2781d08c09890g9" },
        { _id: "5349b4ddd2781d08c09890h1" },
        { _id: "5349b4ddd2781d08c09890h2" },
        { _id: "5349b4ddd2781d08c09890h3" },
        { _id: "5349b4ddd2781d08c09890h4" }, // This should be the doc picked for the previous cursor
        { _id: "5349b4ddd2781d08c09890h5" }
      ],
      { limit: 10, previous: "WyI1MzQ5YjRkZGQyNzgxZDA4YzA5ODkwZjIiXQ" },
      21
    )
    expect(response).toHaveProperty("docs")
    expect(response).toHaveProperty("hasPrevious")
    expect(response).toHaveProperty("hasNext")
    expect(response).toHaveProperty("next")
    expect(response).toHaveProperty("previous")
    expect(response).toHaveProperty("count")
    expect(response.next).toEqual("WyI1MzQ5YjRkZGQyNzgxZDA4YzA5ODkwZjMiXQ")
    expect(response.previous).toEqual("WyI1MzQ5YjRkZGQyNzgxZDA4YzA5ODkwaDQiXQ")
  })

  test("returns correct next cursor when more than one field is sorted", () => {
    const response = prepareResponse(
      [
        { _id: "5349b4ddd2781d08c09890f3", somevalue: 1 },
        { _id: "5349b4ddd2781d08c09890f4", somevalue: 1 },
        { _id: "5349b4ddd2781d08c09890f5", somevalue: 1 },
        { _id: "5349b4ddd2781d08c09890f6", somevalue: 1 },
        { _id: "5349b4ddd2781d08c09890f7", somevalue: 2 },
        { _id: "5349b4ddd2781d08c09890f8", somevalue: 2 },
        { _id: "5349b4ddd2781d08c09890f9", somevalue: 2 },
        { _id: "5349b4ddd2781d08c09890g1", somevalue: 2 },
        { _id: "5349b4ddd2781d08c09890g2", somevalue: 2 },
        { _id: "5349b4ddd2781d08c09890g3", somevalue: 2 },
        { _id: "5349b4ddd2781d08c09890g4", somevalue: 2 },
        { _id: "5349b4ddd2781d08c09890g5", somevalue: 2 },
        { _id: "5349b4ddd2781d08c09890g6", somevalue: 2 },
        { _id: "5349b4ddd2781d08c09890g7", somevalue: 2 },
        { _id: "5349b4ddd2781d08c09890g8", somevalue: 3 },
        { _id: "5349b4ddd2781d08c09890g9", somevalue: 4 },
        { _id: "5349b4ddd2781d08c09890h1", somevalue: 2 },
        { _id: "5349b4ddd2781d08c09890h2", somevalue: 2 },
        { _id: "5349b4ddd2781d08c09890h3", somevalue: 2 },
        { _id: "5349b4ddd2781d08c09890h4", somevalue: 2 }, // This should be the doc picked for the previous cursor
        { _id: "5349b4ddd2781d08c09890h5", somevalue: 2 }
      ],
      { limit: 10, previous: "WzEsIjUzNDliNGRkZDI3ODFkMDhjMDk4OTBmMyJd", sortOptions: { somevalue: 1, _id: 1 } },
      21
    )
    expect(response).toHaveProperty("docs")
    expect(response).toHaveProperty("hasPrevious")
    expect(response).toHaveProperty("hasNext")
    expect(response).toHaveProperty("next")
    expect(response).toHaveProperty("previous")
    expect(response).toHaveProperty("count")
    expect(response.next).toEqual("WzEsIjUzNDliNGRkZDI3ODFkMDhjMDk4OTBmMyJd")
    expect(response.previous).toEqual("WzIsIjUzNDliNGRkZDI3ODFkMDhjMDk4OTBoNCJd")
  })
})
