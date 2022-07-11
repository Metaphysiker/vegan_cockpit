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

	 function CategoriesAnalyticsObject() {
			this.get_categories = get_categories,
			this.updateCounterInTable = updateCounterInTable,
			this.updateCounterInTable2 = updateCounterInTable2
	 }

		window.CategoriesAnalytics = CategoriesAnalyticsObject;

	 function get_categories(){
	 	var categories = [];

	 	$('#table_with_categories tbody tr').each( (tr_idx,tr) => {
	 		var category_data = {};
	     $(tr).children('td').each( (td_idx, td) => {
	 				category_data[$(td).data("filter")] = $(td).text();
	     });
	 		categories.push(category_data);
	 	});
	 	return categories;
	 }

	 function updateCounterInTable(category_slug, user_count, session_count, pageview_count){

		 var users_element_id = "#td-id-total-unique-users-" + category_slug;
		 var current_user_count = parseInt($(users_element_id).text());
		 var updated_user_count = parseInt(current_user_count) + parseInt(user_count);
		 $(users_element_id).empty().text(updated_user_count);

		 var sessions_element_id = "#td-id-total-sessions-" + category_slug;
		 var current_session_count = parseInt($(sessions_element_id).text());
		 var updated_session_count = parseInt(current_session_count) + parseInt(session_count);
		 $(sessions_element_id).empty().text(updated_session_count);

		 var pageviews_element_id = "#td-id-total-unique-pageviews-" + category_slug;
		 var current_pageview_count = parseInt($(pageviews_element_id).text());
		 var updated_pageview_count = parseInt(current_pageview_count) + parseInt(pageview_count);
		 $(pageviews_element_id).empty().text(updated_pageview_count);


	 }

	 function updateCounterInTable2(element_id, category_slug, url, user_count, session_count, pageview_count){

		 var row = '<tr>'+
		 			'<td>'+ category_slug +'</td>'+
          '<td>'+ url +'</td>'+
          '<td>'+ user_count +'</td>'+
					'<td>'+ session_count +'</td>'+
					'<td>'+ pageview_count+'</td>'+
          '</tr>';

		 $(element_id).append(row);

	 }

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
