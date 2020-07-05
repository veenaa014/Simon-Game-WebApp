var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var fired = 'False';


function nextSequence() {
  level += 1;
  $("h1").text("Level "+ level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  }else{
    $("body").addClass("game-over");
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();

  }
}

function startOver(){
  var gamePattern = [];
  var userClickedPattern = [];
  var level = 0;
  fired = "False";

}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
function playSound(name) {
  var audiofile = new Audio("sounds/"+name + ".mp3");
  audiofile.play();
}

$("#red,#blue,#green,#yellow").click(function() {
  var userChosenColour = (this.id);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});



$(document).keypress(function(){
  if (fired === 'False'){
    fired = 'True';
    $("h1").text("Level 0");
    nextSequence();
  }
})
