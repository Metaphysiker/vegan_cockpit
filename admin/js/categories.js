(function( $ ) {
	'use strict';


$( window ).load(function(){

	console.log("categories loaded");

	$("#start_date").datepicker(
		{
			'language' : 'de',
			'dateFormat' : 'dd-mm-yy',
			'firstDay': 1,
			'minDate': new Date(2020, 0, 1),
		});

		$( "#start_date" ).datepicker( "option", "dateFormat", "yy-mm-dd" );
		$( "#start_date" ).datepicker("setDate", new Date(2021, 0, 1));


		$("#end_date").datepicker(
		{
			'language' : 'de',
			'dateFormat' : 'dd-mm-yy',
			'firstDay': 1,
			'maxDate': new Date(new Date().setDate(new Date().getDate()-1))
		});
		$( "#end_date" ).datepicker( "option", "dateFormat", "yy-mm-dd" );
		$( "#end_date" ).datepicker("setDate", new Date(new Date().setDate(new Date().getDate()-1)));


		var generalTools = new window.GeneralTools();
		console.log(generalTools.getDataFromTableWithElementId("wordpress_data"));


});

})( jQuery );
