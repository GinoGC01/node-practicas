import http from 'node:http'
import fs from 'node:fs'

const desiredPort = process.env.PORT ?? 3000

// procesa la request
function processRequest(req, res) {
  res.setHeader('Content-type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.end('<h1>Bienvenido a mi página de inicio</h1>')
  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto</h1>')
  } else if (req.url === '/imagen-prueba-01.png') {
    fs.readFile('./imagen-prueba.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 INTERNAL SERVER ERROR</h1>')
      } else {
        res.setHeader('Content-type', 'image/png')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404 // not found
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer((req, res) => {
  console.log('request received', req.url)
  processRequest(req, res)
})

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
