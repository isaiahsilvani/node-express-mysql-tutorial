// Add Event Listener to DOMContentLoaded event that will load the table from the database.
// If the table is empty, set the table's innerhtml to no data.
document.addEventListener('DOMContentLoaded', function() {
  // Call loadHTMLTable and pass an empty array for now. Will replace with actual data from
  // mySQL database
  loadHTMLTable([])
})

function loadHTMLTable(data) {
  // 
  const table = document.querySelector('table tbody')
  let tableHtml = ""

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
  }
}