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
app.delete('/delete/:id', (request, response) => {
  // Get the dbService instance so we can use it's methods
  const db = dbService.getDbServiceInstance()
  // We must pass the idea in from request.params so we can
  // delete the database by ID. Very familiar with this.
  const { id } = request.params

  console.log('fetch request hit')
  // Send the result back to the frontend so we can remove the row from the
  // HTML table in real time!
  const result = db.deleteRowById(id)
  
  result
  .then(data => response.json({ success : true }))
  .catch(err => console.log(err))

})


app.listen(process.env.PORT, () => console.log('app is running'))