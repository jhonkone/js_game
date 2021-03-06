***BOUNCING BALL GAME***

A JavaScript game for the WSD course.

Published here:

https://jhonkone.github.io/js_game/



**Playing Instructions**

In this extremely addictive bouncing ball game you control a flying soccer ball and try to collide it with another soccer ball. The more collisions the more points. Collisions from upwards are usually more challenging and thus give you two points (causing double collision) and side collisions are only worth of one point.

Time is limited and clock is running all the time unless you press Pause / Continue button.

*Keyboard controls*

- Left Arrow
- Right Arrow
- Up Arrow
- Down Arrow

*NOTE* about controls - It is not recommended to open browser's developer tools when playing - this might cause lose of controls, even occasionally after closing the tools and reloading the page."

*Mobile device controls*

This game is playable with mobile devices (phones, tablets etc) which have an accelometer an HTML5 browser! The device has to be held in _upright position and Auto Rotate disabled_.

- Turn your device HORIZONTALLY
- Turn your device VERTICALLY

*Submit, Save and Load Buttons*

In addition to Pause button there are buttons for _Submit, Load and Save._ Pressing any of the buttons will pause the game.
- Submit button - Submits your present score to service
    - The final score is automatically submitted to service, but this button can
    be used if you want to get your intermediate result visible to highscores.
- Save button - Submits the state of the game to the service
    - Including present score, playing time and position & velocity of both of the balls
- Load button - Loads the saved game state
    - Including saved score, playing time and position & velocity of both of the balls


**Technical Implementation Details**

*Structure and Architecture*

The game consist of three static files, one simple HTML file and two JavaScript files as follows:
- index.html
    - imports jQuery and Phaser
    - imports JavaScript files of the game
    - hidden buttons for server communication
- game_logic.js 
    - responsible for all the logic needed when playing
        - enabling keyboard and mobile accelometer inputs
        - controlling location and velocity of the balls
        - handling collisions
        - counting scores and playing time
- game_communication.js
    - responsible for communication between game and service
        - functions for Submit, Save and Load buttons which utilizes window.postMessage with given protocol. ( The protocol with its JSON messages is defined in the following instructions document: https://docs.google.com/document/d/1PwzQ-Ra7J5EszIgINbb4Two5jMNm0aLtWAJs55Zfjek )
        
    
*Game Framework*

The game uses Phaser3 Desktop and Mobile HTML5 game framework. It made easy to implement physics, lightning effects and collision detection.

https://phaser.io/
https://github.com/photonstorm/phaser/tree/v3.3.0

The challenge with newly released phaser3 is that it is has not yet documentation.  At the moment (2018-04-03) documentation of Phaser3 is "coming soon!".  Phaser3 API is not fully backward compatible with Phaser2 which gives challenges with documentation and examples that are mainly for Phaser2.

*Moblie Accelerometer Input details*

Mobile Accelerometer input is captured with JavaScript and HTML5 - it is simple to read this motion data without any library using JavaScript's deviceOrientation event. See more:
http://w3c.github.io/deviceorientation/spec-source-orientation.html