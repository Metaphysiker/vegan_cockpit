(function( $ ) {
	'use strict';

	 function getDataFromTableWithElementId(element_id){
		var data = [];

		$('#' + element_id + ' tbody tr').each( (tr_idx,tr) => {
			var row_data = {};
			 $(tr).children('td').each( (td_idx, td) => {
					row_data[$(td).data("filter")] = $(td).text();
			 });
			data.push(row_data);
		});

		return data;
	 }

	 function sortTable(element_id, column_number) {
		 return new Promise(function(resolve, reject){
		  var table, rows, switching, i, x, y, shouldSwitch;
		  table = document.getElementById(element_id);
		  switching = true;
		  /*Make a loop that will continue until
		  no switching has been done:*/
		  while (switching) {
		    //start by saying: no switching is done:
		    switching = false;
		    rows = table.rows;
		    /*Loop through all table rows (except the
		    first, which contains table headers):*/
		    for (i = 1; i < (rows.length - 1); i++) {
		      //start by saying there should be no switching:
		      shouldSwitch = false;
		      /*Get the two elements you want to compare,
		      one from current row and one from the next:*/
		      x = rows[i].getElementsByTagName("TD")[column_number];
		      y = rows[i + 1].getElementsByTagName("TD")[column_number];
		      //check if the two rows should switch place:
		      if (Number(x.innerHTML) < Number(y.innerHTML)) {
		        //if so, mark as a switch and break the loop:
		        shouldSwitch = true;
		        break;
		      }
		    }
		    if (shouldSwitch) {
		      /*If a switch has been marked, make the switch
		      and mark that a switch has been done:*/
		      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		      switching = true;
		    } else {
					resolve();
				}
		  }
		})
		}


	 function GeneralTools() {
		 this.getDataFromTableWithElementId = getDataFromTableWithElementId,
		 this.sortTable = sortTable
	 }

		window.GeneralTools = GeneralTools;

$( window ).load(function(){

	console.log("general-tools loaded");



});

})( jQuery );
