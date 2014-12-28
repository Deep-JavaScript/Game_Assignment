/**
 * Created with JetBrains WebStorm.
 * User: Deep
 * Date: 8/1/13
 * Time: 2:44 PM
 * To change this template use File | Settings | File Templates.
 */



function fadein(x)
{
    $("#mainsound").fadeIn();

}

function fadeout(x)
{
    $("#mainsound").fadeOut();

}

var X = 100;

function init() {
    var canvas = document.getElementById("story");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        // Set the banner text attributes
        ctx.fillStyle = "red";
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        ctx.shadowBlur = 3;
        ctx.shadowColor = "grey";
        ctx.font = "60px Andalus";

        // Call the moveBanner() function repeatedly every 40 microseconds
        setInterval(function () { moveBanner() }, 40)
    }
}

function moveBanner() {
    var canvas = document.getElementById("story");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        // Clear the screen
        ctx.clearRect(0, 0, 1300, 200);

        // Display the text in the new position
        ctx.fillText("In the year 2050, the earth was in its prime of peace and prosperity. Every human is living happily, until the evil conqueror of the galaxy Doom has decided to invade the earth with his ruthless army of alien. The world is in shore of the Great War in the history and you have to save it. You are the only hope of world and mankind. Every hope lies on you. Live for nothing, or die for something.   Good luck chuck!", X, 110);
        X -=7 ;


    }
}


window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
    var audioElement = document.getElementById("theAudio");
    audioElement.play();

}



function menu()
{
    window.location.assign("../index.html")
}
