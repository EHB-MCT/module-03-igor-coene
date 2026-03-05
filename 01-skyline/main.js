let container = document.querySelector("#canvas-container");

let buildings = [];
let numBuildings = 10;
let buildingWidth;
let groundLevel;
let startX;
let animationOffset = 0;

function setup() {
  let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent(container);

  buildingWidth = (width * 0.8) / numBuildings;
  startX = width * 0.1;
  groundLevel = height * 0.8;

  resetData();

  document.getElementById("btn-grow").addEventListener("click", growCity);
  document.getElementById("btn-shrink").addEventListener("click", shrinkCity);
  document.getElementById("btn-reset").addEventListener("click", resetData);
}

function draw() {
  background(255);

  stroke(0);
  line(startX, groundLevel, startX + numBuildings * buildingWidth, groundLevel);
  noStroke();

  animationOffset += 0.05;

  buildings.forEach((h, index) => {
    let x = startX + index * buildingWidth;

    let animatedHeight = h + map(sin(animationOffset + index), -1, 1, -10, 10);
    let y = groundLevel - animatedHeight;

    let brightness = map(animatedHeight, 0, 300, 200, 50);
    fill(brightness);

    rect(x, y, buildingWidth * 0.9, animatedHeight);
  });
}

function resetData() {
  buildings = [];
  for (let i = 0; i < numBuildings; i++) {
    buildings.push(random(100, 300));
  }

  updateDOM();
}

function growCity() {
  buildings = buildings.map((h) => h * 1.1);
  updateDOM();
}

function shrinkCity() {
  buildings = buildings.map((h) => h * 0.9);
  updateDOM();
}

function updateDOM() {
  let output = document.getElementById("data-output");
  output.innerText = buildings.join(", ");
}
