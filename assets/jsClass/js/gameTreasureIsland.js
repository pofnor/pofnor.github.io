"use strict";

let treasureX;
let treasureY;
let clickCount = 0;

// first position
function initiate(){
  let clientW = window.innerWidth;  
  let treasureIsland = document.getElementById("treasureIsland");
  treasureX =  250 + Math.floor(Math.random()*(clientW/2));
  treasureY = 50 + Math.floor(Math.random()*500);
  let locationLeft = (treasureX).toString() + "px";
  let locationTop = (treasureY).toString() + "px";
  treasureIsland.style.left = locationLeft;
  treasureIsland.style.top = locationTop;
}

addEventListener("click",function(e){start(e)});

function start(e){
  let treasureIsland = document.getElementById("treasureIsland");  
  let result = document.getElementById("result");
  if ((!( (e.clientX < treasureX) || (e.clientX > treasureX+50) )) && 
      (!( (e.clientY < treasureY) || (e.clientY > treasureY+50) )) ){
        result.innerHTML = "You Win by " + "<span>" + clickCount + "</span>" + " Click"  ;;
        treasureIsland.style.display = "block";
  } else {
    // add X for every click
    let clickHere = document.createElement("span");
    let main = document.getElementById("main");
    clickHere.textContent = "X";
    clickHere.style.position = "fixed";
    clickHere.style.top = (e.clientY).toString() + "px";
    clickHere.style.left = (e.clientX).toString() + "px";
    main.appendChild(clickHere);    
    let x = treasureX-e.clientX;
    let y = treasureY-e.clientY;
    clickCount += 1;
    result.innerHTML = "Destination to Treasure Island " + "<br>" +
       " X = " + "<span>" + x + "</span>" + " , Y = " + "<span>" + y + "</span>" +
       "<br>" + "Click Counter = " + clickCount ;
  }   
}