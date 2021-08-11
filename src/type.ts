import { SyntaxType } from './constants'

export interface SyntaxNode {
  type: SyntaxType
  value?: string
}
