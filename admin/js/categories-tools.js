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

	 function getDataFromTable(){
	 	var data = [];

	 	$('#table_with_categories tbody tr').each( (tr_idx,tr) => {
	 		var row_data = {};
	     $(tr).children('td').each( (td_idx, td) => {
	 				row_data[$(td).data("filter")] = $(td).text();
	     });
	 		data.push(row_data);
	 	});

	 	return data;
	 }

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

	 function convertTableDataForDonutChart(){
		 var data = [];
		 var data_from_table = getDataFromTable();

		 for (var i = 0; i < data_from_table.length; i++) {
			 data.push({"name": data_from_table[i].name ,"value": data_from_table[i].total_pageviews})
		 }
		 return data;
	 }


	 function convertTableDataForhorizontalBarChart(element_id){
		 var data = [];
		 var data_from_table = getDataFromTableWithElementId(element_id);

		 for (var i = 0; i < data_from_table.length; i++) {
			 data.push({"name": data_from_table[i].name ,"value": data_from_table[i].total_pageviews})
		 }
		 return data;
	 }

	 function iterateOverUrls(category){

	   return new Promise(function(outer_resolve, outer_reject)
	   {

	     var dummyDateRange = {
	           startDate: "2022-01-01",
	           endDate: "2022-07-04"
	         };

	     var dateRange = {
	       startDate: document.getElementById('start_date').value,
	       endDate: document.getElementById('end_date').value
	     }


	     var googleAnalyticsApi = new window.GoogleAnalyticsApi();
	     var categoriesAnalytics = new window.CategoriesAnalytics();

	     var urls = category.urls.split(",");
	     for (let index = 0, p = Promise.resolve(); index < urls.length; index++)
	     {
	       p = p.then(() => new Promise(function(resolve, reject) {

	         googleAnalyticsApi.getDataFromGoogle(document.querySelector('[data-google-view-id]').textContent.trim(), dateRange, urls[index])
	         .then((result) => {

	           var total_unique_users_count = result?.result?.reports?.[0].data?.rows?.[0]?.metrics[0]?.values[0];

	           if(total_unique_users_count === undefined){
	             console.log("total_unique_users_count is undefined");
	           } else {
	             //var total_unique_users_count = result.result.reports[0].data.rows[0].metrics[0].values[0];
	             var total_sessions_count = result.result.reports[0].data.rows[0].metrics[0].values[1];
	             var total_unique_pageviews_count = result.result.reports[0].data.rows[0].metrics[0].values[2];

	             categoriesAnalytics.updateCounterInTable(category.slug, total_unique_users_count, total_sessions_count, total_unique_pageviews_count);
	             categoriesAnalytics.updateCounterInTable2("#tbody-of-table2", category.slug, urls[index], total_unique_users_count, total_sessions_count, total_unique_pageviews_count);
	           }

	           resolve();
	           if((index + 1) >= urls.length) {
	             outer_resolve();
	           }

	         })

	       }))
	     }
	   })
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


	 function CategoriesTools() {
			this.get_categories = get_categories,
			this.updateCounterInTable = updateCounterInTable,
			this.updateCounterInTable2 = updateCounterInTable2,
			this.iterateOverUrls = iterateOverUrls,
			this.startAnalyticsProcess = startAnalyticsProcess,
			this.convertTableDataForDonutChart = convertTableDataForDonutChart,
			this.getDataFromTableWithElementId = getDataFromTableWithElementId
	 }

		window.CategoriesTools = CategoriesTools;

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
