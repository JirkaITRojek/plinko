var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var paddle = [];
var screenWidht = screen.width;
var screenHeight = screen.height / 9 * 8;
var cols = 20;
var rows = 8;
var speed = prompt('Zadej rychlost od 10 do 1')
let a =0;
let s =0;
let d =0;


function setup() {
  createCanvas(screenWidht, screenHeight);
  colorMode(HSB);
  engine = Engine.create();
  world = engine.world;


  newParticle();
  var spacing = width / cols;
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols + 1; i++) {
      var x = i * spacing;
      if (j % 2 == 0) {
        x += spacing / 2;
      }
      var y = spacing + j * spacing;
      var p = new Plinko(x, y, 16);
      plinkos.push(p);
    }
  }

  var b = new Boundary(width / 2, height + 50, width, 100);
  bounds.push(b);

  for (var i = 0; i < cols + 2; i++) {
    var x = i * spacing;
    var h = 100;
    var w = 10;
    var y = height - h / 2;
    var b = new Boundary(x, y, w, h);
    bounds.push(b);

  }
  
 }
addEventListener("keypress", function(e){
    if(e.code == 'KeyA'){
      a = 1;
    }
    if(e.code == 'KeyS'){
      s = 1;
    }
    if(e.code == 'KeyD'){
      d = 1;
    }
    if(e.code == 'KeyW'){
      a = 0;
      s = 0;
      d = 0;
    }
  });
function newParticle() {
  if(s ==1){
    var p = new Particle(screenWidht / 2, 0, 10);
  particles.push(p);
  }
  if(a == 1){
    var p = new Particle(screenWidht / 4, 0, 10);
  particles.push(p);
  }
  if(d == 1){
    var p = new Particle((screenWidht / 4) * 3, 0, 10);
  particles.push(p);
  }

}

function draw() {
  background(0, 0, 0);
  //Zde si zmen rychlost padani
  if (frameCount % (speed * 10) == 0) {
    newParticle();
  }
  Engine.update(engine, 1000 / 30);
  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
    if (particles[i].isOffScreen()) {
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
      i--;
    }
  }
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].show();
  }
  for (var i = 0; i < bounds.length; i++) {
    bounds[i].show();
  }
}
