var randomNumber=Math.random()*6;
randomNumber=Math.floor(randomNumber)+1;
var randomNumber2=Math.random()*6;
randomNumber2=Math.floor(randomNumber2)+1;
switch(randomNumber)
{
    case 1:document.querySelector(".img1").setAttribute("src","images/dice1.png");
    break;
    case 2:document.querySelector(".img1").setAttribute("src","images/dice2.png");
    break;
    case 3:document.querySelector(".img1").setAttribute("src","images/dice3.png");
    break;
    case 4:document.querySelector(".img1").setAttribute("src","images/dice4.png");
    break;
    case 5:document.querySelector(".img1").setAttribute("src","images/dice5.png");
    break;
    case 6:document.querySelector(".img1").setAttribute("src","images/dice6.png");
    break;


}  
switch(randomNumber2)
{
    case 1:document.querySelector(".img2").setAttribute("src","images/dice1.png");
    break;
    case 2:document.querySelector(".img2").setAttribute("src","images/dice2.png");
    break;
    case 3:document.querySelector(".img2").setAttribute("src","images/dice3.png");
    break;
    case 4:document.querySelector(".img2").setAttribute("src","images/dice4.png");
    break;
    case 5:document.querySelector(".img2").setAttribute("src","images/dice5.png");
    break;
    case 6:document.querySelector(".img2").setAttribute("src","images/dice6.png");
    break;


}    
if(randomNumber==randomNumber2)
{
    document.querySelector("h1").innerHTML="Draw!";
}
else if(randomNumber>randomNumber2)
{
    document.querySelector("h1").innerHTML="🚩Player 1 wins!"
}
else{
    document.querySelector("h1").innerHTML="Player 2 wins!🚩"
}