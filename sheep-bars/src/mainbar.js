var pulseSize = 0; // in number of heights
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
