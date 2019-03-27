import React, {Component} from 'react';

import * as d3 from 'd3'
import './styling/RadarChart.css'


export default class RadarChart extends Component {

	state = {
	}
	
	d = () => {
		const finalValues = this.props.finalValues
		if (finalValues === undefined){
			return false
		}

		var fpr = finalValues['fpr']
		var recall = finalValues['recall']
		var precision = finalValues['precision']
		
		/*
		//TODO experimental
		if(fpr === null) {
			fpr = 0
		}
		if(recall === null) {
			recall = 0
		}
		if(precision === null) {
			precision = 0
		}
		*/
		
		return [
			{axis: 'false positive rate', value: fpr, order:0}, 
			{axis: 'recall', value: recall, order:1}, 
			{axis: 'precision', value: precision, order:2},  
		]	
	}
	
	componentWillReceiveProps = (nextProps) => {

		//only change something if props really have changed
		//if (this.state.finalValues !== nextProps.finalValues){
			
		//}
		
		//TODO?
		//this.draw(this.props.chart, this.d(), this.adjustValues)

	}
	
	componentDidMount = () => {
		this.setState({
			didMount: true,
		})
	}
	
	//calling the parent component's function
	adjustValues = (metric, value) => {
		
		this.props.adjustValues(metric,value)
		
	}
	
	draw = (id, d, adjustValues, options) => {
		//w should equal h
		var cfg = {
			radius: 6,
			w: 400,
			h: 400,
			factor: 1,
			factorLegend: 0.85,
			levels: 5,
			maxValue: 1,
			radians: 2 * Math.PI,
			opacityArea: 0,
			color: d3.scaleOrdinal(d3.schemeCategory10)
		}
		if('undefined' !== typeof options){
			for(var i in options){
				if('undefined' !== typeof options[i]){
					cfg[i] = options[i]
				}
			}
		}

		cfg.maxValue = Math.max(cfg.maxValue, d3.max(d.map(function(o){return o.value})))
		var allAxis = (d.map(function(i, j){return i.axis}))
		var total = allAxis.length
		var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2)

		d3.select(id).select("svg").remove()
		var g = d3.select(id).append("svg").attr("width", cfg.w).attr("height", cfg.h).attr('viewBox','-20 -50 450 520').append("g")

		var tooltip

		drawFrame()
		var maxAxisValues = []
		drawAxis()
		var dataValues = []
		reCalculatePoints()
		
		var areagg = initPolygon()
		drawPoly()

		drawnode()

		function drawFrame(){
			
			const levelFactor = (cfg.w / cfg.levels / 2)
			for(var i = 1; i <= cfg.levels; i++){
				g.append('svg:circle')
					.attr('cx', cfg.w/2)
					.attr('cy', cfg.h/2)
					.attr('r', i*levelFactor)
					.attr('class', 'radarBackgroundCircle')
					.style('fill','transparent')
					//.style('fill','grey').style('fill-opacity', 0.1)
			}
		}
		
