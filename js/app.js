
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
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x *= dt
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
  if (this.y < 60) {
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
  
}

// ----------------- //
// --- Game Play --- //
// ----------------- //

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
