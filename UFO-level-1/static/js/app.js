// from data.js
var tableData = data;

// Display UFO sightings
function tableDisplay(ufoSightings) {
  var tbody = d3.select("tbody");
  ufoSightings.forEach((ufoRecord) => {
    var row = tbody.append("tr");
    Object.entries(ufoRecord).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.html(value);
    });
  });
};

// clear table
function deleteTbody() {
  d3.select("tbody")
    .selectAll("tr").remove()
    .selectAll("td").remove();
};
  
console.log(tableData);
tableDisplay(tableData);
var button = d3.select("#filter-btn");

// filter database
button.on("click", function(event) {
  d3.event.preventDefault();
  deleteTbody();
  var result = tableData;
  var input = document.getElementsByClassName("form-control");
  
  // iterate through all the input fields
  for (var i = 0; i < input.length; i++) {
	var id_name = input[i].id;
	var field = d3.select("#" + id_name).property("value");
	if (field.trim() !== "") {
	  var result = result.filter(ufoSighting =>
		ufoSighting[id_name].toUpperCase().trim() ===
		field.toUpperCase().trim());
	};
  };
 
  // display message if no records found
  if (result.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h4>No Result</h4>");
  };
  
  // display the database
  console.log(result);
  tableDisplay(result);
});