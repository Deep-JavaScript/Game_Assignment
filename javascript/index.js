/**
 * Created with JetBrains WebStorm.
 * User: Deep
 * Date: 8/3/13
 * Time: 11:08 PM
 * To change this template use File | Settings | File Templates.
 */


function play()
{
    window.location.assign("images/game.html")
}


function story()
{
    window.location.assign("images/story.html")
}



function again()
{
    window.location.assign("../index.html")
}



window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
    var audioElement = document.getElementById("mainsound");
    audioElement.play();

}



window.addEventListener('load', loose, false);
function loose() {
    var lose = document.getElementById("loose");
    lose.play();

}



window.addEventListener('load', intro, false);
function intro() {
    var intro = document.getElementById("intro");
    intro.play();

}


