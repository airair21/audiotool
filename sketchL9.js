let mic;
let fft;
let amp;

let strokeColor;
let strokeColorB;

var volHistory = [];

var isRecording = false;

var colorButton;
var saveButton;


function setup() {
  createCanvas(displayWidth, displayHeight);
  // document.bgColor = randomColorB;
  // querySelector('body')= "randomColorB";
  select('body').attribute('randomColorB');
  


  amp = new p5.Amplitude();
  
  mic = new p5.AudioIn();
  fft = new p5.FFT();

  // Start the microphone input and FFT analysis
  startAudio();

  // Create a button to start/stop recording
  // var button = createButton('Record');
  // button.position(120, 120);
  // button.mousePressed(toggleRecording);
  
  strokeColor = (255);
  colorButton = createButton("Change Color");
  colorButton.mousePressed(randomColor);
  colorButton.position(150, 150);
  
  strokeColorB = color(5);
  colorButton = createButton("Change Background");
  colorButton.mousePressed(randomColorB);
  colorButton.position(250, 250);
  
  saveButton = createButton("Save me pleeeeeeeease help");
  saveButton.mousePressed(saveIMG);
  saveButton.position(350, 350);
  
}

function draw() {
  
  colorMode(RGB);
  
  
  
  stroke(strokeColor);
  
  
  background(strokeColorB);
  
  let vol = mic.getLevel();
  
  volHistory.push(vol);
  noFill(); 
  //for the shape, it does a weird thing

  
  // Calculate the current vertical position based on the volume
  var currentY = map(vol, 0, 1, height, 0);
  translate(0, height / 2 - currentY); // Center vertically
  
  beginShape();
  for (var i = 0; i < volHistory.length; i++) {
    // Map x-coordinate within a smaller portion of the canvas width
    // var x = map(i, 2, volHistory.length, 0, width ); 
    var x = map(i, cos(i), volHistory.length, 2, width ); 
    // Adjust width / 4 as needed
    var y = map(volHistory[i], 0, .75, height, 0);
    // vertex(x, y);
    // vertex(y-250, y);
    vertex(cos(x)+900, y);
    // vertex(y+250, x);
    // vertex(y+50, x);
    // vertex(x+50, x);
    vertex(x^3, y);
    // vertex(y^5, x);
  }
  endShape();
  
  // Remove oldest element if it moves off the screen
  // if (volHistory.length > width * 3 / 4) {
  //   volHistory.splice(0, 1);
  // }
  
  // Visualize the boundary
  // stroke(r, g, b);
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


function randomColor() {
  strokeColor = color(random(255), random(255), random(255));
}
function randomColorB() {
  strokeColorB = color(random(255), random(255), random(255));
  // let body = select('canvas')
  // body.style('background-color',strokeColorB);
}

function saveIMG() {
  save('paintwithyourvoice.png')
}