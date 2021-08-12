export function isUndefined(val: any) {
  return val === undefined
}

export function isNumber(val: any) {
  // simpler and better performance: return val >= '0' && val <= '9'
  return typeof val === 'number' || /^[0-9]+$/.test(val)
}

export function isString(val: any) {
  return typeof val === 'string' && /^[a-zA-Z]+$/.test(val)
}

export function isWhitespace(val: any) {
  // \t and whitespace, not \n
  return val === ' ' || val === '\t'
}

export function isNewLine(val: any) {
  return val === '\n'
}
