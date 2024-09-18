export {Entity};
export {Enemy};
export {Goat};
class Entity {
    constructor(name) {
      this.name = name;
      this.type = 0;
      this.width = 16;
      this.height = 32;
      this.x = 0;
      this.y = 0;
      this.frameX = 0;
      this.frameY = 0;
      this.xChange = 0;
      this.yChange = 0;
      this.angle = 0;
      this.centerx = 0; 
      this.centery = 0; 
      this.isColliding = false;
      this.mass = 100;
    }
  }
  
  class Enemy extends Entity {
    constructor(name) {
      super(name);
      this.type = 1;
      this.width = 32;
      this.image = new Image();
      this.image.src = "../static/unsheered.png";
      this.lastDirectionChange = Date.now();
      this.wanderAngle = Math.random() * 2 * Math.PI;
      this.move();
      this.runningAway;
      this.state = false;
      this.chased = false;
    }
  
    move() {
      this.xChange = Math.cos(this.wanderAngle) * 1;
  
      this.yChange = Math.sin(this.wanderAngle) * 1;

      this.angle = (this.wanderAngle * 180) / Math.PI;
    }
  }

  class Goat extends Entity{
    constructor(name) {
      super(name);
      this.width = 32;
      this.lastDirectionChange = Date.now();
      this.wanderAngle = Math.random() * 2 * Math.PI;
      this.move();
      this.mass = 200;
      this.type = 2;
      this.chasing = false
    }
  
    move() {
      this.xChange = Math.cos(this.wanderAngle) * 1;
  
      this.yChange = Math.sin(this.wanderAngle) * 1;

      this.angle = (this.wanderAngle * 180) / Math.PI;
    }
  }
  