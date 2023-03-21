import * as base64url from "base64-url"
import { EJSON } from "bson"

export function encode(obj: unknown): string {
  return base64url.encode(EJSON.stringify(obj))
}

export function decode(str: string): unknown[] {
  if (!str) return []
  return EJSON.parse(base64url.decode(str))
}
