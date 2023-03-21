import { encode, decode } from "../src/utils"

describe("encode", () => {
  test("it encodes an empty string successfully", () => {
    expect(encode("")).toBe("IiI")
  })
  test("it encodes a mongo ObjectId successfully", () => {
    expect(encode("5349b4ddd2781d08c09890f3")).toBe("IjUzNDliNGRkZDI3ODFkMDhjMDk4OTBmMyI")
  })
})

describe("decode", () => {
  test("it throws error for an empty string", () => {
    expect(decode("")).toEqual([])
  })

  test("it decodes a mongo ObjectId successfully", () => {
    expect(decode("WyI1MzQ5YjRkZGQyNzgxZDA4YzA5ODkwaDQiXQ")).toEqual(["5349b4ddd2781d08c09890h4"])
  })
})
