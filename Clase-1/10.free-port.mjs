import net from 'node:net' // protocolo similar a http pero mas ligero

export function findAvailablePort(desiredPort) {
  return new Promise((resolve, reject) => {
    // Nuevo servidor
    const server = net.createServer()
    // Puerto deseado disponible
    server.listen(desiredPort, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })

    //controla el error
    server.on('error', err => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(0).then(port => resolve(port))
      } else {
        reject(err)
      }
    })
  })
}
