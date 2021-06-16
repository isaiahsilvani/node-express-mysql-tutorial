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
  const db = dbService.getDbServiceInstance()
  const result = db.insertNewName(name)

  result
  .then(data => response.json({ success: true}))
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