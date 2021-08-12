import { lexer } from '../src'

const str = `
777 \t \n 8                 88s s
`

for (const token of lexer('./source.js', str)) {
  console.log(token)
}
