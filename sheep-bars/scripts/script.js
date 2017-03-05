var colourBars = [];
var barJumpFrames = 5; // number of animation frames
var barJumpDisplacement = 0; // position in animation

var colourPulseRecede = 0.01; // speed of receding back

var COLOUR_BAR_HEIGHT = 0.01; // colour bar size

var COLOUR_PULSE_CONSTANT = 0.04; // colour bar pulse size

var colourPulseSize = 0; // in number of heights

// add a bar
function createBar() {
  colourBars.push({
    barPosition: 1,
    barColour: randomArrayElement(COLOURS)
  });
}

// colour bar pulse
function colourPulse() {
  colourPulseSize = COLOUR_PULSE_CONSTANT;
}

// make pulse recede
function colourBarTick() {
  if (colourPulseSize > 0) {
    colourPulseSize -= pulseRecede;
  }
  if (colourPulseSize < 0)
    colourPulseSize = 0;
}

// jump down
function barShift() {
  var splicePositions = [];
  for (var i=0; i<colourBars.length; i++) {
    colourBars[i].barPosition++;
    if (colourBars[i].barPosition == 10) {
      splicePositions.push(i);
    }
  }
  for (var j=splicePositions.length-1; j>=0; j--) {
    colourBars.splice(splicePositions[j], 1);
  }
}

function drawBars(canvas, context) {
  for (var i=0; i<colourBars.length; i++) {
    context.fillStyle=colourBars[i].barColour;
    context.fillRect(0, (colourBars[i].barPosition*0.1-COLOUR_BAR_HEIGHT/2-colourPulseSize/2)*canvas.height, canvas.width, (COLOUR_BAR_HEIGHT+colourPulseSize)*canvas.height);
  }
}
;var mainTimer = false;
var FPS = 50;
var mainInterval = 1000/FPS;

var bpm = 128;
var pulseInterval = 60000/bpm;

var COLOURS = ["red", "blue", "yellow", "green"];

// initialise stuff
function init() {
  mainTimer = setInterval(tick, mainInterval);
  var drawArea = document.getElementById("barCanvas");
  var graphics = drawArea.getContext("2d");

  resizeCanvas();

  initBar();
}

// changes stuff every few milliseconds
function tick() {
  update();
  render();
}

// update stuff
function update() {
  barTick();
  colourBarTick();
}
// draw stuff
function render() {
  var canvas = document.getElementById("barCanvas");
  var context = canvas.getContext("2d");

context.clearRect(0, 0, canvas.width, canvas.height);
  drawMainBar(canvas, context); // animate bar
  drawBars(canvas, context); // moving bars
}
;var pulseSize = 0; // in number of heights
var pulseTimer = false;

var pulseRecede = 0.01; // speed of receding back

var PULSE_CONSTANT = 0.04; // main bar pulse size

var BAR_HEIGHT = 0.04; // bar height

var BAR_Y = 0.9; // percentage of page height

// init pulse timer
function initBar() {
  pulseTimer = setInterval(pulse, pulseInterval);
}

// each throb
function pulse() {
  pulseSize = PULSE_CONSTANT;
  colourPulse();
  barShift();
  createBar();
}

// make pulse recede
function barTick() {
  if (pulseSize > 0) {
    pulseSize -= pulseRecede;
  }
  if (pulseSize < 0)
    pulseSize = 0;
}

// draw bottom bar
function drawMainBar(canvas, context) {
context.fillStyle="#000000";
  context.fillRect(0, (BAR_Y-BAR_HEIGHT/2-pulseSize/2)*canvas.height, canvas.width, (BAR_HEIGHT+pulseSize)*canvas.height);
}
;function randomArrayElement(array) {
  return array[Math.floor(Math.random()*array.length)];
}
;function resizeCanvas(){
  var drawArea = document.getElementById("barCanvas");

  fitToContainer(drawArea);
}

  function fitToContainer(canvas){
    canvas.style.width='100%';
    canvas.style.height='100%';

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
