import express from 'express'
import { ditto } from './pokemon/ditto.mjs'
const PORT = process.env.PORT ?? 3000

const app = express()
app.disable('x-powered-by')

// midelware con node
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'aplication/json') return next()

//   let body = ''

//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     req.body = data // se muta el body del req
//     next()
//   })
// })

// midelware con express
app.use(express.json())

// basado en las rutas
// GET ↓
app.get('/', (req, res) => {
  res.json(ditto)
})

// POST ↓
app.post('/pokemon', (req, res) => {
  // let body = ''
  // req.on('data', chunk => {
  //   body += chunk.toString()
  // })

  // req.on('end', () => {
  //   const data = JSON.parse(body)
  //   data.timestamp = Date.now()
  //   res.status(201).json(data)
  // })
  res.status(201).json(req.body) // devuelve el body del req, en json
})

// 404 error not found
// use = * (global selector)
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
