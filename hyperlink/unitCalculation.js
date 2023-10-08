var property = new Array();
var unit = new Array();
var factor = new Array();

property = "Velocity";
// unit = new Array("rpm", "rps", "rad/s", "rad/min");
factor = new Array(1, .016666666666667, .10471975511966, 6.2831853071796);

var buttonCounter = 0; /// < button onClick event counter

/* @brief button onClick event handling */
function unitCalculationFunction() {

var tempValueInput = document.getElementById('velocityValue').value
var tempValueOutput;

tempValueInput = parseFloat(tempValueInput);

if(!isNaN(tempValueInput) || tempValueInput == 0)
{
	convertNumberUnit(tempValueInput, tempValueOutput);
}
}

function convertNumberUnit(source, target)
{
	var sourceFactor;
	var targetFactor;
	var result;
	var tempUnitInput = document.getElementById('unitsInput').selectedIndex;
	var tempUnitOutput = document.getElementById('unitsOutput').selectedIndex;
	
	sourceFactor = factor[tempUnitInput];
	targetFactor = factor[tempUnitOutput];
	
	result = source;
	result = result * sourceFactor;
	result = result / targetFactor;
	
	document.getElementById("resultVelocity").innerHTML = result;
}