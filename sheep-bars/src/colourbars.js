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
