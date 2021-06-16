const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

// database service
const dbService = require('./dbservice')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// CREATE
app.post('/insert', (request, response) => {

})

// READ
app.get('/getAll', (request, response) => {
  response.json({
    success: true
  })
})

// UPDATE

// DELETE


app.listen(process.env.PORT, () => console.log('app is running'))