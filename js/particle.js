function Particle(x, y, r) {
    this.hue = random(360);
 //Nastavuje nahodnou barvu
    var options = {
      restitution: 0.5,
     //Jak moc se kulicka odrazi
      friction: 0,
     //Jak moc se zpomaluje
      density: 1
     //Hustota kulicky
    }
    //Nastaveni promene options
    x += random(-1, 1);
    //Nastavuje x hodnotu bud 1 nebo -1 to zaridi nahodne odrazeni kulicky
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = "particle";
    this.r = r;
    World.add(world, this.body);
  }
  
  Particle.prototype.isOffScreen = function () {
    var x = this.body.position.x;
    var y = this.body.position.y;
    return (x < -50 || x > width + 50 || y > height);
  }
  
  Particle.prototype.show = function () {
    fill(this.hue, 255, 255);
    noStroke();
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }
