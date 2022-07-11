<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hello Analytics Reporting API V4</title>
  <meta name="google-signin-client_id" content="833538385040-8c164qj3064f6hc7ntfq5ovtffv0spas.apps.googleusercontent.com">
  <meta name="google-signin-scope" content="https://www.googleapis.com/auth/analytics.readonly">
</head>
<body>


  <div class="donutChart" style="height: 900px; width: 100%;">

  </div>

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

(function($) {

  function queryReports() {

  }

  $( ".select_date_range_button" ).click(function() {
    const categoriesAnalytics = new window.CategoriesAnalytics();
    categoriesAnalytics.startAnalyticsProcess().then(() => {
      console.log("donutchart start");
      const d3Charts = new window.d3Charts();
      const donutChart = new d3Charts.donutChart(".donutChart", categoriesAnalytics.convertTableDataForDonutChart());
      console.log(categoriesAnalytics.convertTableDataForDonutChart());
      donutChart.draw_chart();
    });

  });


})( jQuery );


</script>

<!-- Load the JavaScript API client and Sign-in library. -->
<script src="https://apis.google.com/js/client:platform.js"></script>

</body>
</html>
