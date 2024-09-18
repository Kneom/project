import { Entity } from "./entities.js";
import { Enemy } from "./entities.js";
// to declare a variable
let canvas;
let context;
let backgroundMusic;
// background music https://opengameart.org/content/pleasant-creek
// shear music https://stan.store/SoundCentral
// to assign value to variable
// let canvas = 9.5;
let fpsInterval = 1000 / 30; // the denominator is frames per second
let now;
let sound;
let then = Date.now();
let lastDirectionChange = Date.now();
let mouseLeftPressed = false;

let player = new Entity("Player");

let playerImage = new Image();
let enemyImage = new Image();
let backgroundImage1 = new Image();
let tilesPerRow = 15;
let tilesPerCol = 15;
let tileSize = 32;

let num_cols = 40;

let num_rows = 32;

let enemies = [];
let enemy;
let enemyRunAwaySpeed = 0.6;

let run_away_radius = 100; // set the radius here

let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;

document.addEventListener("DOMContentLoaded", init, false);

let layer1 = [
  [
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
    16, 17,
  ],
  [
    30, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
    31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
    31, 32,
  ],
];
let layer2 = [
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 152, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 152, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 152, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,
  ],
];

function init() {

  canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  window.addEventListener("keydown", activate, false);
  window.addEventListener("keyup", deactivate, false);
  generateEnemies();
  console.log(enemies)
  
  loadSound("/static/shear.mp3");
  // loadBackgroundMusic("/static/background.mp3");
  // fixes a delay if something laads slowly
  load_assets(
    [
      { var: playerImage, url: "/static/unsheered.png" },
      { var: backgroundImage1, url: "/static/farm.png" },
      { var: enemyImage, url: "/static/unsheered.png" },
      
    ],
    draw
  );

  // tile set taken from https://hcg-digital-arts.itch.io/farmgarden-tileset
  // sheep sprites taken and edited by me from https://www.spriters-resource.com/pc_computer/stardewvalley/sheet/112098/
}


function draw() {
  window.requestAnimationFrame(draw);

  let now = Date.now();
  let elapsed = now - then;
  if (elapsed <= fpsInterval) {
    return;
  }
  then = now - (elapsed % fpsInterval);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "grey";
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawBackground();
  drawPlayer();
  drawEnemies();

  handlePlayerMovement();
  updatePlayerPosition();
  updateEnemyPosition();
  handleEnemyMovement();
  performPhysics();
}

function drawBackground() {
  for (let r = 0; r < 32; r += 1) {
    for (let c = 0; c < 40; c += 1) {
      let tile = layer1[r][c];
      if (tile >= 0) {
        let tileRow = Math.floor(tile / tilesPerRow);
        let tileCol = Math.floor(tile % tilesPerCol);
        context.drawImage(
          backgroundImage1,
          tileCol * tileSize,
          tileRow * tileSize,
          tileSize,
          tileSize,
          c * tileSize,
          r * tileSize,
          tileSize,
          tileSize
        );
      }
    }
  }

  for (let r = 0; r < 32; r += 1) {
    for (let c = 0; c < 40; c += 1) {
      let tile = layer2[r][c];
      if (tile >= 0) {
        let tileRow = Math.floor(tile / tilesPerRow);
        let tileCol = Math.floor(tile % tilesPerCol);
        context.drawImage(
          backgroundImage1,
          tileCol * tileSize,
          tileRow * tileSize,
          tileSize,
          tileSize,
          c * tileSize,
          r * tileSize,
          tileSize,
          tileSize
        );
      }
    }
  }
}

function drawPlayer() {
  context.drawImage(
    playerImage,
    player.frameX * player.width,

    player.frameY * player.height,

    player.width,
    player.height,

    player.x,
    player.y,

    player.width * 2,
    player.height * 2
  );


}

function generateEnemies() {
  for (let i = 0; i < 50; i += 1) {
    let enemy = new Enemy("Enemy" + i);
    do {
      enemy.x = randint(0, canvas.width - enemy.width);

      enemy.y = randint(0, canvas.height - enemy.height);
    } while (entityCollidesOnSpawn(enemy)); // Ensure enemies don't spawn on other entities

    enemies.push(enemy);
  }
}

