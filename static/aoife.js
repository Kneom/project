// game where you have to find the correct tunnel to win
// there are fake tunnels with either nothing ot traps


// to declare a variable
let canvas;
let context;
// to assign value to variable
// let canvas = 9.5;


let fpsInterval = 1000 / 30; // the denominator is frames per second
let now;
let then = Date.now();




let player = {
 x : 0,
 y : 0,
 width : 32,
 height : 32,
 frameX : 0,
 frameY : 0,
 xChange : 0,
 yChange : 0,
 size: 10
}
let plantWflowers = {
 x : 0,
 y : 0,
 width : 64,
 height : 32,
 frameX : 0,
 frameY : 0,
 xChange : 0,
 yChange : 0,
 size: 20
}
let plant = {
 x : 60,
 y : 0,
 width : 32,
 height : 32,
 frameX : 0,
 frameY : 0,
 xChange : 0,
 yChange : 0,
 size: 20
}
let rose = {
 x : 90,
 y : 0,
 width : 32,
 height : 32,
 frameX : 0,
 frameY : 0,
 xChange : 0,
 yChange : 0,
 size: 20
}
let beeUp = {
 x : 0,
 y : 30,
 width : 32,
 height : 32,
 frameX : 0,
 frameY : 0,
 xChange : 0,
 yChange : 0,
 size: 20
}
let beeDown = {
 x : 30,
 y : 30,
 width : 32,
 height : 32,
 frameX : 0,
 frameY : 0,
 xChange : 0,
 yChange : 0,
 size: 20
}
let strawberry = {
 x : 60,
 y : 30,
 width : 32,
 height : 32,
 frameX : 0,
 frameY : 0,
 xChange : 0,
 yChange : 0,
 size: 20
}
let flower = {
 x : 90,
 y : 30,
 width : 32,
 height : 32,
 frameX : 0,
 frameY : 0,
 xChange : 0,
 yChange : 0,
 size: 20
}
// player.frameX = (player.frameX + 1) % 4


let floor;
let playerImage = new Image();
let gardenImages = new Image();
let backgroundImage = new Image();
let tilesPerRow = 4;
let tilesPerCol = 4;
let tileSize = 32;
let num_cols = 40;
let num_rows = 32;


let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;


let background = [
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
]


// this line calls the function, its all about timing, dont want to call the function to early
// runs function only when DOMContentLoaded, essentially when the whole website has been built, happens in ms, prevents premature initialisation
document.addEventListener("DOMContentLoaded", init, false);






// function instead of def then also name, then also names of pieces of data you feed into function, js knows function ended with squiggly brackets not indentation
function init() {
 canvas = document.querySelector("canvas");
 context = canvas.getContext("2d");
 playerImage.src = "uwo.png";


 player.x = canvas.width/2;
 player.y = canvas.height/2;




 window.addEventListener("keydown",activate, false);
 window.addEventListener("keyup", deactivate, false);


 // fixes a delay if something lads slowly
 load_assets([
   {"var": playerImage, "url": "uwo.png"},
   {"var": gardenImages, "url": "garden.png"},
   // {"var": backgroundImage, "url": "tiles.png"}
 ], draw);
}




