class Node{
  constructor(vector,size){
    this.vector = vector;
    this.size = size;
    this.prevNode = null
  }
  set_prev_node(prevNode){
    this.prevNode = prevNode;
  }
  draw_node(color){
    stroke(color)
    circle(this.vector.x,this.vector.y,this.size);
  }
  populate_arr(leftarr,rightarr,index){
    if (this.prevNode == null){
      return
    }
    else{
      let direction = this.prevNode.vector.copy().sub(this.vector).normalize().mult(this.size/2);
      angleMode(DEGREES);
      stroke("blue")
      strokeWeight(3);
      if (index == 1){
      direction.rotate(45);
      leftarr.push(direction.copy().add(this.vector))
      point(this.vector.x + direction.x, this.vector.y + direction.y);
      direction.rotate(-45);
      leftarr.push(direction.copy().add(this.vector))
      point(this.vector.x + direction.x, this.vector.y + direction.y);
      direction.rotate(-45);
      leftarr.push(direction.copy().add(this.vector))
      point(this.vector.x + direction.x, this.vector.y + direction.y);
      direction.rotate(45);
      }
      direction.rotate(-90);
      leftarr.push(direction.copy().add(this.vector))
      point(this.vector.x + direction.x, this.vector.y + direction.y);
      stroke("red")
      direction.rotate(180);
      rightarr.push(direction.copy().add(this.vector))
      point(this.vector.x + direction.x, this.vector.y + direction.y);
    }
  }
}
  
class Lizard{
  constructor(distance,fill,stroke,pointarr,legarr,leg,mult){
    this.numPoints = pointarr.length;
    this.distance = distance;
    this.points = [];
    let size = 10;
    this.legPoints = [];
    this.legs = [];
    this.pointarr = pointarr;
    this.fill = fill;
    this.stroke = stroke;
    this.mult = mult;
    for (var i = 0; i < this.numPoints; i++) {
      let temp = new Node(createVector(i * this.distance, 100),this.pointarr[i] * 5)
      this.points.push(temp);
      if (i != 0){
        temp.set_prev_node(this.points[i-1]);
      }
      if (legarr.includes(i)){
        
        this.legPoints.push(temp);
        this.legs.push(new Leg(leg[0],leg[1],this.legPoints[this.legPoints.length-1].vector))
        this.legs.push(new Leg(leg[0],leg[1],this.legPoints[this.legPoints.length-1].vector))
      }
    }
    this.num = 0;
  }
  
  
  draw_lizard(){
    
    
    for (let i = 0; i < this.legPoints.length;i++){
      this.legs[i*2].set_anchor(this.legPoints[i].vector.copy());
      this.legs[i*2 + 1].set_anchor(this.legPoints[i].vector.copy());
    }
    this.set_legs();
    stroke(this.stroke)
     for (let i = 0; i < this.legPoints.length;i++){
    this.legs[i * 2].draw_leg();
    this.legs[i * 2 + 1].draw_leg();
     }
    
    for (var i = 0; i < this.numPoints - 1; i++) {
      let temp = ConstrainDistance(this.points[i + 1].vector, this.points[i].vector, this.distance);
      this.points[i + 1].vector = temp;
    }
    strokeWeight(2)
    fill('black')
    let leftarr = [];
    let rightarr = [];
    this.points.forEach((e,index) => e.populate_arr(leftarr,rightarr,index));
    if (true){
    stroke(this.stroke)
    fill(this.fill);
    
    rightarr.reverse();
    beginShape();
    leftarr.forEach((e) => curveVertex(e.x,e.y));
    rightarr.forEach((e) => curveVertex(e.x,e.y));
    curveVertex(leftarr[0].x,leftarr[0].y)
    curveVertex(leftarr[1].x,leftarr[1].y)
    curveVertex(leftarr[2].x,leftarr[2].y)
    endShape();
    noFill();
    }
    
    
  }
  set_legs(){
    angleMode(DEGREES);
    //print(this.legs[0].points[0].vector.x)
    for (let i = 0; i < this.legPoints.length;i++){
      let direction = this.legPoints[i].vector.copy().sub(this.legPoints[i].prevNode.vector.copy());
      let heading = direction.heading();
      
      
      let vector = createVector(this.legs[0].distance * this.mult,0)
      vector.setHeading(heading - 120);
      let origin = this.legPoints[i].vector.copy().add(vector);
      //circle(origin.x,origin.y,10);
      
      let legpoint1 = createVector(origin.x,origin.y);
          
      vector.setHeading(heading + 120);
      origin = this.legPoints[i].vector.copy().add(vector);
      //circle(origin.x,origin.y,10);
      let legpoint2 = createVector(origin.x,origin.y);
      

      this.legs[i * 2 + 1].checkstep(legpoint2)
      this.legs[i * 2].checkstep(legpoint1)
      
    }
    
    
    
  }
  
  follow(x,y){
    this.points[0].vector.x = x;
    this.points[0].vector.y = y;
  }
}
class Leg{
  constructor(numPoints,distance,anchor){
    this.numPoints = numPoints;
    this.distance = distance;
    this.anchor = anchor;
    this.points = [];
    this.size = 10;
    for (var i = 0; i < this.numPoints; i++) {
      let temp = new Node(createVector(i * this.distance, 100),this.size)
      this.points.push(temp);
    }
  }
  checkstep(vector){
    //print("checking step for " + vector.x + " " + vector.y)
    //print(this.points[this.points.length-1])
    //print(vector)
    //print(this.check_dist_from_point(vector))
    if (this.check_dist_from_point(vector) > 50.0){
      this.points[0].vector = vector.copy();
      //-*Reach Forwards*- (this pulls the chain off of its anchor)
      if (true){
      for (var i = 0; i < this.numPoints - 1; i++) {
        this.points[i+1].vector = ConstrainDistance(this.points[i+1].vector, this.points[i].vector, this.distance);
      }
    }
      
    }
  }
  check_dist_from_point(vector){
    let v1 = this.points[0].vector;
    //line(v1.x,v1.y,vector.x,vector.y)
    return Math.abs(this.points[0].vector.copy().sub(vector).mag())
  }
  set_anchor(anchor){
    this.anchor = anchor;
  }
  draw_leg(){
    if (true){
      this.points[this.points.length - 1].vector = this.anchor;
      //-*Reach Backwards*- (this pulls the chain back to the anchor)
      for (var i = this.numPoints - 1; i > 0; i--) {
        this.points[i - 1].vector = ConstrainDistance(this.points[i - 1].vector, this.points[i].vector, this.distance);
        
      }
    }
    
    if (true){
    for (var i = 0; i < this.numPoints; i++) {
      
      strokeWeight(this.size)
      if (i != this.numPoints - 1){
        let v1 = this.points[i].vector;
        let v2 = this.points[i+1].vector;
        line(v1.x,v1.y,v2.x,v2.y)
      }
    }
    }

  }
}