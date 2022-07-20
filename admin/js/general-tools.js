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


	 function GeneralTools() {
		 this.getDataFromTableWithElementId = getDataFromTableWithElementId
	 }

		window.GeneralTools = GeneralTools;

$( window ).load(function(){

	console.log("general-tools loaded");



});

})( jQuery );