function draw() {
 window.requestAnimationFrame(draw);
 let now = Date.now();
 let elapsed = now - then;
 if (elapsed <= fpsInterval) {
   return;
 }
 then = now - (elapsed % fpsInterval);


 // steps to take when program gets longer


 // Draw background
 context.clearRect(0,0, canvas.width, canvas.height);
 context.fillStyle = "rgb(105, 206, 105)";
 context.fillRect(0, 0, canvas.width, canvas.height);


//   for (let r= 0; r < 32; r += 1) {
//     for (let c = 0; c < 40; c += 1) {
//       let tile = background[r][c];
//       if (tile >= 0) {
//         let tileRow = Math.floor(tile / tilesPerRow);
//         let tileCol = Math.floor(tile % tilesPerCol);
//         context.drawImage(backgroundImage, tileCol * tileSize, tileRow * tileSize, tileSize, tileSize, c * tileSize, r * tileSize, tileSize, tileSize);
//       }
//     }
//   }


 //Draw player
 // context.drawImage(image, sx,sy,swidth,sheight, dx,dy,dwith,dheight)
 // context.drawImage(playerImage, 0,0,player.width,player.height,player.x,player.y,player.width,player.height)
 context.drawImage(playerImage,
   player.frameX * player.width,
   player.frameY * player.height,
   player.width,
   player.height,
   player.x,
   player.y,
   player.width,
   player.height);


 if (moveLeft) {
   player.xChange -= 8;
   player.frameY = 3
 } if (moveRight)  {
   player.xChange += 8;
   player.frameY = 1
 }
  if (moveDown) {
   player.y += player.size;
 } if (moveRight) {
   player.x += player.size;
 } if (moveUp) {
   player.y -= player.size;
 } if (moveLeft) {
   player.x -= player.size;
 }


 if (moveLeft) {
   player.xChange = player.xChange - 0.5;
   player.frameY = 1;
 }
 if (moveRight) {
   player.xChange = player.xChange + 0.5;
   player.frameY = 2;
 }
 if (moveUp && player.in_air) {
   player.yChange = player.yChange - 20;
   player.in_air = true;
 }


 // going off screen
 //if (player.x + player.width < 0) {
  // player.x = canvas.width;
 //} else if (player.x > player.width < 0) {
 //  player.x = -player.width;
 if (player.x > canvas.width || player.x < 0) {
   player.xChange = player.xChange - 0
 }
 if (player.y > canvas.height || player.y < 0) {
   yChange = -yChange;
 }




 // sx,sy, swidth,sheight = the x and y coords of the upper left hand corner of the part of the image that we are drawing, and the width and height
 // dx and dy of where we want to draw the image on the canvas and its width and height
 // Draw other objects


 // plant
 context.drawImage(gardenImages,
   plantWflowers.frameX * plantWflowers.width,
   plantWflowers.frameY * plantWflowers.height,
   plantWflowers.width,
   plantWflowers.height,
   plantWflowers.x,
   plantWflowers.y,
   plantWflowers.width,
   plantWflowers.height);


 // plant
 context.drawImage(gardenImages,
   ((plant.frameX + 2) * plant.width),
   plant.frameY * plant.height,
   plant.width,
   plant.height,
   plant.x,
   plant.y,
   plant.width,
   plant.height);


 // rose 
 context.drawImage(gardenImages,
   ((rose.frameX + 3) * rose.width),
   rose.frameY * rose.height,
   rose.width,
   rose.height, 
   rose.x,
   rose.y,
   rose.width,
   rose.height);


 // bee up
 context.drawImage(gardenImages,
   beeUp.frameX * beeUp.width,
   ((beeUp.frameY + 1) * beeUp.height),
   beeUp.width,
   beeUp.height, 
   beeUp.x,
   beeUp.y,
   beeUp.width,
   beeUp.height);


 // bee down
 context.drawImage(gardenImages,
   ((beeDown.frameX + 1) * beeDown.width),
   ((beeDown.frameY + 1) * beeDown.height),
   beeDown.width,
   beeDown.height, 
   beeDown.x,
   beeDown.y,
   beeDown.width,
   beeDown.height);


 // strawberry
   context.drawImage(gardenImages,
     ((strawberry.frameX + 2) * strawberry.width),
     ((strawberry.frameY + 1) * strawberry.height),
     strawberry.width,
     strawberry.height, 
     strawberry.x,
     strawberry.y,
     strawberry.width,
     strawberry.height);


 // flower
 context.drawImage(gardenImages,
   ((flower.frameX + 3) * flower.width),
   ((flower.frameY + 1) * flower.height),
   flower.width,
   flower.height, 
   flower.x,
   flower.y,
   flower.width,
   flower.height);
}


function activate(event) {
 let key = event.key
 if (key === "ArrowLeft"){
   moveLeft = true;
 } else if (key === "ArrowUp"){
   moveUp = true;
 }else if (key === "ArrowDown"){
   moveDown = true;
 }else if (key === "ArrowRight"){
   moveRight = true;
 }
}


function deactivate(event) {
 let key = event.key
 if (key === "ArrowLeft"){
   moveLeft = false;
 } else if (key === "ArrowUp"){
   moveUp = false;
 }else if (key === "ArrowDown"){
   moveDown = false;
 }else if (key === "ArrowRight"){
   moveRight = false;
 }
}


function randint(min, max) {
 return Math.round(Math.random() * (max - min)) + min;
}


function load_assets(assets,callback){
 let num_assets = assets.length;
 let loaded = function() {
   console.log("loaded");
   num_assets = num_assets -1;
   if (num_assets === 0){
     callback();
   }
 };
 for (let asset of assets) {
   let element = asset.var;
   if ( element instanceof HTMLImageElement ){
     console.log("img");
     element.addEventListener("load", loaded, false);
   } else if ( element instanceof HTMLAudioElement) {
     console.log("audio");
     element.addEventListener("canplaythrough", loaded, false);
   }
   element.src = asset.url;
 }
}
