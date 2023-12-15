class Car {
  // The constructor initializes a new Car object with given position and size.
  constructor(x, y, width, height) {
    // Position and size of the car
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // Initialize car's speed, acceleration, maximum speed, friction, and angle
    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;

    // Create a new Controls object for handling user input
    this.controls = new Controls();
  }

  // Method to update car's state on each frame
  update() {
   this.#move();
  }

  #move() {
     // Increase speed if forward control is active
     if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    // Decrease speed if reverse control is active
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    // Limit the car's speed to maxSpeed when moving forward
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    // Limit the car's speed to half of maxSpeed when reversing
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    // Apply friction to slow down the car when moving forward and no key is pressed
    if (this.speed > 0) {
      this.speed -= this.friction;
    }

    // Apply friction to slow down the car when reversing and no key is pressed
    if (this.speed < 0) {
      this.speed += this.friction;
    }

    // If speed is lower than friction, stop the car to prevent endless slowing down
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    // Rotate car to the left if left control is active
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }

      // Rotate car to the right if right control is active
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }


    // Update the car's y-coordinate based on the current speed
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  // Method to draw the car on the canvas
  draw(ctx) {
    // Save current context state
    ctx.save();
    // Move the canvas origin to car's position
    ctx.translate(this.x, this.y);
    // Rotate the canvas to the car's angle
    ctx.rotate(-this.angle);

    // Draw the car as a rectangle
    ctx.beginPath();
    ctx.rect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();

    // Restore the context to its original state
    ctx.restore();
  }
}
