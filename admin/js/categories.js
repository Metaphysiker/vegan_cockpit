(function( $ ) {
	'use strict';

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

	function logOutputToTableWithId(element_id, category_slug, url, user_count, session_count, pageview_count){

		var row = '<tr>'+
				 '<td>'+ category_slug +'</td>'+
				 '<td>'+ url +'</td>'+
				 '<td>'+ user_count +'</td>'+
				 '<td>'+ session_count +'</td>'+
				 '<td>'+ pageview_count+'</td>'+
				 '</tr>';

		$(element_id).append(row);

	}

	function iterateOverUrlsOfCategory(category){

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
			//var categoriesAnalytics = new window.CategoriesAnalytics();

			var urls = category.urls.split(",");

			for (let index = 0, p = Promise.resolve(); index < urls.length; index++)
			{
				p = p.then(() => new Promise(function(resolve, reject) {

					googleAnalyticsApi.getDataFromGoogle(document.querySelector('[data-google-view-id]').textContent.trim(), dateRange, urls[index])
					.then((result) => {

						var total_unique_users_count = result?.result?.reports?.[0].data?.rows?.[0]?.metrics[0]?.values[0];

						if(total_unique_users_count === undefined){
							console.log("total_unique_users_count is undefined");
							logOutputToTableWithId("#category_table_" + category.slug, category.slug, urls[index], 0, 0, 0 );
							logOutputToTableWithId("#log", category.slug, urls[index], 0, 0, 0 );
						} else {
							//var total_unique_users_count = result.result.reports[0].data.rows[0].metrics[0].values[0];
							var total_sessions_count = result.result.reports[0].data.rows[0].metrics[0].values[1];
							var total_unique_pageviews_count = result.result.reports[0].data.rows[0].metrics[0].values[2];

							updateCounterInTable(category.slug, total_unique_users_count, total_sessions_count, total_unique_pageviews_count);
							//categoriesAnalytics.updateCounterInTable2("#tbody-of-table2", category.slug, urls[index], total_unique_users_count, total_sessions_count, total_unique_pageviews_count);
							logOutputToTableWithId("#category_table_" + category.slug, category.slug, urls[index], total_unique_users_count, total_sessions_count, total_unique_pageviews_count );
							logOutputToTableWithId("#log", category.slug, urls[index], total_unique_users_count, total_sessions_count, total_unique_pageviews_count );
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

		return new Promise(function(startAnalyticsProcess_resolve, startAnalyticsProcess_reject) {
			var generalTools = new window.GeneralTools();
			var googleAnalyticsApi = new window.GoogleAnalyticsApi();

			var categories = generalTools.getDataFromTableWithElementId("wordpress_data");

			console.log("before iterateOverUrlsOfCategory");

			//loop over all categories
			for (let i = 0, p = Promise.resolve(); i < categories.length; i++) {
					p = p.then(() => new Promise(function(iterateOverUrlsOfCategory_resolve, iterateOverUrlsOfCategory_reject) {

												console.log("inside loop");
												console.log(categories[i]);
												iterateOverUrlsOfCategory(categories[i])
												.then((result) => {
													if((i+1) >= categories.length){
														startAnalyticsProcess_resolve();
													}
													console.log("iterate resolve: " + categories[i])
													iterateOverUrlsOfCategory_resolve();
												});

											}));
			}
		})

	}


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
		$( "#start_date" ).datepicker("setDate", new Date(2022, 0, 1));


		$("#end_date").datepicker(
		{
			'language' : 'de',
			'dateFormat' : 'dd-mm-yy',
			'firstDay': 1,
			'maxDate': new Date(new Date().setDate(new Date().getDate()-1))
		});
		$( "#end_date" ).datepicker( "option", "dateFormat", "yy-mm-dd" );
		$( "#end_date" ).datepicker("setDate", new Date(new Date().setDate(new Date().getDate()-1)));

		$( ".select_date_range_button" ).click(function() {

			startAnalyticsProcess().then(() => {
				console.log("startAnalyticsProcess is finished");

				var generalTools = new window.GeneralTools();


				var categories = generalTools.getDataFromTableWithElementId("wordpress_data");
				for (let i = 0; i < categories.length; i++) {
					//console.log(categories[i]["slug"]);
					generalTools.sortTable("category_table_" + categories[i]["slug"] + "_table", 2);
				}

			});

		});


		//console.log(generalTools.getDataFromTableWithElementId("wordpress_data"));
		//startAnalyticsProcess()



});

})( jQuery );
