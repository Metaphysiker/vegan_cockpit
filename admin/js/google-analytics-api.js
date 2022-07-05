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

 function GoogleAnalyticsApiObject() {
		 this.getNumbersFromGoogle = getNumbersFromGoogle;
	}

window.GoogleAnalyticsApi = GoogleAnalyticsApiObject;

function getNumbersFromGoogle(view_id, dateRange, relative_url){

	return new Promise(function(resolve, reject)
	{
		gapi.client.request({
			path: '/v4/reports:batchGet',
			root: 'https://analyticsreporting.googleapis.com/',
			method: 'POST',
			body: {
				reportRequests: [
					{
						viewId: view_id,
						dateRanges: [dateRange],
						metrics: [
							{
								expression: 'ga:users'
							},
							{
								expression: 'ga:sessions'
							},
							{
								expression: 'ga:uniquePageviews'
							}
						],
						"dimensionFilterClauses": [
						 {
							"filters": [
							{
							 //"operator": "REGEXP",
							 //https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet
							 "operator": "BEGINS_WITH",
							 "dimensionName": "ga:pagePath",
							 "expressions": [
								 relative_url
								]
							}
							]
						 }
						]
					}
				]
			}
		}).then(function(response){
			//return response;
			resolve(response);
		})
	})
}


$( window ).load(function(){
	console.log("google-analytics-api loaded");
});

})( jQuery );
