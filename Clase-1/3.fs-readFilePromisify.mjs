//Esto solo en los módulos nativos que no tienen Promesas naivas.

import fs from 'node:fs'
import { promisify } from 'node:util'

const readFilePromises = promisify(fs.readFile)

console.log('leyendo el primer archivo...')
fs.readFilePromises('./archivo.txt', 'utf-8')
.then(text => {
    console.log('texto 1: ', text)
})

console.log('------> hace cosas mientras lee los archivos')

console.log('leyendo el segundo archivo...')
fs.readFilePromises('./archivo2.txt', 'utf-8')
.then(text2 => {
    console.log('texto 2: ', text2)
})