		function drawAxis(){
			var axis = g.selectAll(".axis").data(allAxis).enter().append("g").attr("class", "axis")
			
			axis.append("line")
			    .attr("x1", cfg.w/2)
			    .attr("y1", cfg.h/2)
			    .attr("x2", function(j, i){
					maxAxisValues[i] = {x:cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total)), y:0}
					return maxAxisValues[i].x
			    })
			    .attr("y2", function(j, i){
					maxAxisValues[i].y = cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total))
					return maxAxisValues[i].y
			    })
			    .attr("class", "line").style("stroke", "grey").style("stroke-width", "1px")
				
			//old legends
			/*axis.append("text").attr("class", "legend")
			    .text(function(d){return d}).style("font-family", "sans-serif").style("font-size", "10px").attr("transform", function(d, i){return "translate(0, -10)"})
			    .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-20*Math.sin(i*cfg.radians/total)})
			    .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))+20*Math.cos(i*cfg.radians/total)})
				
			//give labels unique classes (legend0, legend1, legend2)
			var labelsCollection = g.selectAll('.legend')
			var labels = labelsCollection['_groups'][0]	
			for(var i=0; i<labels.length; i++){
				labels[i].className.baseVal += ' legend'+i
			}*/
			
						
			axis.append('text').attr('class','legend')
				.text('False positive rate')
				.attr('x', 125)
				.attr('y', -20)
				
			axis.append('text').attr('class','legend')
				.text('Precision')
				.attr('x', 380)
				.attr('y', 330)

			axis.append('text').attr('class','legend')
				.text('Recall')
				.attr('x', -30)
				.attr('y', 330)
		}

		function reCalculatePoints(){
		    g.selectAll(".nodes")
				.data(d, function(j, i){
					dataValues[i] = [
						cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
						cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total)),
					]
				})
		    dataValues[d[0].length] = dataValues[0];
		}

		function initPolygon(){
			return g.selectAll("area").data([dataValues])
				.enter()
				.append("polygon")
				.attr("class", "radar-chart-serie0")
				.style("stroke-width", "2px")
				.style("stroke", cfg.color(0))
				
				//fill effect on mouse hover
				/*.on('mouseover', function (d){
					var z = "polygon."+d3.select(this).attr("class");
					g.selectAll("polygon").transition(200).style("fill-opacity", 0.1)
					g.selectAll(z).transition(200).style("fill-opacity", 0.7)
				})*/
				.on('mouseout', function(){
					g.selectAll("polygon").transition(200).style("fill-opacity", cfg.opacityArea)
				})
				.style("fill", function(j, i){return cfg.color(0)})
				.style("fill-opacity", cfg.opacityArea)
		}

		function drawPoly(){
			areagg.attr("points",function(de) {
				var str=""
				for(var pti=0;pti<de.length;pti++){
					str=str+de[pti][0]+","+de[pti][1]+" "
				}            
				return str
			});
		}
		
		function drawnode(){    
			g.selectAll(".nodes")
				.data(d).enter()
				.append("svg:circle").attr("class", "radar-chart-serie0")
				.attr('r', cfg.radius)
				.attr("alt", function(j){return Math.max(j.value, 0)})
				.attr("cx", function(j, i){
					return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total))
				})
				.attr("cy", function(j, i){
					return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
				})
				.attr("data-id", function(j){return j.axis;})
				.style("fill", cfg.color(0)).style("fill-opacity", 0.9)
				.on('mouseover', function (d){
					var newX =  parseFloat(d3.select(this).attr('cx')) - 10
					var newY =  parseFloat(d3.select(this).attr('cy')) - 5
					tooltip.attr('x', newX).attr('y', newY).text(d.value).transition(200).style('opacity', 1)
					var z = "polygon."+d3.select(this).attr("class")
					g.selectAll("polygon").transition(200).style("fill-opacity", 0.1)
					g.selectAll(z).transition(200).style("fill-opacity", 0.7)
				})
				.on('mouseout', function(){
					tooltip.transition(200).style('opacity', 0)
					g.selectAll("polygon").transition(200).style("fill-opacity", cfg.opacityArea)
				})
				.call(d3.drag().on("drag", move))// for drag & drop
				.append("svg:title")
				.text(function(j){return Math.max(j.value, 0)})
		}

		//Tooltip
		tooltip = g.append('text').style('opacity', 0).style('font-family', 'sans-serif').style('font-size', 13)


		function move(dobj, i){
			this.parentNode.appendChild(this)
			var dragTarget = d3.select(this)

			var oldData = dragTarget.data()[0];
			var oldX = parseFloat(dragTarget.attr("cx")) - cfg["w"]/2
			var oldY = cfg["h"]/2 - parseFloat(dragTarget.attr("cy"))
			var newY = 0, newX = 0, newValue = 0
			var maxX = maxAxisValues[i].x - cfg["w"]/2
			var maxY = cfg["h"]/2 - maxAxisValues[i].y

			if(oldX === 0) {

				newY = oldY - d3.event.dy

				//Workaround for 'jump' behavior of fpr
				/*if(Math.abs(newY) > Math.abs(maxY)) {
					newY = oldY
				} else if (newY < 0 && Math.abs(newY - oldY) > 10) {
					newY = oldY
				} else if (newY < 0) {
					newY = 0
				}*/
				
				if(newY < 0 && oldY){
					newY = oldY
				}
				//Workaround end
				
				if(Math.abs(newY) > Math.abs(maxY)) {
					newY = maxY
				}
				
				newValue = (newY/oldY) * oldData.value


			}
			else{
				var slope = oldY / oldX;    
				newX = d3.event.dx + parseFloat(dragTarget.attr("cx")) - cfg.w/2
				
				//Workaround for 'jump' behavior of precision...
				if(maxX > 0 && newX > maxX) {
					if(Math.abs(newX - maxX) > 10){
						newX = oldX
					}
				} 			
				//... and recall
				else if (maxX < 0 &&  newX > 0){
					if(Math.abs(newX - maxX) > 10){
						newX = oldX
					}
				}
				//Workaround end
				
				
				newY = newX * slope

				var ratio = newX / oldX
				newValue = ratio * oldData.value

			}

			dragTarget
				.attr("cx", function(){return newX + cfg["w"]/2 ;})
				.attr("cy", function(){return cfg["w"]/2 - newY;})
			d[oldData.order].value=newValue

			reCalculatePoints()
			drawPoly()

			//call parent component function 
			if(d[oldData.order]['axis'] === 'false positive rate'){
				adjustValues('fpr',newValue)
			} else {
				adjustValues(d[oldData.order]['axis'],newValue)
			}
		}
	}
  
	render() {
		
		const finalValues = this.props.finalValues
		
		if (this.state.didMount && this.d()){
			this.draw(this.props.chart, this.d(), this.adjustValues)
		}
			
		return(
			<div id='visualisationRadar'>
				{finalValues ? 
					<div id="chart">
						
					</div>
				: ''}
			</div>



		)
	

	}
}
