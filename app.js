const express = require('express')
const app = express()
const port = 4000
const dotenv = require('dotenv')
const connectdb = require('./db/connectdb')
const web = require('./routes/web')

dotenv.config({
  path: '.env'
})

connectdb()
app.use('/api',web)


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})