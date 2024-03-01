import express from 'express';
import { chat } from '../../LLM/Langchain.js'
const router = express.Router()

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

router.post('/', async (req, res) => {
    if (!req.body.message) {
        res.status(400).send('Message is required')
    } else {
        res.send(await chat(req.body.message))
    }
})

export { router }