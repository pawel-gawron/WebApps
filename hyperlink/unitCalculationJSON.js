var property = new Array();
var unit = new Array();
var factor = new Array();

property = "Velocity";
unit = new Array(" rpm ", " rps ", " rad/s ", " rad/min ");
factor = new Array(1, .016666666666667, .10471975511966, 6.2831853071796);

/* @brief button onClick event handling */
function unitCalculationFunctionJSON() {

try {
	var inputJSON = JSON.parse(document.getElementById('velocityValue').value);
}
catch (e){
	alert("Not valid JSON notation");
	return;
}

var tempValueInput = inputJSON[" valueInput "];
var tempValueOutput;

tempValueInput = parseFloat(tempValueInput);

if(!isNaN(tempValueInput) || tempValueInput == 0)
{
	convertNumberUnit(tempValueInput, tempValueOutput, inputJSON);
}
else{
	alert("Bad input data format");
	return;
}
// document.getElementById("resultVelocity").innerHTML = tempValueInput;
}

function convertNumberUnit(source, target, JSON)
{
	var sourceFactor;
	var targetFactor;
	var result;
	var tempUnitInput = JSON[" inputUnit "];
	var tempUnitOutput = JSON[" outputUnit "];
	
	var indexUnitInput = unit.indexOf(tempUnitInput);
	var indexUnitOutput = unit.indexOf(tempUnitOutput);
	
	if(indexUnitInput == -1){
		alert("Wrong unit input");
		return;
	}
	
	if(indexUnitOutput == -1){
		alert("Wrong unit output");
		return;
	}
	
	sourceFactor = factor[indexUnitInput];
	targetFactor = factor[indexUnitOutput];
	
	result = source;
	result = result * sourceFactor;
	result = result / targetFactor;
	
	const JSONresult = '{"result":' + result + ',"unit": "' + tempUnitOutput + '"}';
	// alert(typeof(JSONresult));
	// var JSONparser = JSON.parse(JSONresult);

	
	document.getElementById("resultVelocity").innerHTML = JSONresult;
}