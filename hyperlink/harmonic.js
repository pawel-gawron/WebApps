var harmonic = new Array();
var lastTimeStamp = 0; ///< most recent time stamp
var chart; ///< Chart.js object
var chartContext;  ///< chart context i.e. object that "owns" chart
var xdata; ///< x-axis labels array: time stamps
var ydata; ///< y-axis data array: random value

var updateCount = 0;
let updateCount2 = 0;
var numberElements = 200;
var updateInterval = 200; //in ms

var mass = 1;
var k = 100;
var period = 2;
var sampling = 100;
var phase = 90;
var amplitude = 2;

function updateChart(value, sampling)
{
		lastTimeStamp += Number(sampling)/1000;
		chart.data.labels.push(lastTimeStamp.toFixed(4));
		chart.data.datasets[0].data.push(value);
}

function removeData() {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

window.onload = function() {
	// var inputSamplingPeriod = document.getElementById('samplingPeriod').value;
	// var inputSignalPeriod = document.getElementById('signalPeriod').value;

	// array with ten consecutive integers: <0, 9>
	// xdata = [...Array(inputSignalPeriod).keys()]; 
	// scaling all values ​​times the sample time 
	// xdata.forEach(function(p, i) {this[i] = (this[i]*inputSamplingPeriod).toFixed(4);}, xdata);

	// set most recent time stamp as last value of 'xdata'
	// lastTimeStamp = +xdata[xdata.length-1]; 

	// array with ten 'undefined' elements
	// ydata = [...new Array(xdata.length)]; 

	// get chart context from 'canvas' element
	chartContext = document.getElementById('chart').getContext('2d');

	chart = new Chart(chartContext, {
		// The type of chart: linear plot
		type: 'line',

		// Dataset: 'xdata' as labels, 'ydata' as dataset.data
		data: {
			labels: xdata,
			datasets: [{
				fill: false,
				label: 'Harmonic function',
				backgroundColor: 'rgb(0, 0, 255)',
				borderColor: 'rgb(255, 0, 0)',
				data: ydata,
				lineTension: 0
			}]
		},

		// Configuration options
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Amplitude [-]'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Time [s]'
					}
				}]
			}
		}
	}
	);
	function addData(data) {
      if(data){
		lastTimeStamp += sampling/1000;
		chart.data.labels.push(lastTimeStamp.toFixed(4));
        chart.data.datasets.forEach((dataset) =>{dataset.data.push(data)});
        if(updateCount > numberElements){
          chart.data.labels.shift();
          chart.data.datasets[0].data.shift();
        }
        else updateCount++;
        chart.update();
      }
    };

    function updateData() {
      updateCount2+=sampling/1000;
	  // document.getElementById("result").innerHTML = updateCount2;
      addData(amplitude * Math.cos(Math.sqrt(k/mass) * Math.PI/180 * updateCount2 + phase));
      setTimeout(updateData,updateInterval);
    }
	
	updateData();
};

function harmonicFunction()
{
	var inputAmplitude = document.getElementById('amplitude').value.toString();
	var inputPhase = parseInt(document.getElementById('phase').value.toString());
	var inputSignalPeriod = parseInt(document.getElementById('signalPeriod').value.toString());
	var inputSamplingPeriod = parseInt(document.getElementById('samplingPeriod').value.toString());
	var inputMass = parseInt(document.getElementById('mass').value.toString());
	var inputConstK = parseInt(document.getElementById('constK').value.toString());
	
	amplitude = parseInt(inputAmplitude);
	phase = parseInt(inputPhase);
	period = parseInt(inputSignalPeriod);
	sampling = parseInt(inputSamplingPeriod);
	mass = parseInt(inputMass);
	k = parseInt(inputConstK);
	
	// for (let t = 0; t <= inputSignalPeriod/(inputSamplingPeriod/1000); t++) {
		// harmonic[t] = inputAmplitude * Math.cos(Math.sqrt(1/100) * Math.PI/180 * t + inputPhase);
		// updateChart(harmonic[t], inputSamplingPeriod);
	// }
	// // chart.update();
	
	// document.getElementById("result").innerHTML = inputSamplingPeriod;
	// return harmonic;
}