var main = (function () {
    function main() {
        this.paddleHeight = 10;
        this.paddleWidth = 75;
    }
    main.prototype.init = function () {
        main.canvas = document.getElementById("gameCanvas");
        main.canvas.width = 480;
        main.canvas.height = 320;
        main.context = main.canvas.getContext("2d");
        new input().init();
        this.ball = new Ball(10);
        this.paddle = new Paddle(0, main.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    };
    main.prototype.update = function () {
        this.ball.update();
        this.paddle.update();
    };
    main.prototype.draw = function () {
        main.context.clearRect(0, 0, main.canvas.width, main.canvas.height);
        this.ball.draw();
        this.paddle.draw();
    };
    return main;
}());
var input = (function () {
    function input() {
    }
    input.prototype.init = function () {
        input.leftKeyIsDown = false;
        input.rightKeyIsDown = false;
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
    };
    input.prototype.keyDownHandler = function (e) {
        if (e.keyCode == 37) {
            input.leftKeyIsDown = true;
        }
        else if (e.keyCode == 39) {
            input.rightKeyIsDown = true;
        }
    };
    input.prototype.keyUpHandler = function (e) {
        if (e.keyCode == 37) {
            input.leftKeyIsDown = false;
        }
        else if (e.keyCode == 39) {
            input.rightKeyIsDown = false;
        }
    };
    return input;
}());
var Ball = (function () {
    function Ball(radius, x, y) {
        this.velocity = {
            x: 2,
            y: -2
        };
        this.x = x || main.canvas.width / 2;
        this.y = y || main.canvas.height - radius - 20;
        this.radius = radius;
    }
    Ball.prototype.update = function () {
        if (this.x - this.radius <= 0 || this.x + this.radius >= main.canvas.width) {
            this.velocity.x *= -1;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= main.canvas.height) {
            this.velocity.y *= -1;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };
    ;
    Ball.prototype.draw = function () {
        main.context.beginPath();
        main.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        main.context.fillStyle = "#0095DD";
        main.context.fill();
        main.context.closePath();
    };
    return Ball;
}());
var Paddle = (function () {
    function Paddle(x, y, width, height) {
        this.velocity = {
            x: 7,
            y: 0
        };
        this.x = main.canvas.width / 2 - width / 2;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Paddle.prototype.update = function () {
        if (input.leftKeyIsDown) {
            this.x -= this.velocity.x;
        }
        else if (input.rightKeyIsDown) {
            this.x += this.velocity.x;
        }
        if (this.x <= 0 && input.leftKeyIsDown) {
            input.leftKeyIsDown = false;
            this.x = 0;
        }
        if (this.x + this.width >= main.canvas.width && input.rightKeyIsDown) {
            input.rightKeyIsDown = false;
            this.x = main.canvas.width - this.width;
        }
    };
    Paddle.prototype.draw = function () {
        main.context.beginPath();
        main.context.fillRect(this.x, this.y, this.width, this.height);
        main.context.fillStyle = "#0095DD";
        main.context.fill();
        main.context.closePath();
    };
    return Paddle;
}());
var gameOver = (function () {
    function gameOver() {
    }
    return gameOver;
}());
window.onload = function () {
    var newGame = new main();
    newGame.init();
    var GameLoop = function () {
        newGame.update();
        newGame.draw();
        requestAnimationFrame(GameLoop);
    };
    requestAnimationFrame(GameLoop);
};
