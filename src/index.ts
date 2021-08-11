import { lexer } from './core/lexer'

for (const token of lexer('777 \t \n 888s s')) {
  console.log(token)
}
