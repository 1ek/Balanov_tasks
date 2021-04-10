let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let desc = document.getElementById("desc");
let hello_game = document.getElementById("hello-game");
let btn_start = document.getElementById("btn-start");
let player_win = document.getElementById("player-win");
let ai_win = document.getElementById("ai-win");
let btn_restart = document.getElementById("btn-restart");
let canvas_game = document.getElementById("canvas-game");

let ArrowDownPressed = ArrowUpPressed = false;

let interval;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx:0,
  dy:0,
  speed: 3,
  radius: 10,
};

ball.dx = ball.dy = ball.speed

const racket = {
  width: canvas.width * 0.01,
  height: canvas.height * 0.2,
};

const player = {
  x: canvas.width * 0.05,
  y: (canvas.height - racket.height) / 2,
  score: 0,
};

const ai = {
  x: canvas.width * 0.95,
  y: (canvas.height - racket.height) / 2,
  speed:2, 
  difficult: 0.86,
  score: 0,
};

btn_start.addEventListener("click", function () {
  desc.style.display = "none";
  hello_game.style.display = "none";
  canvas_game.style.display = "block";
  interval = setInterval(game, 15);
});

btn_restart.addEventListener("click", function () {
  desc.style.display = "none";
  player_win.style.display = ai_win.style.display = 'none';
  reset();
  canvas_game.style.display = "block";
  interval = setInterval(game, 15);
});

function reset (){
  player.score = ai.score = 0;
  ball.dx = ball.dy = ball.speed = 3;
  ai.speed = 2;
}

function block(x, y, width, height, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.closePath();
}

function create_player() {
  new block(player.x, player.y, racket.width, racket.height, "#FF0000");
}

function create_ai() {
  new block(ai.x, ai.y, racket.width, racket.height, "#000000");
}

function create_ball() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0000FF";
  ctx.fill();
  ctx.closePath();
}

document.addEventListener("keydown", function (keyboard) {
  if (keyboard.code == "ArrowDown") {
    ArrowDownPressed = true;
  } else if (keyboard.code == "ArrowUp") {
    ArrowUpPressed = true;
  }
});

document.addEventListener("keyup", function (keyboard) {
  if (keyboard.code == "ArrowDown") {
    ArrowDownPressed = false;
  } else if (keyboard.code == "ArrowUp") {
    ArrowUpPressed = false;
  }
});

function move_player() {
  if (ArrowDownPressed && player.y < canvas.height - racket.height) {
    player.y += 15;
  } else if (ArrowUpPressed && player.y > 0) {
    player.y -= 15;
  }
}

function move_ball() {
  if (
    ball.x + ball.dx > canvas.width - ball.radius ||
    ball.x + ball.dx < ball.radius
  ) {
    ball.dx = -ball.dx;
  }
  if (
    ball.y + ball.dy > canvas.height - ball.radius ||
    ball.y + ball.dy < ball.radius
  ) {
    ball.dy = -ball.dy;
  }
  if (
    ball.x + ball.radius > ai.x &&
    ball.y > ai.y &&
    ball.y < ai.y + racket.height
  ) {
    ball.dx = -ball.dx;
  }

  if (
    ball.x - ball.radius < player.x + racket.width &&
    ball.y > player.y &&
    ball.y < player.y + racket.height
  ) {
    ball.dx = -ball.dx;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;
}

function move_ai() {
  if (
    ai.y + racket.height / 2 < ball.y &&
    ai.y < canvas.height - racket.height
  ) {
    ai.y += ai.speed;
  } else if (ai.y + racket.height / 2 > ball.y && ai.y > 0) {
    ai.y -= ai.speed;
  }
  if (player.score >= 2){
    ai.speed = ball.speed*ai.difficult;
  }
}

function center_line() {
  for (var i = 0; i < canvas.height; i += 45) {
    ctx.fillStyle = "#808080";
    ctx.fillRect(canvas.width / 2, i, 20, 30);
  }
}

function score() {
  ctx.font = "bold 128px courier";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#808080";
  ctx.fillText(player.score, canvas.width * 0.25, 0);
  ctx.fillText(ai.score, canvas.width * 0.75, 0);

  let random1 = Math.random() < 0.5 ? -1 : 1;
  let random2 = Math.random() < 0.5 ? -1 : 1;

  if (ball.x < player.x) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = random1 * ball.dx;
    ball.dy = random2 * ball.dy;
    ai.score++;
  }
  if (ball.x > ai.x) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed <10 ? ball.speed++ : ball.speed;
    ball.dx = ball.dy = ball.speed;
    ball.dx = random1 * ball.dx;
    ball.dy = random2 * ball.dy;
    player.score++;
  }
}

function finishgame() {
  if (player.score == 10) {
    clearInterval(interval);
    canvas_game.style.display = "none";
    desc.style.display = "flex";
    player_win.style.display = "block";
    btn_restart.style.display = "block";

  } else if (ai.score == 10) {
    clearInterval(interval);
    canvas_game.style.display = "none";
    desc.style.display = "flex";
    ai_win.style.display = "block";
    btn_restart.style.display = "block";
  }
}

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  center_line();
  score();
  create_player();
  create_ai();
  create_ball();
  move_player();
  move_ai();
  move_ball();
  finishgame();
}
