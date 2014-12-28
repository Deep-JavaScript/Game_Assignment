/**
 * Created with JetBrains WebStorm.
 * User: JagDeep Matharu
 * Date: 7/14/13
 * Time: 5:11 PM
 * To change this template use File | Settings | File Templates.
 */

$(function(){
    start();
    rocket = document.createElement("audio");
    document.body.appendChild(rocket);
    rocket.setAttribute("src","../media/Rocket.mp3");



});
var rocket   ;


function start() {
    startdrawing();
    enemyufo(5);
    misslemove();

    allie1 = new Allie();


    document.addEventListener('keydown', checkKeyDown, false);
    document.addEventListener('keyup', checkKeyUp, false);
    score();
    level();

}


var allie1;
var fps = 10;
var drawinterval;


var enemymisslieloop = [];
var intervalmisile;
var totalmissile = 0;



var ufos = [];






//moving `ufo in to attack

function enemyufo(n){
    for (var i=0;i<n;i++){
        ufos[ufos.length] = new Ufo();
    }
}



function drawallufo(){
    ctxufo.clearRect(0, 0, gamewidth, gameheight);
    for(var i = 0;i<ufos.length; i++){
        ufos[i].draw();

    }
}

function enemymissile(n){
    for (var i=0;i<n;i++){
        enemymisslieloop[totalmissile] = new Ufomissile();
        totalmissile++;

    }
}

function drawallenemymissile(){
    ctxmissle.clearRect(0, 0, gamewidth, gameheight);
    for(var i = 0;i<enemymisslieloop.length; i++){
        enemymisslieloop[i].draw();

    }

}

//creating sprite background



var canvasbg = document.getElementById('game');
var ctxbg = canvasbg.getContext('2d');

var canvasmissle = document.getElementById('missle');
var ctxmissle = canvasmissle.getContext('2d');

var canvasscore = document.getElementById('playerscore');
var ctxscore = canvasscore.getContext('2d');
ctxscore.fillStyle="rgba(252,3,47,0.5)";
ctxscore.font = "bold 20px Arial";

var canvaslevel = document.getElementById('playerlevel');
var ctxlevel = canvaslevel.getContext('2d');
ctxlevel.fillStyle="rgba(252,3,47,0.5)";
ctxlevel.font = "bold 20px Arial";


var gamewidth = canvasbg.width;
var gameheight = canvasbg.height;
var imgSprite = new Image();
imgSprite.src = '../images/sprite1.png';


imgSprite.addEventListener('load', drawbg, false);
function drawbg() {

    ctxbg.clearRect(0, 0, gamewidth, gameheight);
    ctxbg.drawImage(imgSprite, 0, 0, 700, 400, 0, 0, 700, 400);

}

// creating ufo to fly

var canvasufo = document.getElementById('ufo');
var ctxufo = canvasufo.getContext('2d');




function startdrawing(){
    stopdrawing();
    drawinterval = setInterval(draw,fps);

}

function stopdrawing(){
    clearInterval(drawinterval);
}

function draw(){
    drawallufo();
    allie1.draw();
    drawallenemymissile();

}

//creating ufo
function Ufo(){
    this.srcX = 0;
    this.srcY = 400;
    this.drawX = Math.floor(Math.random() * 1000)+gamewidth;
    this.drawY = Math.floor(Math.random() *gameheight);
    this.width = 150;
    this.height = 65;
    this.width1 = 100;
    this.height1 = 45;
    this.speed = 2;
    this.points= 5;
    this.levelpoint = 1;

}

Ufo.prototype.draw = function(){
    this.drawX -= this.speed;
    ctxufo.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width1, this.height1);
    this.escape();
    if(this.drawX<-146){
    //    console.log("loose");

    }

};

Ufo.prototype.escape = function(){
    if(this.drawX + this.width <= 0){
        this.recycleenemy();
    }


};

Ufo.prototype.recycleenemy = function(){
    this.drawX = Math.floor(Math.random() * 1000)+gamewidth;
    this.drawY = Math.floor(Math.random() *gameheight);
} ;


//creating allie ship

var canvasallie = document.getElementById('allie');
var ctxallie = canvasallie.getContext('2d');



