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

   function donutChart(container_class, data) {
     this.container_class = container_class;
     this.data = data;
     this.empty_container = function(){
       $(this.container_class).empty();
     };
     this.names_of_data = function(){
       var names = [];
       for (var i = 0; i < this.data.length; i++) {
         names.push(this.data[i].name);
       }
       return names;
     };
     this.values_of_data = function(){
       var values = [];
       for (var i = 0; i < this.data.length; i++) {
         values.push(this.data[i].values);
       }
       return values;
     };
     this.draw_chart = function() {

       this.empty_container();

       var margin = {top: 50, right: 50, bottom: 50, left: 50};
       var width = $(container_class).width() - margin.left - margin.right;
       var height = 500;
       //var height = (this.data.length * 100) + 100 - margin.top - margin.bottom;
       //var height = 500 - margin.top - margin.bottom;

       // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
       var radius = Math.min(width, height) / 2 - 40;

         // append the svg object to the body of the page
        const svg = d3.select(this.container_class)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${width/2},${height/2})`);

            // Create dummy data
            //data = {a: 9, b: 20, c:30, d:8, e:12, f:3, g:7, h:14}

            // set the color scale
            var data_keys = this.names_of_data();
            var color = d3.scaleOrdinal().domain(this.names_of_data()).range(d3.schemeDark2);

            // Compute the position of each group on the pie:
            var pie = d3.pie()
              .sort(null) // Do not sort group by size
              .value(d => d.value)

          var data_ready = pie(this.data);

          // The arc generator
          var arc = d3.arc()
            .innerRadius(radius * 0.5)         // This is the size of the donut hole
            .outerRadius(radius * 0.8)

          // Another arc that won't be drawn. Just for labels positioning
          var outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9)

          // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
          svg
            .selectAll('allSlices')
            .data(data_ready)
            .join('path')
            .attr('d', arc)
            .attr('fill', d => color(d.index % this.data.length))
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

          // Add the polylines between chart and labels:
          svg
            .selectAll('allPolylines')
            .data(data_ready)
            .join('polyline')
              .attr("stroke", "black")
              .style("fill", "none")
              .attr("stroke-width", 1)
              .attr('points', function(d) {
                var posA = arc.centroid(d) // line insertion in the slice
                var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                var posC = outerArc.centroid(d); // Label position = almost the same as posB
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC]
              })

          // Add the polylines between chart and labels:
          svg
            .selectAll('allLabels')
            .data(data_ready)
            .join('text')
              .text(d => this.names_of_data()[d.index] + " - " + d.value)
              .attr('transform', function(d) {
                  var pos = outerArc.centroid(d);
                  var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                  pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                  return `translate(${pos})`;
              })
              .style('text-anchor', function(d) {
                  var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                  return (midangle < Math.PI ? 'start' : 'end')
              })

              //end of DonutChart

     }
   }


function d3Charts() {
    this.donutChart = donutChart
 }

window.d3Charts = d3Charts;


$( window ).load(function(){
	console.log("d3-charts");

});

})( jQuery );
