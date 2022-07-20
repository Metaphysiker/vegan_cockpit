(function( $ ) {
	'use strict';

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

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



	 function startAnalyticsProcess(){

	   var googleAnalyticsApi = new window.GoogleAnalyticsApi();
	   //var categoriesAnalytics = new window.CategoriesAnalytics();
	   var categories = get_categories();

		 return new Promise(function(second_resolve, second_reject) {

		   for (let first_index = 0, p1 = Promise.resolve(); first_index < categories.length; first_index++)
		   {
		     p1 = p1.then(() => new Promise(function(first_resolve, first_reject) {

		       iterateOverUrls(categories[first_index]).then((result) => {
						 if((first_index + 1) == categories.length){
							 second_resolve()
						 }

		         first_resolve()
		       });



		     }))
		   }
	 	})
 }


	 function CategoriesAnalyticsObject() {

	 }

		window.CategoriesAnalytics = CategoriesAnalyticsObject;

$( window ).load(function(){

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


});

})( jQuery );
