// This is the file that will connect to the mySQL database and make queries to it!
const mysql = require('mysql')
const dotenv = require('dotenv')
// We don't have multiple instances of the DbService when making these queries, so set a variable to null and use it as a ternary to determine if an instance has already been created or not
let instance = null

dotenv.config()
// This is how one configures the connection to a mySQL database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
})

// The actualy connection happens down here
connection.connect((err) => {
  if (err) {
    console.log(err.message)
  }
  console.log('db ' + connection.state)
})

// Now we need to create a class that will contain all the functions used to make CRUD queries to the database
class DbService {
  // This is a static function. We only want to return one instance of the DbService when using queries. See notes on static keyword
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }
  // We will use async/await to get the data when the page is loaded
  async getAllData() {
    try {
      // Create a new promise since getting data from mySQL is async
      const response = await new Promise((resolve, reject) => {
        // This is the query to select all data from names row in table
        const query = "SELECT * FROM names;";

        //  Use the connection method to actually send the query to the database
        connection.query(query, (err, results) => {
          // If there is an error, reject and throw an error
          if (err) reject(new Error(err.message))
          // If no error, return a promise pbject that is resolved with a given value
          resolve(results)
        })
      })
      // Here is the data that was fetched from mySQL database
      console.log(response)
      return response

    } catch (error) {
      console.log(error)
    }
  }

  async insertNewName(name) {
    try {
      // The current date so we can add it to new row alongside name
      const dateAdded = new Date()
      const insertId = await new Promise((resolve, reject) => {
        // This is how we insert a new row into table names. We're passing parameters (name, date_added) as the parameters.
        // When values come directly from the frontend, we need to "parametize" (?,?) our variables to avoid sql injections
        const query = "INSERT INTO names (name, date_added) VALUES (?,?)";
        connection.query(query, [name, dateAdded],(err, results) => {
          if (err) reject(new Error(err.message))
          resolve(results.insertId)
        })
      })
      // Here is the insertId that was created when we made a new row. Yay!!! :D
      console.log(insertId)
      // Now we return this object with the data to the server, so we can send it to the frontend
      return {
        id: insertId,
        name,
        dateAdded
      }

    } catch (error) {
        console.log(error)
    }
  }

  async deleteRowById(id) {
    try {
      // convert id to typeof number
      id = parseInt(id)
      const response = await new Promise((resolve, reject) => {
        // DELETE THE ROW FROM names WHERE ID IS ? => that's a parameter. 
        const query = "DELETE FROM names WHERE id = ?";
        // Send the query to the database connection
        connection.query(query, [id],(err, results) => {
          if (err) reject(new Error(err.message))
          // return the results when the promise is resolved!
          // But we only want to return the affect rows in the table
          resolve(results.affectedRows)
        })
      })
      
      return response === 1 ? true : false;

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async updateNameById(name, id) {
    try {
      // convert id to typeof number
      console.log('--- db service', name, id)
      id = parseInt(id)
      const response = await new Promise((resolve, reject) => {
        // DELETE THE ROW FROM names WHERE ID IS ? => that's a parameter. 
        const query = "UPDATE names SET name = ? WHERE id = ?";
        // Send the query to the database connection
        connection.query(query, [name, id],(err, results) => {
          if (err) reject(new Error(err.message))
          // return the results when the promise is resolved!
          // But we only want to return the affect rows in the table
          resolve(results)
        })
      })
      console.log(response)
      
      return response === 1 ? true : false;

    } catch (error) {
      console.log(error)
      return false
    }
  }
}

// Export the DbService class so you can use it. I guess there is no ORM like in Mongoose and PostgreSQL
module.exports = DbService

// The static keyword defines a static method or property for a class. Neither static methods nor static properties can be called on instances of the class. Instead, they're called on the class itself.

// Static methods are often utility functions, such as functions to create or clone objects, whereas static properties are useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances.

