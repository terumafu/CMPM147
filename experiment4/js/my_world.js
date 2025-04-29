"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  for(let x = -1; x <= 1; x++ ){
    for(let y = -1; y <= 1; y++){
      if (x != 0 || y != 0){
        clicks[[x + i,y + j]] = 1 + clicks[[x + i,y + j]] | 0;
      }
    }
  }
}


function p3_drawBefore() {}

function p3_drawTile(i, j,timepassed = 0,outlines) {

  noStroke();
  let noisevalue = noise(i / 10,j / 10);
  
  //if (XXH.h32("tile:" + [i, j], worldSeed) % 4 == 0) {
  //fill(255 * noisevalue);
  let lowcolor = [20, 30, 20];
  let highcolor = [500, 60, 220];
  let n = clicks[[i, j]] | 0;
  
  
  noisevalue += 0.1 * n;
  noisevalue *= Math.sin(timepassed)/2 + 0.5;
  noisevalue = Math.min(1,noisevalue)
  fill(find_between_color(lowcolor,highcolor,noisevalue * noisevalue));
  
  //} else {
    //fill(255, 190, 100);
  //}
  //OUTLINE
  let outlineWidth = 1;
  if (outlines){
  push();
  fill(0);
  beginShape();
  vertex(-tw - outlineWidth, 0);
  vertex(0, Math.max(th * 10 * noisevalue * noisevalue + outlineWidth,th - 1));
  vertex(tw + outlineWidth, 0);
  vertex(0, Math.min(-th * 10 * noisevalue * noisevalue - outlineWidth,-th - 1));
  endShape(CLOSE);

  pop();
  }
  
  push();

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);//Math.max(th * 10 * noisevalue * noisevalue,th));
  vertex(tw, 0);
  vertex(0, Math.min(-th * 10 * noisevalue * noisevalue,-th));
  endShape(CLOSE);

  

  pop();

}

function find_between_color(lowcolor, highcolor, value){
  let rdiff = highcolor[0] - lowcolor[0];
  let gdiff = highcolor[1] - lowcolor[1];
  let bdiff = highcolor[2] - lowcolor[2];
  
  return color(lowcolor[0] + rdiff * value, lowcolor[1] + gdiff * value, lowcolor[2] * bdiff * value)
}
function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}
