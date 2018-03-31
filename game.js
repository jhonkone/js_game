var score = 0;
var scoreText = '';
var collisionDetected = false;
var cursors;
var ball;
var ball2;
var defaultVelocity = 3;
var maxVelocity = 1000;
var defaultBounce = (1, 1);
var collisionBounce = (1, 10);
var speed = 10;
var playingTime = 500;
var clock = 0;

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
}


function create ()
{
    this.add.image(400, 300, 'background');

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    //clockText = this.add.text(16, 64, 'Score: 0', { fontSize: '32px', fill: '#000' });

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
    ball2.body.setBounce(defaultBounce);
    ball2.body.setCollideWorldBounds(true);
    ball2.setInteractive();
    
    this.physics.add.collider(ball.body, ball2.body);

    cursors = this.input.keyboard.createCursorKeys();
}


function update()
{
    clock++;
    //clockText.setText("Time left: " + (playingTime - clock));
    
    this.physics.collide(ball, ball2, collisionHandler, null, this);

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
    scoreText.setText("Score " + score);
}