
var BOARD_X = 600;
var BOARD_Y = 600;
var SPAWN_DELAY = 50;
var playerScore = 0;
var highScore = 0;

var game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

CustomText = function (game, x, y, text) {

  Phaser.Text.call(this, game, x, y, text, { font: "65px Arial", fill: "#000", align: "center" });

  this.anchor.set(0.5);

  this.rotateSpeed = 1;

};

CustomText.prototype = Object.create(Phaser.Text.prototype);
CustomText.prototype.constructor = CustomText;

CustomText.prototype.update = function() {

  // this.angle += this.rotateSpeed;
  this.y += 3;
  if (this.y > BOARD_Y) {
    mainState.restartGame();
  }
};


var userText = '';
var userTextDisplay;
var playerScoreDisplay;
var highScoreDisplay;

var enemyTexts = [];
var enemySpawnCounter = SPAWN_DELAY;

var mainState = {

  preload: function () {
    // Change the background color of the game
    game.stage.backgroundColor = '#71c5cf';

    // Load the bird sprite
    // game.load.image('bird', 'assets/bird.png'); 
  },

  create: function (){

    game.input.keyboard.addCallbacks(null, null, this.keyUp);

    userTextDisplay = game.add.text(game.world.centerX, BOARD_Y - 30, '', {
      font: "65px Arial",
      fill: "#fff",
      align: "center"
    });

    userTextDisplay.anchor.setTo(0.5, 0.5);

    playerScoreDisplay = game.add.text(0, 15, '0', {
      font: "65px Arial",
      fill: "#fff",
      align: "center"
    });

    // highScoreDisplay = game.add.text(0, 40, 'High: 0', {
    //   font: "65px Arial",
    //   fill: "#fff",
    //   align: "center"
    // });

    // var keyboard = new Phaser.Keyboard(game);
    // keyboard.addCallbacks(null, null, function (e) {
    //   console.log(e.keyCode)
    // })
    // keyboard.onPressCallback(function (e) {
    //   console.log(e)
    // })
    // game.physics.startSystem(Phaser.Physics.ARCADE);
    // this.bird = this.game.add.sprite(100, 250, 'bird');
    // game.physics.arcade.enable(this.bird);
    // // this.bird.body.gravity.y = 1000;

    // var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // spaceKey.onDown.add(this.jump, this); 
  },

  keyUp: function (e){
    e.preventDefault();
    if (e.keyCode === 13) {
      mainState.checkForMatches(userText);
      userText = ''
      userTextDisplay.setText('');
    } else if (e.keyCode === 8) {
      userText = userText.slice(0,-1);
      userTextDisplay.setText(userText);
    } else {
      userText += String.fromCharCode(e.keyCode);
      userTextDisplay.setText(userText);
    }
  },

  checkForMatches: function (text){

    enemyTexts.forEach(function (enemyText, i) {
      if (text === enemyText.text) {
        enemyText.destroy();
        enemyTexts;
        playerScore++;
        playerScoreDisplay.setText(playerScore);
      }
    });
    // if (text === 'HELLO') {
    //   console.log('match')
    //   enemyTextDisplay.destroy()
    // }
  },

  update: function (){
    enemySpawnCounter++;
    if (enemySpawnCounter > SPAWN_DELAY) {
      enemySpawnCounter = 0;
      var text = words[Math.floor(Math.random() * words.length)].toUpperCase();
      var enemyTextDisplay = new CustomText(game, game.world.centerX, 0,
                                  text);
      var width = enemyTextDisplay.width;
      var x = getRandomInt(Math.floor(width/2), BOARD_X - Math.floor(width/2))
      // var x = Math.floor(Math.random() * (BOARD_X - width));
      enemyTextDisplay.x = x;
      console.log(x);
      game.add.existing(enemyTextDisplay);
      enemyTexts.push(enemyTextDisplay)
    }


  },

  // jump: function() {  
  //   // Add a vertical velocity to the bird
  //   this.bird.body.velocity.y = -350;
  // },

  // Restart the game
  restartGame: function() {  
    // Start the 'main' state, which restarts the game
    game.state.start('main');
  },
}

game.state.add('main', mainState);  
game.state.start('main');  