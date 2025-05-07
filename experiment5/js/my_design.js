/* exported p4_inspirations, p4_initialize, p4_render, p4_mutate */


function getInspirations() {
  return [
    {
      name: "sidcon", 
      assetUrl: "./assets/sidcon.jpg",
      credit: ""
    },
    {
      name: "amongus", 
      assetUrl: "./assets/amongus.webp",
      credit: ""
    },
    {
      name: "rikky", 
      assetUrl: "./assets/rikky.jpeg",
      credit: ""
    }
  ];
}

function initDesign(inspiration) {
  resizeCanvas(inspiration.image.width / 8, inspiration.image.height / 8);
  
  let design = {
    bg: 128,
    fg: []
  }
  
  for (let x = 0; x < width; x+=5){
    for (let y = 0; y < height; y+=5){
      design.fg.push({x: x,
                      y: y,
                      w: random(width/2),
                      h: random(height/2),
                      fill: coordinates_to_color(x,y,inspiration.image,8)})
    }
  }
   
  return design;
}

function coordinates_to_color(x,y,img, scale){
img.loadPixels();
let num = int((y * img.width * scale + x * scale) * 4)
print(num) 
let newcolor = {r: img.pixels[num], g: img.pixels[num + 1],b: img.pixels[num + 2]};
print(newcolor)
return newcolor;

}
function renderDesign(design, inspiration) {
  
  background(design.bg);
  noStroke();
  for(let box of design.fg) {
    //print(box.fill.r)
    fill(box.fill.r, box.fill.g, box.fill.b, 128);
    rect(box.x, box.y, box.w, box.h);
  }
}

function mutateDesign(design, inspiration, rate) {
  //return;
  design.bg = mut(design.bg, 0, 255, rate);
  for(let box of design.fg) {
    fill(box.fill.r, box.fill.g, box.fill.b, 128);
    box.x = mut(box.x, 0, width, rate);
    box.y = mut(box.y, 0, height, rate);
    box.w = mut(box.w, 0, width/2, rate);
    box.h = mut(box.h, 0, height/2, rate);
  }
}


function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 20), min, max);
}
