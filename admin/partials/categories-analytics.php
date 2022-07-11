<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hello Analytics Reporting API V4</title>
  <meta name="google-signin-client_id" content="833538385040-8c164qj3064f6hc7ntfq5ovtffv0spas.apps.googleusercontent.com">
  <meta name="google-signin-scope" content="https://www.googleapis.com/auth/analytics.readonly">
</head>
<body>

<h1>Analytics Reporting API V4</h1>

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
    });
  });
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

        googleAnalyticsApi.getNumbersFromGoogle(document.querySelector('[data-google-view-id]').textContent.trim(), dateRange, urls[index])
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
  console.log("startAnalyticsProcess");
  var dummyDateRange = {
        startDate: "2022-01-01",
        endDate: "2022-07-04"
      };
  var googleAnalyticsApi = new window.GoogleAnalyticsApi();
  var categoriesAnalytics = new window.CategoriesAnalytics();
  var categories = categoriesAnalytics.get_categories();

  for (let first_index = 0, p1 = Promise.resolve(); first_index < categories.length; first_index++)
  {
    p1 = p1.then(() => new Promise(function(first_resolve, first_reject) {

      iterateOverUrls(categories[first_index]).then((result) => {
        first_resolve()
      });

    }))
  }
}

  // Replace with your view ID.
  var VIEW_ID = '235111240';

  // Query the API and print the results to the page.
  function queryReports() {

    waitForGlobalVariables(startAnalyticsProcess);

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
