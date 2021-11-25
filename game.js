var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


//  Keep track of whether the game has started or not.  Only call nextSequence() on the first keyPress.
var started = false;

// create a new variable called level and start at level 0
var level = 0;


//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
    console.log(started);
    if (!started) {
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePress(userChosenColor);

   // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
   checkAnswer(userClickedPattern.length - 1);

});

function nextSequence(){

    // once nextSequence is triggred, reset the userClickedPattern to an empty array ready for the nxt level.
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");

    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel){

    // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the gam patter.  If so then log "success", otherwise log "wrong"
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another statement.
        if(userClickedPattern.length === gamePattern.length){
            // Call nextSequence() after 1000 ms delay.
            setTimeout(function (){
                nextSequence();
            }, 1000)
        }
    }
    else{
        console.log("WRONG!");

        // 1. In the sounds folder, there is a sound called wrong.mpt, play this sound if the user got one of the ansers wrong.
        playSound("wrong");

        // 2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the ansers wrong an then remove it after 200ms.
        $("body").addClass("game-over");
        setTimeout(function () {

            $("body").removeClass("game-over");
        },200);

        // 3. change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("GAME OVER LOSER! YOU ARE SOOOOOO LAME BROKSI! Press any key to Restart");

        // reset the values to start over
        startOver();
    }

}

function startOver(){
    
//3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}