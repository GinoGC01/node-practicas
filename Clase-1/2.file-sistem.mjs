import fs from 'node:fs'

// info de un fichero

const stat = fs.statSync('./archivo.txt')

const fichero = stat.isFile() // binario
const directorio = stat.isDirectory() // binario
const enlaceSimbolico = stat.isSymbolicLink() // binario
const sizeArchivo = stat.size + ' bytes' // size in bytes

console.log(fichero, directorio, enlaceSimbolico, sizeArchivo)
