let dataset = [
[1915, 8.593167],
[1925, 8.534417],
[1935, 8.515750],
[1945, 8.584833],
[1955, 8.626250],
[1965, 8.527417],
[1975, 8.744833],
[1985, 8.658000],
[1995, 9.347083],
[2005, 9.700917],
[2015, 9.831000]
];

// create svg element
let w = 800;
let h = 400;
let padding = 25;
let svg = d3.
select("body").
append("svg").
attr("width", w).
attr("height", h).
attr("id", "chart").
on("click", drawDots);


// x scale
let xScale = d3.scale.
linear().
domain([1910, 2020]).
range([padding, w - padding]);
 
// x axis
let xAxis = d3.svg.
axis().
scale(xScale).
orient("bottom");


// append x axis
svg.
append("g").  /*what is g? http://tutorials.jenkov.com/svg/g-element.html */
attr({
  class: "xaxis",
  transform: `translate(0, ${h - padding})` }).
call(xAxis);

// y scale
let yScale = d3.scale.
linear().
domain([8, 9.9]).
range([h - padding, padding]);

// y axis
let yAxis = d3.svg.
axis().
scale(yScale).
orient("left");

// append y axis
svg.
append("g").
attr({
  class: "yaxis",
  transform: `translate(${padding}, 0)` }).

call(yAxis);


// user draw points on the canvas
function drawDots() {
  var i = 0;
  i++;
  // Extract the click location
  var point = d3.mouse(this),
      p = { x: point[0], y: point[1] };
  
  
  // Append a new point
  svg.append("rect")
  .attr("x", p.x)
  .attr("y", p.y)
  .attr("width",5)
  .attr("height",5)
  .attr("stroke", "blue")
  .attr("stroke-width", 1)
  .attr("id", i)
  .style("fill", "white")
}

// show the historical data
function drawLine() {
  // define lines
  let lines = d3.svg.
  line().
  x(d => xScale(d[0])).
  y(d => yScale(d[1])).
  interpolate("monotone");

  // append the line
  svg.append("path").attr({
  d: lines(dataset),
  class: "lineChart" });

  svg.
  select(".lineChart").
  style("opacity", 0).
  transition().
  duration(2500).
  delay(200).
  style("opacity", 1);

  // define and add points
  let points = svg.
  selectAll("circle").
  data(dataset).
  enter().
  append("circle")

  points.
  attr("cy", 0).
  transition().
  duration(1500).
  delay((d, i) => i * 100 + 500).
  ease("elastic").
  attr({
    cx: d => xScale(d[0]),
    cy: d => yScale(d[1]),
    r: 7,
    class: "datapoint",
    id: (d, i) => i}).
  style("opacity", 1);
}