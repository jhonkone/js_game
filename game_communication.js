// This file is responsible of communication between game and service

/* global $, alert */

$(document).ready( function() {
    "use strict";

    // Request the service to set the resolution of the
    // iframe correspondingly
    var message =  {
        messageType: "SETTING",
        options: {
            "width": 800, //Integer
          "height": 600 //Integer
          }
      };
      window.parent.postMessage(message, "*");
      window.focus();

    // Sends this game's state to the service.
    $("#save").click( function () {
      var msg = {
        "messageType": "SAVE",
        "gameState": {
          "score": score,
          "playingTime": playingTime,
          "ball_location_x": ball.x,
          "ball_location_y": ball.y,
          "ball_velocity_x": ball.body.velocity.x,
          "ball_velocity_y": ball.body.velocity.y,
          "ball2_location_x": ball2.x,
          "ball2_location_y": ball2.y,
          "ball2_velocity_x": ball2.body.velocity.x,
          "ball2_velocity_y": ball2.body.velocity.y,
        }
      };
      window.parent.postMessage(msg, "*");

      // TODO: REMOVE LINES:
      console.log("Submitted msg:" + msg.messageType,
      msg.gameState.score, msg.gameState.playingTime, 
      msg.gameState.ball_location_x, msg.gameState.ball_location_y, msg.gameState.ball_velocity_x, msg.gameState.ball_velocity_y,
      msg.gameState.ball2_location_x, msg.gameState.ball2_location_y, msg.gameState.ball2_velocity_x, msg.gameState.ball2_velocity_y);  
    });

    // Sends a request to the service for a
    // state to be sent, if there is one.
    $("#load").click( function () {
      var msg = {
        "messageType": "LOAD_REQUEST",
      };
      window.parent.postMessage(msg, "*");
      console.log("Submitted msg:" + msg.messageType); // TODO: REMOVE LINE
    });


    // Submits score to service
    // Possible TODO: This could be called once when time is up 
    // and Submit button could be removed
    $("#submit_score").click( function () {
      var msg = {
        "messageType": "SCORE",
        "score": score
      };
      window.parent.postMessage(msg, "*");
      console.log("Submitted msg:" + msg.messageType, msg.score); // TODO: REMOVE LINE
    });

    // Request the service to set the resolution of the
    // iframe correspondingly
    var message =  {
      messageType: "SETTING",
      options: {
      	"width": 800, //Integer
        "height": 600 //Integer
        }
    };
    window.parent.postMessage(message, "*");
    // Set focus for controls
    window.focus();
  });

    // Listen incoming messages, if the messageType
    // is LOAD then the game state will be loaded.
    // NOTE THAT NO CHECKING IS DONE, whether the
    // gameState in the incoming message contains
    // correct information.
    //
    // Also handles any errors that the service
    // wants to send (displays them as an alert).
    window.addEventListener("message", function(evt) {
      if(evt.data.messageType === "LOAD") {
        // Set loaded values and update elements
        // TODO: CHECK VALUES
        score = evt.data.gameState.score;
        scoreText.text.setText(score); 
        playingTime =  evt.data.gameState.playingTime;
        scoreText.text.setText(playingTime); 
        ball.x = evt.data.gameState.ball_location_x;
        ball.y = evt.data.gameState.ball_location_y;
        ball.body.velocity.x = evt.data.gameState.ball_velocity_x; 
        ball.body.velocity.y = evt.data.gameState.ball_velocity_y;
        ball2.x = evt.data.gameState.ball2_location_x;
        ball2.y = evt.data.gameState.ball2_location_y;
        ball2.body.velocity.x = evt.data.gameState.ball2_velocity_x; 
        ball2.body.velocity.y = evt.data.gameState.ball2_velocity_y;
        
        // Set flag to inform UI's update loop to udpate time and score 
        // text elements (special case when Pause button is on)
        savedValuesLoaded = true;

        // Enable Pause (Cont.) button that might be disabled 
        pauseButton.visible = true;
        pauseText.visible = true;

        // TODO: REMOVE LOGGING LINES:
        console.log("Received msg:" + evt.data.messageType,
        evt.data.gameState.score, evt.data.gameState.playingTime, 
        evt.data.gameState.ball_location_x, evt.data.gameState.ball_location_y, evt.data.gameState.ball_velocity_x, evt.data.gameState.ball_velocity_y,
        evt.data.gameState.ball2_location_x, evt.data.gameState.ball2_location_y, evt.data.gameState.ball2_velocity_x, evt.data.gameState.ball2_velocity_y);       
    } 
      else if (evt.data.messageType === "ERROR") {
        alert(evt.data.info);
      }
    });


// Functions which triggers hidden html button elements for service communication

function submitScore() {
    // First stop movement
    if(pauseText.text === "Pause") {
        togglePause() ;
    }
    document.getElementById("submit_score").click(); // Click the hidden submit_score button
}


function loadGame() {
    // First stop movement
    if(pauseText.text === "Pause") {
        togglePause() ;
    }
    document.getElementById("load").click(); // Click the hidden button
}


function saveGame() {
    // First stop movement
    if(pauseText.text === "Pause") {
        togglePause() ;
    }  
    document.getElementById("save").click(); // Click the hidden button
}