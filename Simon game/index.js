var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var level=0;
var i=0;

//keyboard press(event listener)
$(document).keydown(function(){
   if(level===0)
   {
       
       nextSequence();
       
   }
});
//event listener
$(".btn").click(function(){
   
        var userChoosenColor=$(this).attr("id");
        check(userChoosenColor);
        playSound(userChoosenColor);
        animatePress(userChoosenColor);
    
    
});
//checks if pattern correct
function check(selected)
{
   
    if(selected===gamePattern[i])
    {
        i++;
        
    }
    else{
        var wrong=new Audio("sounds/wrong.mp3");
        wrong.play();
        $("h1").text("Wrong!");
        setTimeout(function(){
            $("h1").text("Press A key to start");
            level=0;
            gamePattern=[];
        },1000);
    }
    if(i===gamePattern.length)
    {
        
        i=0;
        setTimeout(function(){
            nextSequence();
        },1000);
    }
   
}
//generates sequences
function nextSequence()
{
   
   $("h1").text("Level "+level);
   var randomNumber=Math.floor(Math.random()*4);
   var randomChoosenColor=buttonColors[randomNumber];
   gamePattern.push(randomChoosenColor);
   $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   var sounds=new Audio("sounds/"+randomChoosenColor+".mp3");
   sounds.play();
   level++;
   
   
}


//plays sound function
function playSound(color)
{
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}
//changes css when button pressed
function animatePress(currColor)
{
    $("."+currColor).addClass("pressed");
    setTimeout(function(){
        $("."+currColor).removeClass("pressed");
    },100);
}



