var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 430 ,
    height = 50 ;

var minX = -3000,
    maxX = 20,
    constantY = 120;

var svg = d3.select('#scalebar')
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("border", "1px solid black");

var g = svg.append('g')
           .attr('class','scalegroup')
           .attr("transform", "translate(" + maxX + ","+ constantY +")")
           ;

var xScale = d3.scale.linear()
    .domain([0, 596])
    .range([0, 3500]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('top')
    .ticks(597)
    .outerTickSize(4);

g.call(xAxis);

svg.selectAll(".tick line")
    .each(function(d){
        var currElemt = d3.select(this);

        if (d%5) {
          //minor ticks
          currElemt.attr('y2', '-10')
                    .style("stroke", "black")
                    .style('stroke-width', '2')
                    .style("shape-rendering", "crispEdges");
        }
        else if (d%2) {
          //middle ticks
          currElemt.attr('y2', '-15')
                    .style("stroke", "black")
                    .style('stroke-width', '4')
                    .style("shape-rendering", "crispEdges");
        }
        else {
          //major ticks
          currElemt.attr('y2', '-20')
                    .style("stroke", "black")
                    .style('stroke-width', '4')
                    .style("shape-rendering", "crispEdges");
        }
      })

//Remove the unwanted labels
svg.selectAll('.tick text')
    .each(function(d) {
      if (d%10) {
          d3.select(this)
            .remove();
      } else {
          d3.select(this)
            .attr('y', '-22');
      }}) ;
    //.attr('y', '-22');


//Defone the drag behavior
/*
var drag = d3.behavior.drag()
                  .on('drag', onDrag)
                  .on('dragend', onDragEnd) ;

var initialX = 20;
var currentx = d3.transform(g.attr("transform")).translate[0];
function onDrag() {
            var currenty = d3.transform(g.attr("transform")).translate[1];
            var nav = currentx - d3.event.x;
            console.log('newx', d3.event.x);
            g.attr("transform", "translate(" +  nav + "," + currenty + ")");
            ;
    };
function onDragEnd() {
      currentx = d3.transform(g.attr("transform")).translate[0];
      console.log('currentx', currentx);
}
*/

//Define the zoom behaviour
var zoom = d3.behavior.zoom()
                      .on('zoom', zoomed)
                      .scaleExtent([1, 1])
                      .x(xScale);

function zoomed() {
  var currentX = d3.event.translate[0];
  var newX = currentX;
  if (currentX <= minX) {
    newx = minX;
  }else if (currentX >= maxX) {
    newX = maxX;
  }
  g.attr("transform", "translate("
      + newX * 3 + ',' + constantY  + ") scale(" + d3.event.scale + ")") ;
};

//It is important to call the zoom behaviour on svg element as opposed to g
svg.call(zoom) ;
