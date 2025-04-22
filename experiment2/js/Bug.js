class Bug{
  constructor(x,y,speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = createVector(1,1)
    this.currentrand = 0;
    this.maxrand = 3;
  }
  run(innerbounds,outerbounds){
    angleMode(DEGREES)
    this.currentrand += random(-1,1)
    if (this.currentrand > this.maxrand){
      this.currentrand -= 1;
    }
    if (this.currentrand < -this.maxrand){
      this.currentrand += 1;
    }
    this.direction.rotate(this.currentrand)
    this.x += this.direction.x * this.speed
    this.y += this.direction.y * this.speed
    if (false){
    if (this.x <= innerbounds || this.x >= outerbounds){
      this.direction.x *= -1;
    }
    if (this.y <= innerbounds || this.y >= outerbounds){
      this.direction.y *= -1;
    }
    }
  }
  go(x,y){
    this.x = x;
    this.y = y;
  }
  
}