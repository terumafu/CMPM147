// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file


// Globals

let myInstance;
let canvasContainer;
var centerHorz, centerVert;
let width = 0;
let height = 0;
let zoomfactor = 200;
let thebackground = ['sienna','saddlebrown']
let foreground = ['gray','beige','green']

let lizard = null;
let bug = null;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  width = canvasContainer.width();
  height = canvasContainer.height();
  // resize canvas is the page is resized
  //createCanvas(width,height);
  for (let w = 0; w < width; w++){
    for (let h = 0; h < height; h++){
      let noisevalue = noise(w/zoomfactor,h/zoomfactor);
      let thiscolor = thebackground[Math.floor(noisevalue * thebackground.length)];
      set(w,h,color(thiscolor));
      
      let noisevalue2 = noise(w/zoomfactor * 1.5,h/zoomfactor * 1.5);
      let thiscolor2 = foreground[Math.floor(noisevalue * foreground.length)];
      if (thiscolor2 != 'beige' ){
        set(w,h,color(thiscolor2));
      }
      //stroke(color(noisevalue * 255,noisevalue * 255,noisevalue * 255))
      //rect(w,h,1)
    }
  }
 updatePixels();
  lizard = new Lizard(distance = 30,'green','darkgreen',[1,5,7,6,8,9,8,6,5,4,3,2,1.5,1,1,0.5],[3,6],[3,25],2);
  millipede = new Lizard(distance = 30,'black','black',[2.5,3,3,3,3,3,3,3,3,3,3,2.5],[1,2,3,4,5,6,7,8,9,10,11],[3,10],6);
  bug = new Bug(100,100,2);
  bug2 = new Bug(100,100,2);
}


function draw() {
  updatePixels();
  bug.run(20,780)
  bug2.run(20,780)
  millipede.draw_lizard();
  lizard.draw_lizard();

  millipede.follow(bug.x,bug.y)
  lizard.follow(bug2.x,bug2.y);
  //lizard.follow(mouseX,mouseY);
  
}

function ConstrainDistance(point, anchor, distance) {
  let vec = point.copy();
  let vec2 = anchor.copy();
  //print((vec.sub(vec2).normalize().mult(distance)).add(vec2));
  return (vec.sub(vec2).normalize().mult(distance)).add(vec2);
}


function mouseClicked(){
  bug.go(mouseX,mouseY);
  bug2.go(mouseX,mouseY);
}
