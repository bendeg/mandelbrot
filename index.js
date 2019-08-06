//=======================
class Complex {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  nextIteration() {
    //z² = (a + bi)² = (a + bi)(a + bi)
    //= a² + 2abi + (bi)²
    //= a² + 2abi - b²
    //= a² - b² + (2ab)i
    this.a = this.a ** 2 - this.b ** 2;
    this.b = 2 * this.a * this.b;
  }

  length() {
    return Math.sqrt(this.a * this.a + this.b * this.b);
  }
}

var tmpa;
var tmpb;
var ca;
var cb;
var x;
var y;
var zoomx = 1.5;
var zoomy = 1.5;
var dx = 0;
var dy = 0;
var a;
var b;
var iteration;
const maxLength = 2;
const maxIterations = 100;
//const canvas = { width: window.innerWidth, height: window.innerHeight };
const width = window.innerHeight;
const height = window.innerHeight;
var colr, colv, colb;

function setup() {
  createCanvas(width, height);
  pixelDensity(1);
}

function draw() {
  loadPixels();

  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      a = map(x, 0, width, -zoomx + dx, zoomx + dx);
      b = map(y, 0, height, -zoomy + dy, zoomy + dy);
      ca = a;
      cb = b;
      iteration = 0;
      r = 255;
      while (iteration < maxIterations) {
        tmpa = a;
        tmpb = b;
        a = tmpa * tmpa - tmpb * tmpb + ca;
        b = 2 * tmpa * tmpb + cb;
        if (Math.abs(a + b) > 2900) {
          break;
        }
        iteration++;
      }
      colr = map(iteration, 0, maxIterations, 0, 255);
      if (iteration === maxIterations) {
        colr = 0;
      }
      var pix = (x + y * width) * 4;
      pixels[pix + 0] = colr;
      pixels[pix + 1] = Math.abs(a + b) % 255;
      pixels[pix + 2] = Math.sqrt(a * a + b * b) % 255;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}

function mousePressed() {
  let mousexmapped = map(mouseX, 0, width, -zoomx, zoomx);
  let mouseymapped = map(mouseY, 0, height, -zoomy, zoomy);

  dx += mousexmapped;
  dy += mouseymapped;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    zoomx += -zoomx / 10.0;
    zoomy += -zoomy / 10.0;
  } else if (keyCode === DOWN_ARROW) {
    zoomx += zoomx / 10.0;
    zoomy += zoomy / 10.0;
  }
  console.log(zoomx, zoomy);
}
