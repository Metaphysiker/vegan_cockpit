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

<div data-google-view-id=
<?php
echo get_option( 'vegan_cockpit_setting' )["google_view_id"];
?>
>
  <?php
  echo get_option( 'vegan_cockpit_setting' )["google_view_id"];
  ?>
</div>


<!-- The Sign-in button. This will run `queryReports()` on success. -->
<p class="g-signin2" data-onsuccess="queryReports"></p>

<!-- The API response will be printed here. -->
<textarea cols="80" rows="20" id="query-output"></textarea>

<script>

function waitFor(variable, callback) {
  var interval = setInterval(function() {
    if (window[variable]) {
      clearInterval(interval);
      callback();
    }
  }, 200);
}

function waitForGlobalVariables(callback){
  waitFor('GoogleAnalyticsApi', function() {
    waitFor('CategoriesAnalytics', function() {
      callback();
      console.log("callback!");
    });
  });
}

function startAnalyticsProcess(){
  console.log("startAnalyticsProcess");
  var dummyDateRange = {
        startDate: "2022-01-01",
        endDate: "2022-07-04"
      };
  var googleAnalyticsApi = new window.GoogleAnalyticsApi();
  var categoriesAnalytics = new window.CategoriesAnalytics();
  var categories = categoriesAnalytics.get_categories();
  console.log("categories: " + categories);
  categories.forEach(function (category, index) {

    category.urls.split(",").forEach(function(category_url){
      console.log(category_url);

      //googleAnalyticsApi.getNumbersFromGoogle("235111240", dummyDateRange, "/mitglied-werden")
      googleAnalyticsApi.getNumbersFromGoogle(document.querySelector('[data-google-view-id]').textContent.trim(), dummyDateRange, category_url)
      .then((result) => {
        console.log(category.name);
        console.log(result.result.reports[0].data.rows[0].metrics[0].values[0]);
        categoriesAnalytics.updateCounterInTable("#td-id-total-unique-users-" + category.slug ,result.result.reports[0].data.rows[0].metrics[0].values[0]);
      })

    });

  });
}

  // Replace with your view ID.
  var VIEW_ID = '235111240';

  // Query the API and print the results to the page.
  function queryReports() {

    waitForGlobalVariables(startAnalyticsProcess);

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
