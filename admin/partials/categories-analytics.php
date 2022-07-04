<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hello Analytics Reporting API V4</title>
  <meta name="google-signin-client_id" content="833538385040-8c164qj3064f6hc7ntfq5ovtffv0spas.apps.googleusercontent.com">
  <meta name="google-signin-scope" content="https://www.googleapis.com/auth/analytics.readonly">
</head>
<body>

<h1>Hello Analytics Reporting API V4</h1>

<!-- The Sign-in button. This will run `queryReports()` on success. -->
<p class="g-signin2" data-onsuccess="queryReports"></p>

<!-- The API response will be printed here. -->
<textarea cols="80" rows="20" id="query-output"></textarea>

<script>
(function( $ ) {
	'use strict';

$( window ).load(function(){


});

})( jQuery );

function waitFor(variable, callback) {
  var interval = setInterval(function() {
    if (window[variable]) {
      clearInterval(interval);
      callback();
    }
  }, 200);
}

  // Replace with your view ID.
  var VIEW_ID = '235111240';

  // Query the API and print the results to the page.
  function queryReports() {

    waitFor('GoogleAnalyticsApi', function() {

      var dummyDateRange = {
            startDate: "2022-01-01",
            endDate: "2022-03-30"
          }
      var googleAnalyticsApi = new window.GoogleAnalyticsApi();

      googleAnalyticsApi.getNumbersFromGoogle("235111240", dummyDateRange);
    });





    gapi.client.request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      body: {
        reportRequests: [
          {
            viewId: VIEW_ID,
            dateRanges: [
              {
                startDate: '7daysAgo',
                endDate: 'today'
              }
            ],
            metrics: [
              {
                expression: 'ga:sessions'
              }
            ]
          }
        ]
      }
    }).then(displayResults, console.error.bind(console));
  }

  function displayResults(response) {
    var formattedJson = JSON.stringify(response.result, null, 2);
    document.getElementById('query-output').value = formattedJson;
  }
</script>

<!-- Load the JavaScript API client and Sign-in library. -->
<script src="https://apis.google.com/js/client:platform.js"></script>

</body>
</html>
