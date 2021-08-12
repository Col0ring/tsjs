export enum SyntaxTokenType {
  EOF = 'EOFToken',

  Whitespace = 'WhitespaceToken',
  Newline = 'NewLineToken'
}

export enum ValueTokenType {
  String = 'StringToken',
  Number = 'NumberToken'
}

export enum OperatorTokenType {
  Plus = 'PlusOperatorToken',
  Minus = 'MinusOperatorToken',
  Multiplication = 'MultiplicationOperatorToken',
  Division = 'DivisionOperatorToken'
}
