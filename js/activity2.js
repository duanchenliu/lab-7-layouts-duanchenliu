
let width = 1000,
height = 600;

let svg = d3.select("#chart-area").append("svg")
.attr("width", width)
.attr("height", height);

// geoMercator projection:
let projection = d3.geoMercator()
	.scale(100)
	.translate([width/2, height/2]);

//geoOrthographic projection: 
// let projection = d3.geoOrthographic()
// 	.scale(200)
// 	.translate([width/2, height/2]);


let path = d3.geoPath()
	.projection(projection);

// Load data
Promise.all([
	d3.json("data/airports.json"),
	d3.json("data/world-110m.json"),
]).then((data)=>{
	// con
	console.log(data, 'data')
	let airports = data[0];
	let worldmap = data[1];
    console.log('nodes', airports.nodes);
	console.log('links', airports.links);
	
	let world = topojson.feature(worldmap, worldmap.objects.countries).features;
  
	console.log(world);

	svg.selectAll("path")
        .data(world.filter(d=>d.properties.name!='Antarctica'))
		.enter()
        .append("path")
		.attr("d", path)
		  .attr('stroke', 'white');

	//DRAW THE NODES (SVG CIRCLE)	  
	let node = svg.selectAll(".node")
          .data(airports.nodes)
          .enter()
          .append("circle")
          .attr("class", "node")
          .attr("r", 4)
          .attr("fill", "gold")
          .attr("stroke", "gold")
          .attr("transform", function(d) {
             return "translate(" + projection([d.longitude, d.latitude]) + ")";
		   });

	node.append("title")
		//    .attr("fill", "blue")
		   .text(function(d) { return d.name; });
	
	//DRAW THE LINKS (SVG LINE)
	svg.selectAll('.link')
		   .data(airports.links)
		   .enter()
		   .append('line')
		   .attr("stroke-width", 2)
		   .attr("stroke", "maroon");
});

// 2a) DEFINE 'NODES' AND 'EDGES'
// 2b) START RUNNING THE SIMULATION

// 3) 



// 5) LISTEN TO THE 'TICK' EVENT AND UPDATE THE X/Y COORDINATES FOR ALL ELEMENTS
