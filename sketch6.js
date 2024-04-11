let mic;
let fft;
let amp;

let strokeColor;
let strokeColorB;

var volHistory = [];
const squishFactor = 0; // Adjust the squish factor to your preference


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
  
  // background(5);
  // background(strokeColorB);
  
}

function draw() {
  colorMode(RGB);
  // background(123);
  
  let vol = mic.getLevel()*2;
  volHistory.push(vol);
  
  let spectrum = fft.analyze();
  
  noStroke();
  translate(width / 2, height / 2);
  for (let i = 0; i < volHistory.length; i++) {
    let amp = volHistory[i];
    let angle = map(i*6, amp*88, volHistory.length, 5, PI);
    let r = map(i, 5, amp^8, amp/2 , amp*-5);
    let x = r * cos(angle);
    let y = r / sin(angle);
    fill(strokeColor);
    ellipse(x , y / 2, vol*3);
  }
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
  let body = select('canvas')
  body.style('background-color',strokeColorB);
}

function saveIMG() {
  save('paintwithyourvoice.png')
}

