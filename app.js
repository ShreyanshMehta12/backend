const express = require('express')
const app = express()
const port = 4000
const dotenv = require('dotenv')
const connectdb = require('./db/connectdb')
const web = require('./routes/web')
const cors = require('cors')
dotenv.config({
  path: '.env'
})
//cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser())

const fileUpload=require("express-fileupload");
//Temp file uploader
app.use(fileUpload({useTempFiles: true}));
//cors
app.use(cors())

app.use(express.json())
connectdb()


app.use('/api',web)



app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})