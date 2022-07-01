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

	 function get_categories(){
	 	var categories = [];

	 	$('#table_with_categories tbody tr').each( (tr_idx,tr) => {
	 		var category_data = {};
	     $(tr).children('td').each( (td_idx, td) => {
	         console.log( '[' +tr_idx+ ',' +td_idx+ '] => ' + $(td).text());
	 				console.log($(td).data("filter"));
	 				category_data[$(td).data("filter")] = $(td).text();
	     });
	 		categories.push(category_data);
	 		console.log(category_data);
	 	});

	 	console.log(categories);
	 	return categories;
	 }

$( window ).load(function(){
	console.log("categories-analytics load");

	get_categories();


});

})( jQuery );
