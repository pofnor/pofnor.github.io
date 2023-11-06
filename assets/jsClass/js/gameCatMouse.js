"use strict";

let destination = 150; //Distance Between Cat and Mouse, When the Game Start
let isFinished = false;

// first position
function initiate(){  
  let clientW = window.innerWidth;  
  let cat = document.getElementById("cat");
  let mouse = document.getElementById("mouse");     
  cat.style.left = move(cat.style.left,clientW/4,150);  
  cat.style.top = move(cat.style.top,100,50);
  mouse.style.left = move(mouse.style.left,clientW/4,50);
  mouse.style.top = move(mouse.style.top,100,250);  
}
// make random move
function move(location,movePx,shift = 0){
  let random = Math.floor(Math.random() * movePx);  
  let locationNoPx = +(location.split("px")[0]); //convert to number      
  return ((shift + locationNoPx + random).toString() + "px");
}

// start game
function start(){  
  if(isFinished){
    window.location.reload();
  }  
  let cat = document.getElementById("cat");
  let mouse = document.getElementById("mouse");   
  let result = document.getElementById("result");   
  let checkResult = (+(cat.style.left.split("px")[0])) - (+(mouse.style.left.split("px")[0]));  
  if (checkResult < 7){
    result.innerHTML = "The Cat caught The Mouse, You " + "<span>"+"LOOOSE"+"</span>"
    mouse.style.display = "none";
    cat.setAttribute("src","img/CatWin.webp");
    cat.style.width = "200px";
    isFinished = true;
    document.getElementById("btnStart").textContent = "Start Again";
  } else {
    setTimeout(start,100);
  }
  cat.style.top = move(mouse.style.top,10,destination);
  cat.style.left = move(mouse.style.left,10,destination); 
  destination -= 1;
}

// action game
addEventListener("keydown",function(e){  
  let mouse = document.getElementById("mouse");
  switch (e.keyCode){
    case 40 : //down      
      mouse.style.top = move(mouse.style.top,10);      
      break;
    case 38 : //up      
      mouse.style.top = move(mouse.style.top,-10); 
      break;
    case 39 : //right      
      mouse.style.left = move(mouse.style.left,10);       
      break;
    case 37 : //left      
      mouse.style.left = move(mouse.style.left,-10); 
  }  
});