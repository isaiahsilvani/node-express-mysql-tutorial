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
}

// Export the DbService class so you can use it. I guess there is no ORM like in Mongoose and PostgreSQL
module.exports = DbService

// The static keyword defines a static method or property for a class. Neither static methods nor static properties can be called on instances of the class. Instead, they're called on the class itself.

// Static methods are often utility functions, such as functions to create or clone objects, whereas static properties are useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances.

