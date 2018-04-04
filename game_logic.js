// This file is responsible for all game logic - controlling the balls, 

var score = 0;
var scoreText = '';
var ball;
var ball2;
var defaultBounce = (1, 1);
var cursorSpeed = 10;
var minVelocityX = 300;
var playingTime = 5000;
var pauseButton;
var savedValuesLoaded = false;

// Enable mobile accelerometer
if ( !window.requestAnimationFrame ) {
 
    window.requestAnimationFrame = ( function() {
 
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
 
            window.setTimeout( callback, 16 );
 
        };
 
    } )();
    
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
    //scene : [Welcome ]
};

var game = new Phaser.Game(config);

// Load images
function preload ()
{
    this.load.image('blue_v2', 'assets/blue_v2.png')
    this.load.image('background', 'assets/background_v3.png');
    this.load.image('ball', 'assets/football_small.png');
    this.load.image('ball2', 'assets/football_small.png');
    this.load.image('button', 'assets/button.png');

}

// Create sprites for images, texts and sprites and add them to canvas
function create ()
{
    this.add.image(400, 300, 'background');

    scoreText = this.add.text(16, 15, 'Score: 0', { font: "bold 28px Arial", fill: '#000' });
    
    playingTimeText = this.add.text(16, 64, 'Score: 0', { font: "bold 28px Arial", fill: '#000' });

    submitButton = this.add.sprite(229, 31, 'button');
    submitButton.setInteractive();
    submitButton.on('pointerdown', submitScore);
    submitText = this.add.text(184, 15, 'Submit', { font: "bold 26px Arial", fill: '#eee' });
    
    
    loadButton = this.add.sprite(396, 31, 'button');
    loadButton.setInteractive();
    loadButton.on('pointerdown', loadGame);
    loadText = this.add.text(362, 15, 'Load', { font: "bold 28px Arial", fill: '#eee' });

    saveButton = this.add.sprite(563, 31, 'button');
    saveButton.setInteractive();
    saveButton.on('pointerdown', saveGame);
    saveText = this.add.text(530, 15, 'Save', { font: "bold 28px Arial", fill: '#eee' });

    pauseButton = this.add.sprite(729, 31, 'button');
    pauseButton.setInteractive();
    pauseButton.on('pointerdown', togglePause);
    pauseText = this.add.text(688, 15, 'Pause', { font: "bold 28px Arial", fill: '#eee' });

    var particles = this.add.particles('blue_v2');

    // Lighting effect for ball
    var emitter = particles.createEmitter({
        speed: 10,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    ball = this.physics.add.sprite(400, 100, 'ball');
    ball.body.setVelocity(0, 1);
    ball.body.setBounce(1, 1);
    ball.body.setCollideWorldBounds(true);
    ball.setInteractive();
    emitter.startFollow(ball);

    ball2 = this.physics.add.sprite(config.width, config.height, 'ball2');
    ball2.body.setVelocity(minVelocityX, 1);
    ball2.body.setBounce(1,0.8);
    ball2.body.setCollideWorldBounds(true);
    ball2.setInteractive();
    
    this.physics.add.collider(ball.body, ball2.body);

    // Create variable for keyboard input
    cursors = this.input.keyboard.createCursorKeys();
    // Possible TODO: sounds and a button for enabling/disabling sounds
    //soundToggle = this.add.button(config.width - 150, 15, 'button', this.toggleSound, this);

    //Add deviceOrientation event listener for mobile accelerometer input data
    if (window.DeviceOrientationEvent) {
    
        window.addEventListener("deviceorientation", function(event) 
        {
            ball.body.velocity.y += Math.round(event.beta);
            ball.body.velocity.x += Math.round(event.gamma);
        }
                                )
    }
    else {
        alert("Sorry, your browser doesn't support Device Orientation");
    } ;
}


function update()
{
    // Check if new values have been loaded from service
    // and update Date and time
    if(savedValuesLoaded) {
        scoreText.text = score;
        playingTimeText.text = playingTime;
    }
    
    // First check that there is playingTime left
    if(playingTime > 0) {
        // Decrease playingTime if Pause button not pressed
        if(pauseText.text === "Pause") {
            playingTime--;
            playingTimeText.setText("Time: " + (playingTime));
        }
        
        // Check collisions
        this.physics.collide(ball, ball2, collisionHandler, null, this);


        //Don't let the lower ball stop
        var velX = ball2.body.velocity.x; 
        if(Math.abs(velX) < minVelocityX) {
            // Consider direction
            if(velX < 0) {
                ball2.body.setVelocity(velX - minVelocityX, ball2.body.velocity.y);
            }
            else{
                ball2.body.setVelocity(velX + minVelocityX, ball2.body.velocity.y);
            }
            
        }

        // Keyboard input for moving ball
        if (cursors.left.isDown)
        {
            ball.body.setVelocity(ball.body.velocity.x - cursorSpeed, ball.body.velocity.y);
            
        }
        else if (cursors.right.isDown)
        {
            ball.body.setVelocity(ball.body.velocity.x + cursorSpeed, ball.body.velocity.y);
        }
        else if (cursors.up.isDown)
        {
            ball.body.setVelocity(ball.body.velocity.x, ball.body.velocity.y - cursorSpeed);
        }

        else if (cursors.down.idDown) {
            ball.body.setVelocity(ball.body.velocity.x, ball.body.velocity.y + cursorSpeed);
        }
    }
    // When time is up 
    else {
        // Stop movement
        if(pauseText.text === "Pause") {
            togglePause();
        }
        // Hide Pause (or Cont.) button   
        pauseButton.visible = false;
        pauseText.visible = false;
    }
}

function collisionHandler (ball, ball2) {
    score++;
    scoreText.setText("Score: " + score);
}

// Function for Pause / Continue button
function togglePause() {

    ball.body.enable = ball.body.enable ? false: true;
    ball2.body.enable = ball2.body.enable ? false: true;

    pauseText.text === "Pause" ? pauseText.setText(" Cont.") : pauseText.setText("Pause") ;
}


// Possibly TODO - not working
// // function to scale up the game to full screen
// function goFullScreen(){
//     this.scale.pageAlignHorizontally = true;
//     this.scale.pageAlignVertically = true;
//     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//     this.scale.setScreenSize(true);
// }