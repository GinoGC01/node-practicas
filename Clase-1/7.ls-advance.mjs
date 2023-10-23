import { stat } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import picocolors from 'picocolors'

const folder = process.argv[2] ?? '.'

// función async secuencial
async function ls(folder) {
  let files
  try {
    files = await fs.readdir(folder) // lee el la carpeta que se pasa como argumento
  } catch (error) {
    console.error(picocolors.red(`No se pudo leer el archivo ${folder}`))
    // se elimina el proceso con un error
    process.exit(1)
  }

  const filesPromises = files.map(async file => {
    // se ejecuta el async en paralelo
    const filePath = path.join(folder, file)
    let stats

    try {
      stats = await fs.stat(filePath) // obtiene la información del archivo
    } catch (error) {
      console.error(`No se pudo leer el archivo ${filePath}`)
      // se elimina el proceso con un error
      process.exit(1)
    }

    const isDirectory = stats.isDirectory() // evalúa si es una carpeta o archivo

    const fileType = isDirectory
      ? picocolors.bgCyan('D')
      : picocolors.bgMagenta('F')
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleString()

    return `${picocolors.white(fileType)} - ${picocolors.blue(
      file.padEnd(30)
    )} ${
      fileSize > 1000
        ? picocolors.cyan(fileSize.padStart(20))
        : picocolors.green(fileSize.padStart(20))
    } Kbyte ---- ${picocolors.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filesPromises) // informacion de los archivos del directorio convertidos en promesas

  filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder) // ejecuto
