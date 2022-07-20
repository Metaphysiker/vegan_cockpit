<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hello Analytics Reporting API V4</title>
  <meta name="google-signin-client_id" content="833538385040-8c164qj3064f6hc7ntfq5ovtffv0spas.apps.googleusercontent.com">
  <meta name="google-signin-scope" content="https://www.googleapis.com/auth/analytics.readonly">
</head>
<body>

<div class="container">

  <div class="card">
    <div class="card-body">
      <h1 class="card-title">Categories</h1>

    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Bei Google anmelden</h5>
      <p class="card-text">
        Damit man von Google Daten erhalten kann, muss man sich zuerst bei Google mit einer @vegan.ch Adresse anmelden.
      </p>
      <p class="card-text">
        <div data-google-view-id=
        <?php
        echo get_option( 'vegan_cockpit_setting' )["google_view_id"];
        ?>
        >
          <?php
          echo get_option( 'vegan_cockpit_setting' )["google_view_id"];
          ?>
        </div>
      </p>
      <!-- The Sign-in button. This will run `queryReports()` on success. -->
      <p class="g-signin2" data-onsuccess="queryReports"></p>
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Datumsbereich auswählen</h5>
      <p class="card-text">
        <div data-google-view-id=

          <div class="row">
            <div class="col-6">
              <div class="input-group mb-3">
                <span class="input-group-text">Von</span>
                <input type="text" id="start_date" class="form-control" placeholder="Von">
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-3">
                <span class="input-group-text">bis</span>
                <input type="text" id="end_date" class="form-control" placeholder="Bis">
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-primary select_date_range_button">Datumsbereich anwenden und starten</button>
        </div>
      </p>
    </div>


    <div class="my-3">
        <h5 class="card-title">Kateogorien und ihre Beiträge in Wordpress</h5>
        <p class="card-text">
          Übersicht
        </p>
        <table id="wordpress_data" class="table table-bordered table-striped table-condensed table-responsive">
          <thead>
            <tr>
              <th>name</th>
              <th>slug</th>
              <th>term_id</th>
              <th>category-post-count</th>
              <th>urls</th>
              <th>
                total unique users
              </th>
              <th>
                total sessions
              </th>
              <th>
                total unique pageviews
              </th>
            </tr>
          </thead>
          <tbody>

          <?php

          $categories = get_categories( array(
              'orderby' => 'name',
              'order'   => 'ASC'
          ) );

            foreach ($categories as $row) {
              echo "<tr id=\"tr-id-{$row->slug}\">";
              echo "<td data-filter=\"name\">{$row->name}</td>";
              echo "<td data-filter=\"slug\">{$row->slug}</td>";
              echo "<td data-filter=\"term_id\">{$row->term_id}</td>";
              echo "<td data-filter=\"category_count\">{$row->category_count}</td>";
              echo "<td data-filter=\"urls\">";
              $posts_by_category = get_posts( array ('category' => $row->term_id, 'numberposts' => -1) );
              $numItems = count($posts_by_category);
              $i = 0;
              foreach ($posts_by_category as $post){
                echo str_replace( home_url(), "", get_permalink($post) );
                if(++$i !== $numItems) {
                    echo ",<br />";
                  }
              }
              echo "</td>";
              echo "<td id=\"td-id-total-unique-users-{$row->slug}\" data-filter=\"total_unique_users\">0</td>";
              echo "<td id=\"td-id-total-sessions-{$row->slug}\" data-filter=\"total_sessions\">0</td>";
              echo "<td id=\"td-id-total-unique-pageviews-{$row->slug}\" data-filter=\"total_pageviews\">0</td>";
              echo '</tr>';
            }
          ?>
          </tbody>
        </table>
</div>

<div class="card">
  <div class="card-body">
    <h5 class="card-title">Categories</h5>


  </div>
</div>

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">DonutChart - Kategorien</h5>
        <p class="card-text">
          Hier erscheinen nach der Analyse die Graphen.
        </p>

      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">HorizontalBarChart - einzelne Kategorien</h5>
        <p class="card-text">
          Hier erscheinen nach der Analyse die Graphen.
        </p>

      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Graphen</h5>
        <p class="card-text">
          Hier erscheinen nach der Analyse die Graphen.
        </p>

      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Graphen</h5>
        <p class="card-text">
          Hier erscheinen nach der Analyse die Graphen.
        </p>

      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Log</h5>
        <p class="card-text">
          Hier sieht man in Echtzeit was passiert.
        </p>

        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>
                category_slug
              </th>
              <th>url</th>
              <th>users</th>
              <th>sessions</th>
              <th>pageviews</th>
            </tr>
          </thead>
          <tbody id="log">

          </tbody>
        </table>

      </div>
    </div>

    <!-- end of container -->
  </div>




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
