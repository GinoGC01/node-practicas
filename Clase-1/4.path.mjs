import path from 'node:path'

console.log('• separador de carpetas: ', path.sep) // barra separadora de carpetas

const filePath = path.join('content', 'subfolder', 'test.txt')
console.log('• Ruta creada: ', filePath)

const keyRute = '../Gino/Gino-subfolder/Prueba.jpg'
const base = path.basename(keyRute, '.jpg')
console.log('• Nombre del archivo en: ', keyBase, '=====>', base)

const extension = path.extname(keyRute)
console.log('• Extención del archivo en: ', keyBase, '=====>', extension)
