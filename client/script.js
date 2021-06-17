// Add Event Listener to DOMContentLoaded event that will load the table from the database.
// If the table is empty, set the table's innerhtml to no data.
document.addEventListener('DOMContentLoaded', function() {
  // Make a GET request to backend server to get all data from mysql and pass it to loadHTMLTable function
  fetch('http://localhost:5000/getAll')  // Fetch data from backend
  .then(response => response.json())     // THEN, turn response to json format
  .then(data => loadHTMLTable(data['data']))       // THEN, do something with the data that was recieved
  // Since data is an object where everything is held in the data key, we must specify that
})


// This is the function that will send the name input to the database and add it!
const addBtn = document.querySelector('#add-name-btn')   // Grab the button using DOM

// IMPORTANT: Since the delete and edit buttons are dynamically rendered and not part of the DOM on page load, we can't 
// select them like we normally would. We have to make a dynamic click event listener to the body so IF the user clicks 
// DELETE or EDIT, we actually do something based on what the event.target is
document.querySelector('table tbody').addEventListener('click', function(event) {
  console.log(event.target)
  // If the event.target's className is delete, pass the ID to a function that will send the 
  // id to the backend so we can delete it
  if (event.target.className ==='delete-row-btn') {
    deleteRowById(event.target.dataset.id)
  }
  if (event.target.className ==='edit-row-btn') {
    editRowById(event.target.dataset.id)
  }
})

function deleteRowById(id) {
  // Make a DELETE request and pass the id in as params
  fetch('http://localhost:5000/delete/' + id, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => console.log(data))
}

function editRowById(id) {
  console.log(id)
}

addBtn.onclick = function () {
  const nameInput = document.querySelector('#name-input')    // GRAB THE NAME INPUT WHEN BUTTON IS CLICKED
  const name = nameInput.value
  nameInput.value = ""

  fetch('http://localhost:5000/insert', {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ name: name })
  })
  .then(response => response.json())
  .then(data => insertRowIntoTable(data['data']))
}

function insertRowIntoTable(data) {
  console.log('data here.. BOOOOMMM', JSON.stringify(data))
  const table = document.querySelector('table tbody')     // get the table via DOM
  const tableDataDoesntExist = table.querySelector('.no-data')   // See if the .no-data DOM element was created. 

  let tableHtml = "<tr>"

  // Lets loop through the object. It works because the object's keys are in order with the table data we created
  for (var key in data) {
    // It's good practice to include hasOwnProperty, because if you access a key and it doesn't exist it will break the app
    if (data.hasOwnProperty(key)) {
      // If the key is dateAdded, you'll want to override the current value and convert to localString
      if (key === 'dateAdded') {
        data[key] = new Date(data[key]).toLocaleString()
      }
      // Create td in the new tr! Based on the key :)
      tableHtml += `<td>${data[key]}</td>`
    }
  }
  // We need to add delete and edit buttons to our row so we can have full CRUD functionality
  tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</button></td>`
  tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</button></td>`
  // close the HTML table now that the data has been inserted
  tableHtml += "</tr>"

  // If there is indeed data, 
  // If tableDataDoesntExist. Will return null if data does in fact exist. Otherwise, set innerHTML to blank slate
  if (tableDataDoesntExist){
    table.innerHTML = tableHtml
  } else {
    // else if data does exist, insert a new row into table body, and newRow html is the tableHtml string we constructed
    const newRow = table.insertRow()
    newRow.innerHTML = tableHtml
  }
}


// This is the function that will actually load the HTML table with data from mySQL
function loadHTMLTable(data) {
  // Get the table's body so we can manipulate it based on data
  console.log(data)
  const table = document.querySelector('table tbody')

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
    return
  }
  let tableHtml = ""

  data.forEach(function({ id, name, date_added}) {
    console.log(id, name, date_added)
    tableHtml += "<tr>"
    tableHtml += `<td>${id}</td>`
    tableHtml += `<td>${name}</td>`
    tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`
    tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`
    tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`
    tableHtml += "</tr>"

  })
  console.log(tableHtml)
  table.innerHTML = tableHtml
}