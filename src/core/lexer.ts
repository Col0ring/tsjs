import { isNumber, isString, isUndefined, isWhitespace } from '../utils'
import { SyntaxType } from '../constants'
import { SyntaxNode } from '../type'

export function* lexer(str: string) {
  // global variables
  let cursor = 0
  let ch = str[cursor]

  // next cursor
  function next() {
    cursor++
    ch = str[cursor]
  }

  function whitespace(): SyntaxNode | null {
    let buffer = ''
    while (isWhitespace(ch)) {
      buffer += ch
      next()
    }

    if (buffer) {
      return {
        type: SyntaxType.Whitespace,
        value: buffer
      }
    }

    return null
  }

  function number(): SyntaxNode | null {
    let buffer = ''
    while (isNumber(ch)) {
      buffer += ch
      next()
    }

    if (buffer) {
      return {
        type: SyntaxType.Number,
        value: buffer
      }
    }

    return null
  }

  function string(): SyntaxNode | null {
    let buffer = ''
    while (isString(ch)) {
      buffer += ch
      next()
    }

    if (buffer) {
      return {
        type: SyntaxType.String,
        value: buffer
      }
    }

    return null
  }

  function eof(): SyntaxNode | null {
    ch = str[cursor]
    if (isUndefined(ch)) {
      return {
        type: SyntaxType.EOF
      }
    }
    return null
  }

  while (true) {
    // we don't need whitespace
    whitespace()

    let token = number() || string() || /* whitespace() || */ eof()

    if (token) {
      //   if (token.type === SyntaxType.Whitespace) {
      //     continue
      //   }
      yield token
      if (token.type === SyntaxType.EOF) {
        break
      }
    } else {
      throw new SyntaxError(`unexpected character "${ch}" at ${cursor + 1}`)
    }
  }
}
