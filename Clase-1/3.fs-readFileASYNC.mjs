import fs from 'node:fs'


console.log('leyendo el primer archivo...')
fs.readFile('./archivo.txt', 'utf-8', (err, text)=>{
    //callback como tercer parámetro
    console.log('texto 1: ', text)
})

console.log('------> hace cosas mientras lee los archivos')

console.log('leyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (err, text2)=>{
    //callback como tercer parámetro
    console.log('texto 2: ', text2)
}) 

