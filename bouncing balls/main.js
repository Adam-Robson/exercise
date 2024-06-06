// set up canvas
/**
 * Setup Canvas: constants called width and height; set the width and 
 * height of the canvas element equal to the width and height of the viewport.
 */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);


/**
 * @param {number} min 
 * @param {number} max 
 * @returns number
 */

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Random RGB color value.
 * @returns string
 */

function randomRGB() {
  return `rgb(${ random(0, 255) },${ random(0, 255) },${ random(0, 255) })`;
}

/**
 * 
 * x and y coordinates are where the ball will start and can range between 0 
 * (top left hand corner) to the width and height of the browser viewport
 * (bottom right-hand corner).
 * 
 * velX and velY each ball is given a horizontal and vertical velocity;
 * these values are added to the x/y coordinates when we animate the balls, 
 * moving them by so much on each frame.
 * 
 * color: ball color
 * 
 * size: ball size; radius in pixels
 */
class Ball {
  constructor (x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  /**
   * 
   * 
   * 
   * beginPath(): tells browser to draw
   * 
   * fillStyle: defines the color of ball
   * 
   * arc(): trace an arc shape; parameters: coordinates of the arc center,
   * radius of the arc, start & end number of degrees around the circle that 
   * arc is drawn (between 0deg and 2*PI)
   * 
   * fill(): fill in the shape
   */
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  /**
   * First four parts of function check if ball reached edge of canvas
   * 
   * If so, reverse the polarity of the velocity so ball "bounces"
   * 
   * Include ball size in the calculations so edge of the ball will bounce off 
   * the perimeter, & ball won't go halfway off the screen before bounce.
   * 
   * The last two lines are actually moving the ball.
   */
  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  /**
   * 
   * for each ball, check every other ball to know if it has collided with the 
   * current ball. to do this, we start another for...of loop to loop through 
   * all the balls in the balls[] array.
   * 
   * immediately inside the for loop, use an if statement to check whether the 
   * current ball being looped through is the same ball as the one we are 
   * currently checking. this is to check whether a ball has collided with 
   * itself. to do this, we check whether the current ball is the same as the 
   * loop ball. then use ! to negate the check; the code inside the if 
   * statement only runs if they are not the same.
   * 
   * then use a common algorithm to check whether any of the two circle's areas 
   * overlap.
   * 
   * if a collision is detected, the code inside the inner if statement is run.
   * 
   * in this case, set the color property of both the circles to a new random 
   * color. 
   * 
   */
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

const balls = [];

/**
 * create a new ball using the random values, then push it onto balls array,
 * while the number of balls is less than 25. 
 */
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

/**
 * animation loop updates the program and renders the resulting view on 
 * each frame of the animation:
 * 
 * 1. set the canvas fill color to semi-transparent black to allow 
 * the previous few frames to shine through slightly, producing the little 
 * trails behind the balls as they move
 * 
 * 2. draw a rectangle of color across it; fillRect() (this will cover up the 
 * previous frame's drawing before the next one is drawn; otherwise, you'll not 
 * get the right effect 
 * 
 * loop through all the balls in the balls array, and run each ball's draw() 
 * and update() function to draw each one on the screen, then update the
 * position and velocity in time for the next frame.
 * 
 * run function again using `requestAnimationFrame()`; when this 
 * method is repeatedly run and passed the same function name, it runs that 
 * function a set number of times per second to create a smooth animation
 * (recursive).
 * 
 */

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    // call collision detection
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

/**
 * call function
 */
loop();
