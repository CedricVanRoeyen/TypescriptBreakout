class main {
  static canvas: HTMLCanvasElement;
  static context: CanvasRenderingContext2D;

  ball: Ball;

  paddleHeight: number = 10;
  paddleWidth: number = 75;
  paddle: Paddle;

  init(): void {
    main.canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");
    main.canvas.width = 480;
    main.canvas.height = 320;
    main.context = main.canvas.getContext("2d");

    new input().init();

    this.ball = new Ball(10);
    this.paddle = new Paddle(0, main.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
  }

  update(): void {
    this.ball.update();
    this.paddle.update();
  }

  draw(): void {
    main.context.clearRect(0, 0, main.canvas.width, main.canvas.height);
    this.ball.draw();
    this.paddle.draw();
  }
}

class input {
  static leftKeyIsDown:boolean;
  static rightKeyIsDown:boolean;

  init():void {
    input.leftKeyIsDown = false;
    input.rightKeyIsDown = false;

    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);
  }

  keyDownHandler(e):void {
    if (e.keyCode == 37) {
      input.leftKeyIsDown = true;
    }
    else if(e.keyCode == 39) {
      input.rightKeyIsDown = true;
    }
  }

  keyUpHandler(e):void {
    if (e.keyCode == 37) {
      input.leftKeyIsDown = false;
    }
    else if (e.keyCode == 39) {
      input.rightKeyIsDown = false;
    }
  }
}

class Ball {
  x: number;
  y: number;
  radius: number;
  //ball velocity
  velocity = {
    x: 2,
    y: -2
  };

  constructor(radius: number, x?:number, y?:number) {
    this.x = x || main.canvas.width / 2;
    this.y = y || main.canvas.height - radius - 20;
    this.radius = radius;
  }

  //updating the ball
  update(): void{
    //checking for boundrie collisions
    if (this.x - this.radius <= 0 || this.x + this.radius >= main.canvas.width) {
      this.velocity.x *= -1;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= main.canvas.height ) {
      this.velocity.y *= -1;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };
  //drawign the ball
  draw(): void{
    main.context.beginPath();
    main.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    main.context.fillStyle = "#0095DD";
    main.context.fill();
    main.context.closePath();
  }
}

class Paddle {
  x:number;
  y: number;
  width: number;
  height: number;
  velocity = {
    x: 7,
    y: 0
  }

  constructor(x: number, y: number, width: number, height: number) {
    this.x = main.canvas.width / 2 - width/2;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  update():void {
    //checking the input for the movement
    if (input.leftKeyIsDown) {
      this.x -= this.velocity.x;
    }
    else if(input.rightKeyIsDown) {
      this.x += this.velocity.x;
    }

    //collision with bounds
    //left
    if (this.x <= 0 && input.leftKeyIsDown) {
      input.leftKeyIsDown = false;
      this.x = 0;
    }
    //right
    if (this.x + this.width >= main.canvas.width && input.rightKeyIsDown) {
      input.rightKeyIsDown = false;
      this.x = main.canvas.width - this.width;
    }
  }
  draw():void {
    main.context.beginPath();
    main.context.fillRect(this.x, this.y, this.width, this.height);
    main.context.fillStyle = "#0095DD";
    main.context.fill();
    main.context.closePath();
  }
}

class gameOver {

}

window.onload = function() {
    var newGame = new main();
    newGame.init();

    var GameLoop = function() {
      newGame.update();
      newGame.draw();
      requestAnimationFrame(GameLoop);
    }
    requestAnimationFrame(GameLoop);
}
