class Game{
  constructor(){
    this.fill();
    this.platform = new Platform;
    this.platform.draw();
    this.bricks = new Bricks;
    this.ball = new Ball;
    this.ball.draw();
    this.platform.move();
    this.drawBricks();
    this.ball.update();
    this.collistion()
    this.score = 0;
    this.image = image;
    // this.image = ;
    // setInterval(() => {
      // this.fill();
      // this.platform.move();
      // this.platform.draw();
      // this.drawBricks();
      // this.ball.update();
      // this.ball.draw();
    // }, 1000)
  }
  fill(){
    Game.ctx.fillStyle = "#000";
    Game.ctx.fillRect(0,0,canvas.width,canvas.height);
    // let image = document.querySelector("img")
    // Game.ctx.beginPath();
    // Game.ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(() => this.fill())
  }
  drawBricks(){
    Game.ctx.strokeStyle = '#fff';
    for (let i = 0; i < this.bricks.arr.length; i++){
      Game.ctx.fillStyle = this.bricks.arr[i].color;
      // Game.ctx.shadowColor = this.bricks.arr[i].color;
      // Game.ctx.shadowBlur = 5;
      Game.ctx.fillRect(this.bricks.arr[i].x, this.bricks.arr[i].y, 40, 20);
      Game.ctx.strokeRect(this.bricks.arr[i].x, this.bricks.arr[i].y, 40, 20);
    }
    requestAnimationFrame(() => this.drawBricks())
  }
  collistion(){
    this.bricks.finish();
    for (let i = 0; i < this.bricks.arr.length; i++){
      if (this.ball.x >= this.bricks.arr[i].x - 20 && this.ball.x <= this.bricks.arr[i].x + 20 + 40 && this.ball.y >= this.bricks.arr[i].y && this.ball.y <= this.bricks.arr[i].y + 20){
        this.bricks.arr.splice(i, 1);
        this.score++;
        score.innerHTML = this.score;
        this.ball.collision();
      }
    }
    requestAnimationFrame(() => this.collistion())
  }
}

Game.ctx = canvas.getContext('2d');


class Platform{
  constructor(){
    this.x = (canvas.width / 2) - 75;
    this.y = canvas.height - 10;
  }
  draw(){
    Game.ctx.beginPath();
    Game.ctx.fillStyle = '#fff';
    Game.ctx.fillRect(this.x, this.y, 150, 5);
    requestAnimationFrame(() => this.draw());
  }
  move(){
    canvas.addEventListener('mousemove', e => {
      this.x = e.clientX - 75;
    })
    // requestAnimationFrame(() => this.move());
  }
}

class Bricks{
  constructor(){
    this.arr = [];
    this.x = 0;
    this.y = 0;
    this.count = 100;
    this.color = ['#2ecc71', '#e74c3c', '#9b59b6','#e67e22', '#f1c40f', '#22A7F0', '#1F3A93', '#D91E18', '#96281B', '#8c7ae6', '#eb2f06'];
    this.create();
    
  }

  create(){
    let index = Math.round(Math.random()*(this.color.length-1))
    let color = this.color[index];
    this.color.splice(index, 1);
    for (let i = 0; i < this.count; i++){
      if (this.x + 40 > canvas.width){
        this.x = 0;
        this.y += 20;
        index = Math.round(Math.random()*(this.color.length-1))
        color = this.color[index];
        this.color.splice(index, 1);
      }
      this.arr.push({x: this.x,  y: this.y, color});
      this.x += 40;
    }
    // requestAnimationFrame(() => this.create())
  }
  finish(){
    if (this.arr.length == 0){
      // let audio = new Audio("sounds/win.wav");
      // audio.play();
      Game.ctx.fillStyle = "red";
      Game.ctx.font = "60px IMPACT";
      Game.ctx.textAlign = "center";
      Game.ctx.fillText("You Win! Reloading.", canvas.width/2, canvas.height/2);
      setTimeout(() => {
        location.reload();
      }, 800)
    }
  }
}


class Ball{
  constructor(){
    this.x = canvas.width / 2;
    this.y = canvas.height - 30;
    this.vx = 10
    this.vy = -Math.round(Math.random()*10+5);
    this.platform = new Platform;
    this.platform.move();
    
  }
  draw(){
    Game.ctx.beginPath();
    Game.ctx.fillStyle = "#fff";
    Game.ctx.arc(this.x, this.y, 10, 0, 2*Math.PI);
    Game.ctx.fill();
    // requestAnimationFrame(() => this.draw())
  }
  update(){
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + 10 > canvas.width){
      this.vx = -Math.round(Math.random()*10+5);
      this.hit();
    }
    if (this.y <= 0){
      this.vy = Math.round(Math.random()*10+5)
      this.hit();
    }
    if (this.x + 10 <= 0){
      this.vx = Math.round(Math.random()*10+5);
      this.hit();
    }
    if (this.x >= this.platform.x && this.x <= this.platform.x + 150 && this.y + 10 >= this.platform.y && this.y <= canvas.height){
      this.vy = -Math.round(Math.random()*10+5);
      this.hit();
    }
    if (this.y >= canvas.height){
      this.y = canvas.height + 100;
      this.x = canvas.width / 2;
      this.vx = 0;
      this.vy = 0;
      Game.ctx.fillStyle = "red";
      Game.ctx.font = "60px IMPACT";
      Game.ctx.textAlign = "center";
      Game.ctx.fillText("You Lose! Reloading.", canvas.width/2, canvas.height/2);
      setTimeout(() => {
        location.reload();
      }, 800)
    }
    this.draw();
    requestAnimationFrame(() => this.update())
  }
  hit(){
    let audio = new Audio("sounds/hit.wav");
    audio.play();
  }
  collision(){
    let audio = new Audio("sounds/brake.wav");
    audio.play();
  }
}



let x = new Game;