import * as base64url from 'base64-url'
import { EJSON } from 'bson'

export function encode (obj: any): string {
  return base64url.encode(EJSON.stringify(obj))
}

export function decode (str: string): any {
  return EJSON.parse(base64url.decode(str))
}
