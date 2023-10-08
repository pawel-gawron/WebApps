// var buttonCounter = 0; ///< button onClick event counter
// /* @brief button onClick event handling */
// function myOnClickMethod() {
// buttonCounter += 1;
// var paragraphDispText = "<b>Click counter: </b>" + buttonCounter.toString();
// document.getElementById("paragraph").innerHTML = paragraphDispText;
// }

// initialize LED matrix json object,
var matrixState = {};

for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++){
        // matrixState[i.toString()+j.toString()] = 0;
        matrixState[i.toString()+j.toString()] = {'O':0, 'R': 0, 'G':0, 'B': 0};
    }
}


// Color picker
let colorWell;
const defaultColor = "#0000ff";

window.addEventListener("load", startup, false);


function startup() {
  colorWell = document.querySelector("#colorWell");
  colorWell.value = defaultColor;
  colorWell.addEventListener("input", updateFirst, false);
  // colorWell.addEventListener("change", updateAll, false);
  colorWell.select();
}

var color;
var r;
var g;
var b;
function updateFirst(event) {
  // const p = document.querySelector("p");
  // if (p) {
    color = event.target.value;
    r = parseInt(color.substr(1,2), 16)
    g = parseInt(color.substr(3,2), 16)
    b = parseInt(color.substr(5,2), 16)
    console.log(`red: ${r}, green: ${g}, blue: ${b}`)
}



function updateLED(buttonID)
{
  var debugText = "button id: " + buttonID.toString();
  document.getElementById("paragraph").innerHTML = debugText;

  matrixState[buttonID]['O']++;

  var isON = (matrixState[buttonID]['O'])%2
  matrixState[buttonID]['O'] = isON  ? 1 : 0;

  console.log(`buttonID:${buttonID}, state:${isON}`);


  var buttonColor = isON ? color : '';


  // var color = document.getElementById(colorpicker)
  console.log(`Colorpicker: ${color}`)
  matrixState[buttonID]['R'] = r;
  matrixState[buttonID]['G'] = g;
  matrixState[buttonID]['B'] = b;
  document.getElementById(buttonID).style.background = buttonColor;

  document.getElementById(buttonID).innerHTML = matrixState[buttonID]['O'];
  // document.getElementById("debug").innerHTML = matrixState[buttonID]['O'];
  // document.getElementById("state_json").innerHTML = JSON.stringify(matrixState, null, 2);
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
	
	
}
// download(jsonData, 'json.txt', 'text/plain');

function userSendData()
{
  download( JSON.stringify(matrixState, null, 2), 'matrix.json', 'text/plain');
  
  localStorage.setItem('LED_json', JSON.stringify(matrixState, null, 2));
  // $("#response").val(JSON.stringify(matrixState, null, 2));
  
  if(localStorage.getItem('LED_json'))
  {
	  $("#response").val("Data on server");
	  // $("#data").val(JSON.stringify(matrixState, null, 2));
  }
}