function drawEnemies() {
  for (let enemy of enemies) {
    let dx = player.x - enemy.x;
    let dy = player.y - enemy.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100 && mouseLeftPressed) {
      enemy.image = new Image();
      enemy.image.src = "/static/sheered.png";
    }

    context.drawImage(
      enemy.image,
      enemy.frameX * enemy.width,
      enemy.frameY * enemy.height,
      enemy.width,
      enemy.height,
      enemy.x,
      enemy.y,
      enemy.width * 2,
      enemy.height * 2
    );
  }
}



document.addEventListener("mousedown", function(event) {
  if (event.button === 0) {
    mouseLeftPressed = true;
  }
});

document.addEventListener("mouseup", function(event) {
  if (event.button === 0) {
    mouseLeftPressed = false;
  }
});

function handlePlayerMovement() {
  if (moveLeft) {
    player.xChange -= 2;
    player.frameY = 3;
  }
  if (moveRight) {
    player.xChange += 2;
    player.frameY = 1;
  }
  if (moveUp) {
    player.yChange -= 2;
    player.frameY = 2;
  }
  if (moveDown) {
    player.yChange += 2;
    player.frameY = 0;
  }
  if (
    moveLeft ||
    moveRight ||
    ((moveUp || moveDown) && !(moveLeft && moveRight) && !(moveUp && moveDown))
  ) {
    player.frameX = (player.frameX + 1) % 4;
  }
}

function handleEnemyMovement() {
  for (let enemy of enemies) {
    let now = Date.now();

    if (now - enemy.lastDirectionChange > 5000) {
      // It's been more than 5 seconds since the last direction change for this enemy, so change direction

      enemy.lastDirectionChange = now;

      let wanderAngle = Math.random() * 2 * Math.PI;

      enemy.xChange = Math.cos(wanderAngle) * 1;

      enemy.yChange = Math.sin(wanderAngle) * 1;

      enemy.angle = (wanderAngle * 180) / Math.PI;
    }

    if (enemy.xChange > 0.5) {
      enemy.frameY = 1;
    } else if (enemy.xChange < -0.5) {
      enemy.frameY = 3;
    } else if (enemy.yChange > 0.5) {
      enemy.frameY = 0;
    } else if (enemy.yChange < -0.5) {
      enemy.frameY = 2;
    }

    enemy.frameX = (enemy.frameX + 1) % 4;

    enemy.x += enemy.xChange;

    enemy.y += enemy.yChange;
  }
}


function activate(event) {
  let key = event.key;
  if (key === "ArrowLeft") {
    moveLeft = true;
  } else if (key === "ArrowUp") {
    moveUp = true;
  } else if (key === "ArrowDown") {
    moveDown = true;
  } else if (key === "ArrowRight") {
    moveRight = true;
  }
}

function deactivate(event) {
  let key = event.key;
  if (key === "ArrowLeft") {
    moveLeft = false;
  } else if (key === "ArrowUp") {
    moveUp = false;
  } else if (key === "ArrowDown") {
    moveDown = false;
  } else if (key === "ArrowRight") {
    moveRight = false;
  }
}

function updatePlayerPosition() {
  player.x += player.xChange;
  player.y += player.yChange;
}
function performPhysics() {
  for (let enemy of enemies){
    let enemyMagnitude = Math.max(Math.abs(enemy.xChange), Math.abs(enemy.yChange));
    if (enemyMagnitude > 0) {
      enemy.xChange /= enemyMagnitude;
      enemy.yChange /= enemyMagnitude;
    }
    if (enemy.x + enemy.width < 0) {
      enemy.x = canvas.width;
    } else if (enemy.x > canvas.width) {
      enemy.x = 0;
    }
    if (enemy.y + enemy.height < 0) {
      enemy.y = canvas.height;
    } else if (enemy.y > canvas.height) {
      enemy.y = 0;
    }
  }
  // Normalize player's xChange and yChange
  let magnitude = Math.max(Math.abs(player.xChange), Math.abs(player.yChange));
  if (magnitude > 0) {
    player.xChange /= magnitude;
    player.yChange /= magnitude;
  
  }

  // Apply friction
  player.xChange *= 0.1;
  player.yChange *= 0.1;

  if (player.x + player.width < 0) {
    player.x = canvas.width;
  } else if (player.x > canvas.width) {
    player.x = 0;
  }
  if (player.y + player.height < 0) {
    player.y = canvas.height;
  } else if (player.y > canvas.height) {
    player.y = 0;
  }

}

