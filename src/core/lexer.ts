import {
  isNewLine,
  isNumber,
  isString,
  isUndefined,
  isWhitespace
} from '../utils'
import { SyntaxType } from '../constants'
import { SyntaxNode } from '../type'

/**
 *
 * @param file filename
 * @param str the source string
 */
export function* lexer(file: string, str: string) {
  // global variables
  let cursor = 0 // the index cursor
  let line = 1
  let column = 1
  let ch = str[cursor]

  function position() {
    return { cursor, line, column }
  }

  // next cursor
  function next() {
    // cursor moving
    cursor++
    ch = str[cursor]
    column++
  }

  // next line
  function nextLine() {
    line++
    column = 1
  }

  function number(): SyntaxNode<number> | null {
    let buffer = ''
    const start = position()
    while (isNumber(ch)) {
      buffer += ch
      next()
    }

    if (buffer) {
      const end = position()
      return {
        type: SyntaxType.Number,
        value: +buffer,
        loc: {
          file,
          start,
          end
        }
      }
    }

    return null
  }

  function string(): SyntaxNode<string> | null {
    let buffer = ''
    const start = position()
    while (isString(ch)) {
      buffer += ch
      next()
    }

    if (buffer) {
      const end = position()
      return {
        type: SyntaxType.String,
        value: buffer,
        loc: {
          file,
          start,
          end
        }
      }
    }

    return null
  }

  function whitespace(): SyntaxNode | null {
    if (!isWhitespace(ch)) {
      return null
    }
    // here is whitespace
    next()
    const start = position()
    while (isWhitespace(ch)) {
      next()
    }
    const end = position()
    return {
      type: SyntaxType.Whitespace,
      loc: {
        file,
        start,
        end
      }
    }
  }

  function eol(): SyntaxNode | null {
    if (isNewLine(ch)) {
      const start = position()
      next()
      nextLine()
      const end = position()
      return {
        type: SyntaxType.Newline,
        loc: {
          file,
          start,
          end
        }
      }
    }

    return null
  }

  function eof(): SyntaxNode | null {
    ch = str[cursor]
    if (isUndefined(ch)) {
      const start = position(),
        end = start
      return {
        type: SyntaxType.EOF,
        loc: {
          file,
          start,
          end
        }
      }
    }
    return null
  }

  while (true) {
    let token = whitespace() || number() || string() || eol() || eof()

    if (token) {
      yield token
      if (token.type === SyntaxType.EOF) {
        break
      }
    } else {
      throw new SyntaxError(
        `unexpected character "${ch}" at ${file}:${line}:${column}`
      )
    }
  }
}
