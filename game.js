var score = 0;
var scoreText = '';
var collisionDetected = false;
//var cursors;
var ball;
//var ball2;
var defaultVelocity = 3;
var maxVelocity = 1000;
var defaultBounce = (1, 1);
var collisionBounce = (1, 1);
var speed = 10;
//var playingTime = 500;
//var clock = 0;
//var pauseButton;
//var pause = false;
//var loadButton;

if ( !window.requestAnimationFrame ) {
 
    window.requestAnimationFrame = ( function() {
 
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
 
            window.setTimeout( callback, 1000 / 60 );
 
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


function create ()
{


    this.add.image(400, 300, 'background');

    scoreText = this.add.text(16, 15, 'Score: 0', { font: "bold 30px Arial", fill: '#000' });
    
    //clockText = this.add.text(16, 64, 'Score: 0', { fontSize: '32px', fill: '#000' });

    loadButton = this.add.sprite(329, 31, 'button');
    loadButton.setInteractive();
    loadButton.on('pointerdown', loadGame);
    loadText = this.add.text(294, 15, 'Load', { font: "bold 30px Arial", fill: '#eee' });

    saveButton = this.add.sprite(529, 31, 'button');
    saveButton.setInteractive();
    saveButton.on('pointerdown', saveGame);
    saveText = this.add.text(494, 15, 'Save', { font: "bold 30px Arial", fill: '#eee' });

    pauseButton = this.add.sprite(729, 31, 'button');
    pauseButton.setInteractive();
    pauseButton.on('pointerdown', togglePause);
    pauseText = this.add.text(684, 15, 'Pause', { font: "bold 30px Arial", fill: '#eee' });

    var particles = this.add.particles('blue_v2');

    var emitter = particles.createEmitter({
        speed: 10,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    ball = this.physics.add.sprite(400, 100, 'ball');
    ball.body.setVelocity(defaultVelocity, 1);
    ball.body.setBounce(1, 1);
    ball.body.setCollideWorldBounds(true);
    ball.setInteractive();
    emitter.startFollow(ball);

    ball2 = this.physics.add.sprite(config.width, config.height, 'ball2');
    ball2.body.setVelocity(defaultVelocity*100, 1);
    ball2.body.setBounce(1,0.8);
    ball2.body.setCollideWorldBounds(true);
    ball2.setInteractive();
    
    this.physics.add.collider(ball.body, ball2.body);

    // cursors for keyboard input
    cursors = this.input.keyboard.createCursorKeys();
    //soundToggle = this.add.button(config.width - 150, 15, 'button', this.toggleSound, this);

    // For mobile accelerometer input
    if (window.DeviceOrientationEvent) {
    
        window.addEventListener("deviceorientation", function(event) 
        {
            //ball.body.velocity.y = Math.round(event.beta);
            ball.body.velocity.x = Math.round(event.gamma) * speed;
        }
                                )
    }
    else {
        alert("Sorry, your browser doesn't support Device Orientation");
    } ;
}


function update()
{
    //clock++;
    //clockText.setText("Time left: " + (playingTime - clock));
    
    this.physics.collide(ball, ball2, collisionHandler, null, this);

    //todo: if key f isDown goFullScreen();

    if(collisionDetected) {
        collisionDetected = false;
        ball.setBounce(defaultBounce);
    }
    if (cursors.left.isDown)
    {
        ball.body.setVelocity(ball.body.velocity.x - speed, ball.body.velocity.y);
        
    }
    else if (cursors.right.isDown)
    {
        ball.body.setVelocity(ball.body.velocity.x + speed, ball.body.velocity.y);
    }
    else if (cursors.up.isDown)
    {
        ball.body.setVelocity(ball.body.velocity.x, ball.body.velocity.y - speed);
    }

    else if (cursors.down.idDown) {
        ball.body.setVelocity(ball.body.velocity.x, ball.body.velocity.y + speed);
    }
}

function collisionHandler (ball, ball2) {
    score++;
    collisionDetected = true;
    ball.setBounce(collisionBounce);
    scoreText.setText("Score: " + score);
}


function togglePause() {

    ball.body.enable = ball.body.enable ? false: true;
    ball2.body.enable = ball2.body.enable ? false: true;

}


function loadGame() {
    // First stop movement
    ball.body.enable = false;
    ball2.body.enable = false;

}


function saveGame() {
    // First stop movement
    ball.body.enable = false;
    ball2.body.enable = false;

}

// // function to scale up the game to full screen
// function goFullScreen(){
//     this.scale.pageAlignHorizontally = true;
//     this.scale.pageAlignVertically = true;
//     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//     this.scale.setScreenSize(true);
// }