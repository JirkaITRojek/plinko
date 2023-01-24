var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
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
  //Vytvori canvas
  colorMode(HSB);
  //Nastavy alternativu RGB
  engine = Engine.create();
  world = engine.world;


  newParticle();
  //V teto casti se pocita pres for kam dat plinka nebo ty bile castice ktere se nehybou
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
      //Tady se to posle do plinko.js
    }
  }

  var b = new Boundary(width / 2, height + 50, width, 100);
  bounds.push(b);
  //Tohle nastavy okraje pres ktere neprojdou kulicky, nastaveno pres boundary.js

  for (var i = 0; i < cols + 2; i++) {
    var x = i * spacing;
    var h = 100;
    var w = 10;
    var y = height - h / 2;
    var b = new Boundary(x, y, w, h);
    //Tohle udela sloupce ktere vytvari bloky do kterych padaji kulicky zase delano pres boundary.js
    bounds.push(b);

  }
  
 }
addEventListener("keypress", function(e){
  //Posloucha zmacknuti tlacitekk a pres if prirazuje hodnoty promene
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
  })

function newParticle() {
  //Vytvori nove kulicky pouze kdyz byly zmacknute spravne klavesy
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
  //Nastavi pozadi na cerno
  if (frameCount % (speed * 10) == 0) {
    //Spusti funkci newParticle pouze kdyz frameCount deleno promennou speed kterou zadal uzivatel vynasobena deseti je delen bezezbytku
    newParticle();
  }
  Engine.update(engine, 1000 / 30);
  for (var i = 0; i < particles.length; i++) {
    //Ukazuje kulicky s indexem [i]
    particles[i].show();
    if (particles[i].isOffScreen()) {
      //odstranuje vsechny kulicky ktere jsou mimo obrazovku 
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
