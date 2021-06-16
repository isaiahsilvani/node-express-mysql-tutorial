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

}


// This is the function that will actually load the HTML table with data from mySQL
function loadHTMLTable(data) {
  // Get the table's body so we can manipulate it based on data
  console.log(data)
  const table = document.querySelector('table tbody')
  let tableHtml = ""

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
  }
}