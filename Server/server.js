import express from 'express'
import https from 'https'
import fs from 'fs'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

import { router as jokeRoute } from './API/Routes/joke.js'
import { router as chatRoute } from './API/Routes/chat.js'

const app = express()
const httpPort = process.env.HTTP_PORT
// const httpsPort = process.env.HTTPS_PORT

// const options = {
//   key: fs.readFileSync("./data/certs/api.theziver.com.privkey.pem"),
//   cert: fs.readFileSync("./data/certs/api.theziver.com.pem"),
//   passphrase: process.env.PHASSPHRASE
// }

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")

    next()
})


app.use('/joke', jokeRoute)
app.use('/chat', chatRoute)


app.listen(httpPort, () => {
  console.log(`Http listening on port ${httpPort}`)
})

// https.createServer(options, app).listen(httpsPort, () => {
//   console.log(`Https listening on port ${httpsPort}`)
// })