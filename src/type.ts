import { SyntaxType } from './constants'

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
export interface SyntaxNode<T = any> {
  type: SyntaxType
  value?: T
  loc: LocationOptions
}
