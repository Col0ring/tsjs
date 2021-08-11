export function isUndefined(val: any) {
  return typeof val === 'undefined' || val === undefined
}

export function isNumber(val: any) {
  return typeof val === 'number' || /^[0-9]+$/.test(val)
}

export function isString(val: any) {
  return typeof val === 'string' && /^[a-zA-Z]+$/.test(val)
}

export function isWhitespace(val: any) {
  // \t \n and whitespace
  return /^\W+$/.test(val)
}
