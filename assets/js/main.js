"use strict";
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

function load(){    
  let exam = document.getElementsByClassName("question");    
  for (let q of exam){    
      q.addEventListener("click", function () {
          /* Toggle between adding and removing the "active" class,
          to highlight the button that controls the panel */
          this.classList.toggle("active");
          /* Toggle between hiding and showing the active panel */
          let body = this.nextElementSibling;
          if (body.style.display === "block") {
              body.style.display = "none";
          } else {
              body.style.display = "block";
          }
      });
  }
}