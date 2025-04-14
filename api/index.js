import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const app = express()


app.get('/api', (req, res)=>{
    res.send('Hi...')
})


app.listen(PORT, ()=>{
    console.log(`Server is running.`)
})

