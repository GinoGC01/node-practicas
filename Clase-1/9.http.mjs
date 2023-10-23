import http from 'node:http'
import { findAvailablePort } from './10.free-port.mjs'

const desiredPort = process.env.PORT ?? 3000

async function upServer(desiredPort) {
  const server = http.createServer((req, res) => {
    console.log('request received')
    res.end('Hola Mundo - funciona')
  })
  try {
    const port = await findAvailablePort(desiredPort) //promea del puerto disponible
    server.listen(port, () => {
      console.log(`server listening on port http://localhost:${port}`)
    })
  } catch (err) {
    console.log('Error starting server: ', err)
  }
}

upServer(desiredPort)
