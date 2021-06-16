// Add Event Listener to DOMContentLoaded event that will load the table from the database.
// If the table is empty, set the table's innerhtml to no data.
document.addEventListener('DOMContentLoaded', function() {
  // Make a GET request to backend server to get all data from mysql and pass it to loadHTMLTable function
  fetch('http://localhost:5000/getAll')  // Fetch data from backend
  .then(response => response.json())     // THEN, turn response to json format
  .then(data => console.log(data))       // THEN, do something with the data
  
  loadHTMLTable([])
})


// This is the function that will actually load the HTML table with data from mySQL
function loadHTMLTable(data) {
  // Get the table's body so we can manipulate it based on data
  const table = document.querySelector('table tbody')
  let tableHtml = ""

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
  }
}