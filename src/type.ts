import { OperatorTokenType, SyntaxTokenType, ValueTokenType } from './constants'

export interface PositionOptions {
  cursor: number
  line: number
  column: number
}

export interface LocationOptions {
  file: string
  start: PositionOptions
  end: PositionOptions
}
export interface SyntaxToken<T = any> {
  type: SyntaxTokenType | ValueTokenType | OperatorTokenType
  value?: T
  loc: LocationOptions
}
