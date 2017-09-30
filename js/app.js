// ------------ //
// --- Game --- //
// ------------ //
var score = 0;
var newEnemy;

// Shuffles between choices based on score
function shuffle(a, b, c, d, e) {
  if (score % 2 == 0) {
    return a;
  } else if (score % 3 == 0) {
    return b;
  } else if (score % 4 == 0) {
    return c;
  } else if (score % 5 == 0) {
    return d;
  } else {
    return e;
  }
}

// ------------- //
// --- Enemy --- //
// ------------- //

// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x; // horizontal movement
  this.y = y; // vertical movement

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = shuffle(
    'images/enemy-bug.png',
    'images/enemy-bug-1.png',
    'images/enemy-bug-2.png',
    'images/enemy-bug-3.png',
    'images/enemy-bug-2.png'
  );
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  // Add and Replace Enemies
  if (allEnemies[allEnemies.length - 1].x > 550) {

    allEnemies.pop()
    newEnemy = shuffle(
      new Enemy (-150, 50),
      new Enemy (-200, 225),
      new Enemy (-100, 50),
      new Enemy (-100, 225),
      new Enemy (-150, 50)
   );
   console.log(newEnemy.x + ", " + newEnemy.y + " - " + newEnemy.sprite)
    allEnemies.push(newEnemy);
  }

  // Reposition enemy if it moves outside the screen
  if (this.x > 550) {

    // Start again
    this.x = -30;
  }
  this.x += 120 * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(
    Resources.get(this.sprite), this.x, this.y
  );
};

// -------------- //
// --- Player --- //
// -------------- //

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x; // horizontal movement
  this.y = y; // vertical movement

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';
};

// Player Updates
Player.prototype.update = function() {
  // If player moves in water, player wins: restart game
  if (this.y <= 0) {
    // Increment Score Count
    score += 1;
    // Display score
    $("h1").replaceWith("<h1>" + "Score: " + score + "</h1>");
    // Set Player Image - rotate
    if (score % 2 == 0) {
      this.sprite = 'images/char-boy.png';
    } else if (score % 3 == 0) {
      this.sprite = 'images/char-cat-girl.png';
    } else if (score % 4 == 0) {
      this.sprite = 'images/char-horn-girl.png';
    } else if (score % 5 == 0) {
      this.sprite = 'images/char-girl.png';
    } else {
      this.sprite = 'images/char-princess-girl.png';
    }
    // Reset player position
    this.y = 400;
	}
}

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(
    Resources.get(this.sprite), this.x, this.y
  );
};

// -- Player Mechanics -- //

// Validate input to ensure board constraints using directions
Player.prototype.handleInput = function(dir) {
  // Up + Lower Bound
  if (dir == "up" && this.y > 50) {
    // Move down
    this.y -= 100;
  }
  // Down + Upper Bound
  else if (dir == "down" && this.y < 400) {
    // Move up
    this.y += 100;
  }
  // Left + Right Vertical Bound
  else if (dir == "left" && this.x > 0) {
    // Move Left
    this.x -= 100;
  }
  // Right + Left Vertical Bound
  else if (dir == "right" && this.x < 350) {
    // Move Right
    this.x += 100;
  }
}

// ----------------- //
// --- Game Play --- //
// ----------------- //

// Check Collision
function checkCollisions() {

  // Iterate through each enemy
  allEnemies.forEach(function(enemy) {

    // Check Collision
    if ((enemy.x < player.x + 30) && (enemy.x + 60 > player.x) && (enemy.y < player.y + 60) && (enemy.y + 40 > player.y)) {

      // Reset Player
      player.y = 400;
    }

  });
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy (-300, 60);
var enemy2 = new Enemy (-200, 225);
var enemy3 = new Enemy (-400, 60);
var enemy4 = new Enemy (-100, 225);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player = new Player (200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