function entityCollidesOnSpawn(entity) {
  // Check collision with player
  if (entitiesCollide(player, entity)) {
    return true;
  }

  // Check collision with other enemies
  for (let otherEnemy of enemies) {
    if (entity !== otherEnemy && entitiesCollide(entity, otherEnemy)) {
      return true;
    }
  }

  // Add additional checks for other entities if needed

  return false;
}

function entitiesCollide(a, b) {
  return (
    a.x + a.width > b.x &&
    a.x < b.x + b.width &&
    a.y + a.height > b.y &&
    a.y < b.y + b.height
  );
}

function updateEnemyPosition() {
  for (let enemy of enemies) {
    // calculate the distance between the player and the enemy

    let dx = player.x - enemy.x;

    let dy = player.y - enemy.y;

    let distance = Math.sqrt(dx * dx + dy * dy);

    dx /= 1;

    dy /= 1;

    // check if the player is within the run-toward radius

    if (distance < run_away_radius) {
      enemy.angle = Math.atan2(dy, dx);

      // make the enemy run away from the player

      enemy.xChange = -Math.cos(enemy.angle) * enemyRunAwaySpeed;

      enemy.yChange = -Math.sin(enemy.angle) * enemyRunAwaySpeed;

      if (enemy.xChange > 0.5) {
        enemy.frameY = 1;
      } else if (enemy.xChange < -0.5) {
        enemy.frameY = 3;
      } else if (enemy.yChange > 0.5) {
        enemy.frameY = 0;
      } else if (enemy.yChange < -0.5) {
        enemy.frameY = 2;
      }
      enemy.frameX = (enemy.frameX + 1) % 4;
    }

    enemy.x += enemy.xChange;

    enemy.y += enemy.yChange;

    enemy.angle =(Math.atan2(player.y - enemy.y, player.x - enemy.x) * 180) / Math.PI;
  }
}

function randint(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function load_assets(assets, callback) {
  let num_assets = assets.length;
  let loaded = function () {
    console.log("loaded");
    num_assets = num_assets - 1;
    if (num_assets === 0) {
      callback();
    }
  };
  for (let asset of assets) {
    let element = asset.var;
    if (element instanceof HTMLImageElement) {
      console.log("img");
      element.addEventListener("load", loaded, false);
    } else if (element instanceof HTMLAudioElement) {
      console.log("audio");
      element.addEventListener("canplaythrough", loaded, false);
    }
    element.src = asset.url;
  }
}

function loadSound(url) {
  sound = new Audio(url);
  sound.addEventListener("canplaythrough", function() {
    sound.play();
  }, {once: true});
}

function playSoundOnClick() {
  sound.play();
}
document.addEventListener("mousedown", function(event) {
  if (event.button === 0) {
    playSoundOnClick();
  }
});
function loadBackgroundMusic(url) {
  backgroundMusic = new Audio(url);
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.1;
  backgroundMusic.play();
}

let volumeSlider = document.getElementById("volumeSlider");

volumeSlider.addEventListener("input", function() {
  backgroundMusic.volume = volumeSlider.value;
});


// let timer;
// let timerText;
// let timerInterval;

// function startTimer() {
//   timer = 5;
//   timerText = createText("Timer: " + timer, canvas.width / 2, canvas.height / 2, "white");
//   timerInterval = setInterval(updateTimer, 1000);
// }

// function updateTimer() {
//   timer--;
//   if (timer < 0) {
//     clearInterval(timerInterval);
//     timerText = null;
//   } else {
//     timerText.text = "Timer: " + timer;
//   }
// }

// function createText(text, x, y, color) {
//   let textSize = 20;
//   let textWidth = context.measureText(text, textSize, textSize).width;
//   context.fillStyle = color;
//   context.font = textSize + "px Arial";
//   context.fillText(text, x - textWidth / 2, y + textSize / 2);
//   return { text: text, x: x, y: y };
// }

// // Start the timer
