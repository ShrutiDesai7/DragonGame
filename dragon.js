document.onkeydown = function (e) {
  if (e.key === "ArrowUp" || e.keyCode === 38) { // Detect the up arrow key
      let dragon = document.querySelector('.dragon');
      if (!dragon.classList.contains('animatedragon')) { // Prevent jump spamming
          dragon.classList.add('animatedragon');
          setTimeout(() => {
              dragon.classList.remove('animatedragon');
          }, 1000); // Duration in milliseconds matching the CSS animation time
      }
  }
};

let score = 0;
let cross = true;
let gameRunning = true;

function updateScore(score) {
  document.getElementById('score').innerHTML = "Your Score: " + score;
}

// Collision detection and game loop
setInterval(() => {
  if (!gameRunning) return; // Stop checking for collisions if the game is over

  const dragon = document.querySelector('.dragon');
  const gameover = document.querySelector('.gameover');
  const obstacle = document.querySelector('.obstacle');

  const dragonRect = dragon.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  // Check if rectangles overlap
  if (
      dragonRect.left < obstacleRect.right &&
      dragonRect.right > obstacleRect.left &&
      dragonRect.top < obstacleRect.bottom &&
      dragonRect.bottom > obstacleRect.top
  ) {
      gameover.style.visibility = 'visible';
      obstacle.classList.remove('obstacles'); // Stops the obstacle animation
      gameRunning = false; // Stop the game loop
  } else if (cross && obstacleRect.left < dragonRect.right && obstacleRect.left > dragonRect.left) {
      score += 1;
      updateScore(score);
      cross = false;

      setTimeout(() => {
          cross = true;
      }, 1000); // Delay before scoring is allowed again
  }
}, 300);

