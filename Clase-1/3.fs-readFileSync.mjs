import fs from 'node:fs'

//Síncrono
const text = fs.readFileSync('./archivo.txt', 'utf-8')
const text2 = fs.readFileSync('./archivo2.txt', 'utf-8') // "key" nombre de archivo, codificación de la infirmación
console.log('leyendo el primer archivo...')
console.log(text)
console.log('leyendo el segundo archivo...')
console.log(text2)
