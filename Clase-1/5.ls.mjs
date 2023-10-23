import fs from 'node:fs/promises'

const dir = '.'

// Callback
// fs.readdir('.', (err, files) => {
//   if (err) {
//     console.error('Error al leer el directorio: ', err)
//     return
//   }

//   files.forEach(file => {
//     console.log(file)
//   })
// })

//Promesas
fs.readdir(dir)
  .then(files => {
    files.forEach(file => {
      console.log(file)
    })
  })
  .catch(err => {
    if (err) {
      console.error('Error al leer el directorio: ', err)
    }
  })
