import http from 'node:http'
import { ditto } from './pokemon/ditto.mjs'

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/':
          res.setHeader('Content-type', 'text/plain; charset=utf-8')
          return res.end(JSON.stringify(ditto))

        default:
          res.statusCode = 404
          res.setHeader('Content-type', 'text/html; charset=utf-8')
          return res.end('<h1>Error 404</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          // escuchar el evento DATA
          req.on('data', chunk => {
            // chunk dato binario - convertir string
            body += chunk.toString()
          })

          req.on('end', () => {
            // una vez que termina la req, se parsea el bloque de chunks completo
            const data = JSON.parse(body)
            // se puede → llamar a una base de datos para guardar la info, por ejemplo.

            res.writeHead(201, {
              'Content-Type': 'aplication/json; charset=utf-8'
            })

            data.timestamp = Date.now()

            // writeHead escribe el head mientras lo envia.
            // Eso sería como → statusCode = 201; (guarda el recurso, "hacemos de cuenta que, llamamos a la base de datos y guardó el recurso") setHeader ('Content-Type': 'aplication/json; charset=utf-8')
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-type', 'text/html; charset=utf-8')
          return res.end('<h1>Error 404 Not Found</h1>')
      }
  }
}

const server = http.createServer((req, res) => {
  console.log('request received', req.url)
  processRequest(req, res)
})

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