function Allie(){
    this.srcX = 500;
    this.srcY = 400;
    this.drawX = -100;
    this.drawY = 200;
    this.nosex = this.drawX+100;
    this.nosey = this.drawY+7 ;
    this.width = 200;
    this.height = 65;
    this.width1 = 130;
    this.height1 = 60;
    this.speed = 2;
    this.isupkey = false;
    this.isdownkey = false;
    this.isspacebar = false;
    this.isshooting = false;
    this.missile=[];
    this.currentmissile = 0;
    this.score = 0;
    this.level = 0;

    for (var i=0;i<20;i++){
        this.missile[this.missile.length] = new Missile(this);

    }
}



Allie.prototype.draw = function(){
    ctxallie.clearRect(0, 0, gamewidth, gameheight);
    this.checkdirection();
    this.checkshooting();
    this.drawallmissile();
    this.nosex = this.drawX+100;
    this.nosey = this.drawY+7 ;
    ctxallie.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width1, this.height1);

};

Allie.prototype.checkdirection = function(){
    if(this.isupkey){
        this.drawY -=this.speed;
    }
    if(this.isdownkey){
        this.drawY +=this.speed;
    }
};

Allie.prototype.scores = function(n){
    this.score +=n;
    score();
    aa();
};

function aa(){
    var num = 0;
    if(allie1.score>=100)
    {
        win();
       // alert("you win");
       // start();
        return num;
    }
};

Allie.prototype.levels = function(n){
    this.level +=n;
    if(allie1.score>=20){

    }
    level();

};

Allie.prototype.drawallmissile = function(){

    for (var i = 0; i < this.missile.length; i++) {
        if (this.missile[i].drawX >= 0){
            this.missile[i].draw();
        }
        if (this.missile[i].blast.hit){
            this.missile[i].blast.draw();

        }
    }
}

Allie.prototype.checkshooting = function(){

    if (this.isspacebar && !this.isshooting) {
        this.isshooting = true;
        this.missile[this.currentmissile].fire(this.nosex, this.nosey);
        this.currentmissile++;
        if (this.currentmissile >= this.missile.length) this.currentmissile= 0;
    } else if (!this.isspacebar) {
        this.isshooting = false;
    }
}


function checkKeyDown(e){
    var keyid = e.keyCode || e.which ;
    if(keyid === 38){ //up

        allie1.isupkey = true;
        e.preventDefault();
    }
    if(keyid === 40){        //dwn
        allie1.isdownkey = true;
        e.preventDefault();
    }
    if(keyid === 32){        //spacebar
        rocket.play();
        allie1.isspacebar = true;
        e.preventDefault();
    }


};


function checkKeyUp(e){
    var keyid =  e.keyCode || e.which ;
    if(keyid === 38){ //up
        allie1.isupkey = false;
        e.preventDefault();
    }
    if(keyid === 40){        //dwn
        allie1.isdownkey = false;
        e.preventDefault();
    }
    if(keyid === 32){        //spacebar
        allie1.isspacebar = false;
        e.preventDefault();
    }

};

//missile

function Missile(i){
    this.allie = i;
    this.srcX = 270;
    this.srcY = 400;
    this.drawX = -1;
    this.drawY = 0;
    this.width = 160;
    this.height = 65;
    this.width1 = 90;
    this.height1 = 30;
    this.blast = new Blast();

}


Missile.prototype.draw = function(){
    this.drawX+=3;
    ctxallie.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width1, this.height1);
    this.checkhit();
    if(this.drawX>gamewidth)  {
        this.recycle();
    }
};

Missile.prototype.fire = function(startx,starty){
    this.drawX = startx;
    this.drawY = starty;
};


Missile.prototype.recycle = function(){
    this.drawX = -20;
};


Missile.prototype.checkhit = function(){
    for (var i = 0; i < ufos.length; i++) {
        if (this.drawX >= ufos[i].drawX &&
            this.drawX <= ufos[i].drawX + ufos[i].width &&
            this.drawY >= ufos[i].drawY &&
            this.drawY <= ufos[i].drawY + ufos[i].height) {
            this.blast.drawX = ufos[i].drawX - (this.blast.width / 2);
            this.blast.drawY = ufos[i].drawY;
            this.blast.hit = true;
            this.recycle();
            ufos[i].recycleenemy();
            this.allie.scores(ufos[i].points);

        }
    }

};

