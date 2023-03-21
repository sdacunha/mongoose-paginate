import { encode, decode } from "../src/utils"

describe("encode", () => {
  test("it encodes an empty string successfully", () => {
    expect(encode("")).toBe("IiI") // This is equal to []
  })
  test("it encodes a mongo ObjectId successfully", () => {
    expect(encode("5349b4ddd2781d08c09890f3")).toBe("IjUzNDliNGRkZDI3ODFkMDhjMDk4OTBmMyI")
  }) // This is equal to ["5349b4ddd2781d08c09890f3"]
})

describe("decode", () => {
  test("it returns an empty array for an empty string", () => {
    expect(decode("")).toEqual([]) // This isn't a case we should encounter in the library since we always try to use _id
  })

  test("it decodes a mongo ObjectId successfully", () => {
    expect(decode("WyI1MzQ5YjRkZGQyNzgxZDA4YzA5ODkwaDQiXQ")).toEqual(["5349b4ddd2781d08c09890h4"])
  })
})
