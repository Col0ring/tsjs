import {
  isNewLine,
  isNumber,
  isString,
  isUndefined,
  isWhitespace
} from '../utils'
import {
  SyntaxTokenType,
  ValueTokenType,
  OperatorTokenType
} from '../constants'
import { SyntaxToken } from '../type'

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

  function operator(): SyntaxToken<string> | null {
    const operators = {
      '+': OperatorTokenType.Plus,
      '-': OperatorTokenType.Minus,
      '*': OperatorTokenType.Multiplication,
      '/': OperatorTokenType.Division
    }

    const tokenType = operators[ch as keyof typeof operators]
    if (tokenType) {
      const start = position()
      next()
      const end = position()
      return {
        type: tokenType,
        loc: {
          file,
          start,
          end
        }
      }
    }

    return null
  }

  function number(): SyntaxToken<number> | null {
    let buffer = ''
    const start = position()
    while (isNumber(ch)) {
      buffer += ch
      next()
    }

    if (buffer) {
      const end = position()
      return {
        type: ValueTokenType.Number,
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

  function string(): SyntaxToken<string> | null {
    let buffer = ''
    const start = position()
    while (isString(ch)) {
      buffer += ch
      next()
    }

    if (buffer) {
      const end = position()
      return {
        type: ValueTokenType.String,
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

  function whitespace(): SyntaxToken | null {
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
      type: SyntaxTokenType.Whitespace,
      loc: {
        file,
        start,
        end
      }
    }
  }

  function eol(): SyntaxToken | null {
    if (isNewLine(ch)) {
      const start = position()
      next()
      nextLine()
      const end = position()
      return {
        type: SyntaxTokenType.Newline,
        loc: {
          file,
          start,
          end
        }
      }
    }

    return null
  }

  function eof(): SyntaxToken | null {
    ch = str[cursor]
    if (isUndefined(ch)) {
      const start = position(),
        end = start
      return {
        type: SyntaxTokenType.EOF,
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
    let token =
      whitespace() || number() || operator() || string() || eol() || eof()

    if (token) {
      yield token
      if (token.type === SyntaxTokenType.EOF) {
        break
      }
    } else {
      throw new SyntaxError(
        `unexpected character "${ch}" at ${file}:${line}:${column}`
      )
    }
  }
}
