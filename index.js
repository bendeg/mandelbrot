//=======================
class Complex {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  add(complex) {
    this.a += complex.a;
    this.b += complex.b;
    return this;
  }

  square() {
    //z² = (a + bi)² = (a + bi)(a + bi)
    //= a² + 2abi + (bi)²
    //= a² + 2abi - b²
    //= a² - b² + (2ab)i
    let a = this.a;
    let b = this.b;
    this.a = a ** 2 - b ** 2;
    this.b = 2 * a * b;
    return this;
  }

  length() {
    return Math.sqrt(this.a * this.a + this.b * this.b);
  }
}

var c = new Complex();
var z = new Complex();
var x;
var y;
var zoomx = 1.5;
var zoomy = 1.5;
var dx = -0.7402597402597404;
var dy = 0;
var iteration;
var maxIterations = 50;
var ratioChange = 0.1;
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
      c.a = map(x, 0, width, -zoomx + dx, zoomx + dx);
      c.b = map(y, 0, height, -zoomy + dy, zoomy + dy);
      z.a = 0;
      z.b = 0;
      iteration = 0;
      r = 255;
      while (iteration < maxIterations) {
        z.square().add(c);
        if (Math.abs(z.a + z.b) > 2900) {
          break;
        }
        iteration++;
      }

      if (iteration >= maxIterations) {
        colr = 0;
        colv = 0;
        colb = 0;
      } else {
        if (iteration >= (2 * maxIterations) / 3) {
          colr = map(iteration, 0, maxIterations, 200, 255);
          colv = map(iteration, 0, maxIterations, 100, 150);
          colb = map(iteration, 0, maxIterations, 0, 50);
        }
        if (
          iteration < (2 * maxIterations) / 3 &&
          iteration >= maxIterations / 3
        ) {
          colr = map(iteration, 0, maxIterations, 100, 150);
          colv = map(iteration, 0, maxIterations, 0, 255);
          colb = map(iteration, 0, maxIterations, 100, 150);
        }
        if (iteration < maxIterations / 3) {
          colr = map(iteration, 0, maxIterations, 0, 50);
          colv = map(iteration, 0, maxIterations, 100, 150);
          colb = map(iteration, 0, maxIterations, 200, 255);
        }
      }
      var pix = (x + y * width) * 4;
      pixels[pix + 0] = colr;
      pixels[pix + 1] = colv; //Math.abs(z.a + z.b) % 255;
      pixels[pix + 2] = colb; //Math.sqrt(z.a * z.a + z.b * z.b) % 255;
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
  } else if (keyCode === LEFT_ARROW) {
    if (maxIterations > 10) {
      maxIterations -= Math.floor(maxIterations * ratioChange);
    }
  } else if (keyCode === RIGHT_ARROW) {
    maxIterations += Math.floor(maxIterations * ratioChange);
  }
  console.log(zoomx + dx, zoomy + dy, maxIterations);
}
