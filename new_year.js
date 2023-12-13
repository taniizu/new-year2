let emitters = [];
let backgroundImage;
let syouhinImage;
let message = 'あけましておめでとうございます';

function preload() {
  backgroundImage = loadImage('red.jpeg');
  syouhinImage = loadImage('tatu.png');
}

function mousePressed() {
  emitters.push(new Emitter(mouseX, mouseY));
}

function setup() {
  displayDensity(1);
  createCanvas(windowWidth, windowHeight);
  textFont('むつきかな', 100); // フォントをArialに変更し、サイズを36に設定
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  image(backgroundImage, 0, 0, width, height);

  for (let emitter of emitters) {
    emitter.emit(1);
    emitter.show();
    emitter.update();
  }

  const syouhinWidth = 327;
  const syouhinHeight = 763;
  const syouhinX = (width - syouhinWidth) / 2;
  const syouhinY = (height - syouhinHeight) / 2;
  image(syouhinImage, syouhinX, syouhinY, syouhinWidth, syouhinHeight);
  
  let goldenColor = color(255, 215, 0);
  //fill(goldenColor);
  fill(255);
  //textSize(100);
  textAlign(CENTER, CENTER);

 // メッセージを1文字ずつ上下に動かすアニメーション
  for (let i = 0; i < message.length; i++) {
    textAlign(LEFT, CENTER); // テキストの左揃え、垂直方向は中央揃えに設定
    let xPosition = i * 120; // 文字ごとに横方向に配置  
    let yPosition = height / 3 + sin(frameCount * 0.05) * 20; // 上下に揺れる幅を20に変更
    text(message.charAt(i), xPosition, yPosition);
  }
}

class Emitter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
  }

  emit(numParticles) {
    for (let i = 0; i < numParticles; i++) {
      const particleColor = color(random(200, 255), random(150, 200), random(0, 50), random(150, 200));
      const particleSize = random(5, 15);
      let x = random(-0.6, 0.6);
      let y = random(-0.6, 0.6);
      const xSpeed = (x, x);
      const ySpeed = (y, y);
      this.particles.push(new Particle(this.x, this.y, particleColor, particleSize, xSpeed, ySpeed));
    }
  }

  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }

  update() {
    for (let particle of this.particles) {
      particle.update();
    }
  }
}

class Particle {
  constructor(x, y, color, size, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = size;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
}
