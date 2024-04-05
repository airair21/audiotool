// $(document).ready(function() {

let mic;
let fft;
let amp;

const squishFactor = 0; // Adjust the squish factor to your preference

var volHistory = [];

var isRecording = false;

function setup() {
  createCanvas(displayWidth, displayHeight);
  // canvas.parent('visualizationCanvas');
  amp = new p5.Amplitude();
  
  mic = new p5.AudioIn();
  fft = new p5.FFT();

  // Start the microphone input and FFT analysis
  startAudio();

  // Create a button to start/stop recording
  var button = createButton('Record');
  button.position(120, 120);
  button.mousePressed(toggleRecording);
}

function draw() {
  background(0);
  
  let vol = mic.getLevel();
  
  volHistory.push(vol);
  noFill(); 
  //for the shape, it does a weird thing

  
  // Calculate the current vertical position based on the volume
  var currentY = map(vol, 0, 1, height, 0);
  translate(0, height / 1.6 - currentY); // Center vertically
  
  beginShape();
  for (var i = 0; i < volHistory.length; i++) {
    // Map x-coordinate within a smaller portion of the canvas width
    var x = map(i, 0, volHistory.length, 0, width / 1.5); 
    // Adjust width / 4 as needed
    var y = map(volHistory[i], 0, .3, height, 0);
    vertex(x, y);
  }
  endShape();
  
  // Remove oldest element if it moves off the screen
  // if (volHistory.length > width * 3 / 4) {
  //   volHistory.splice(0, 1);
  // }
  
  // Visualize the boundary
  stroke(255, 0, 0);
  // line(volHistory.length, 0, volHistory.length, height);
}

  function startAudio() {
    mic.start();
    fft.setInput(mic);
    isRecording = true;
  }

  function stopAudio() {
    mic.stop();
    isRecording = false;
  }

  function toggleRecording() {
    if (isRecording) {
      stopAudio();
    } else {
      startAudio();
    }
}





// });