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
  console.log(request.body)
  const { name } = request.body
  // Get the db instance we created
  const db = dbService.getDbServiceInstance()
  // Get the name we just inserted into the database
  // So we can insert it into the frontend
  const result = db.insertNewName(name)
  // Send the result (when the promise is complete) to the frontend so we can 
  // attach it to the HTML table body
  result
  .then(data => response.json({ data: data}))
  .catch(err => console.log(err))
})

// READ
app.get('/getAll', (request, response) => {
  const db = dbService.getDbServiceInstance()
  console.log('fetch request hit')
  const result = db.getAllData()
  result
  .then(data => response.json({ data: data }))
  .catch(err => console.log(err))
})

// UPDATE

// DELETE


app.listen(process.env.PORT, () => console.log('app is running'))