//blast
function Blast(){

    this.srcX = 150;
    this.srcY = 400;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 120;
    this.height = 80;
    this.width1 = 100;
    this.height1 = 50;
    this.hit = false;
    this.currentframe = 0;
    this.totalframe = 10;
}  ;

Blast.prototype.draw = function(){
    if(this.currentframe<=this.totalframe){
        ctxallie.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width1, this.height1);
        this.currentframe++;
    }  else{
        this.hit = false;
        this.currentframe = 0;
    }


};


function mouseclicked(e){
    mousex = e.pageX - canvasbg.offsetLeft;
    mousey = e.pageY - canvasbg.offsetTop;
    console.log(mousex);
    if(but.clicked()){
        start();
    };
};

function score(){
    ctxscore.clearRect(0, 0, gamewidth, gameheight);
    ctxscore.fillText("Score : " + allie1.score,580,30)

} ;

function level(){
    ctxlevel.clearRect(0, 0, gamewidth, gameheight);

};

// ufomissile

function Ufomissile(){
    this.srcX = 410;
    this.srcY = 400;
    this.width = 200;
    this.height = 65;
    this.width1 = 90;
    this.height1 = 30;
    this.speed = 2;
    this.drawX = Math.floor(Math.random() * 1000)+gamewidth;
    this.drawY = Math.floor(Math.random() *gameheight);
    this.hit = false;
    this.isDead = false;
}

var aaa=[];

Ufomissile.prototype.draw = function(){

this.drawX -= this.speed;
ctxmissle.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width1, this.height1);
            var a=0;

this.escape();

    if(this.drawX<-299){
            aaa.push("1");
            //console.log(a);
        }

    if(aaa.length >18){
        aaa.splice(1,1);
           lose();
        //console.log("akjhskjash");
        //alert("doen");
        //start();

    }
     // console.log(aaa.length);
   /* if(aaa[2]==1){
        console.log("aaaa");
    } else if(aaa[2]==null){
        aaa.splice(1,2,"1");
    }    */

    /*
 if(this.drawX<-299) {
            a++;

            this.isDead = true;
     console.log(a);
     if(a ==3){
            console.log("jhagsjhagsjhagsjh");
         a = 0;
     }
    } */



    /*
    for(i=0;i<=this.drawX;i++){

        if(this.drawX<-299 ===3){
            console.log(i);
            console.log("jhagsjhagsjhagsjh");
        }
    }
      */

    /*
    var i=1;
    for(j=0;j<i;++j){

           if(this.drawX<-299){
           i++;
               if(i==3){
                      console.log("jhagsjhagsjhagsjh");
               }
           }
    }
      */

                      /*
    if(this.drawX<-299){
        console.log("loose0");


    }                   */
};

Ufomissile.prototype.escape = function(){
    if(this.drawX + this.width <= -100){
        this.recycleenemy();
    }
};

Ufomissile.prototype.recycleenemy = function(){
    enemymisslieloop.splice(enemymisslieloop.indexOf(this),1);
    totalmissile--;
};

Ufomissile.prototype.checkhitcannon = function(){

        if (this.drawX >= allie1.drawX &&
            this.drawX <= allie1.drawX + allie1.width &&
            this.drawY >= allie1.drawY &&
            this.drawY <= allie1.drawY + allie1.height) {
            this.blast1.drawX = allie1.drawX - (this.blast1.width / 2);
            this.blast1.drawY = allie1.drawY;
            this.blast1.hit = true;
            this.recycleenemy();



    }

};



function misslemove(){
    misslestop();
    intervalmisile = setInterval(function(){enemymissile(2);},2000);
};

function misslestop(){
    clearInterval(intervalmisile);
};
// endufomissile





//sound



window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
    var audioElement = document.getElementById("mainsound");
    audioElement.play();

}

//end sound


function lose()
{
    window.location.assign("loose.html")
}

function win()
{
    window.location.assign("win.html")
}

