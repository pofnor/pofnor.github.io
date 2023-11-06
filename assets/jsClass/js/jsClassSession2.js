"use strict";
// ------------------------------ Exercise3 --------------------------------------

function multiplication() {
  //Higher Order Function
  let multiply = function (number1) {
      return function(number2){
          return number2 * number1;
      }
  }
  if(confirm("Are you prefer input one number to multiply by 6?")){
      const result = document.getElementById("Multiplication");
      const multiplyBy6 = multiply(6); //There is a function inside multiplyBy6 
      const num1 = prompt("Enter number to multiply by 6 ?");
      result.textContent = "The multiplyBy6 is equal to: " + multiplyBy6(num1);
  } else {
      const num1 = prompt("Enter First Number?");
      const num2 = prompt("Enter Second Number?");    
      const result = document.getElementById("Multiplication");
      result.textContent = "The multiplication answer is equal to: " + multiply(num1)(num2);
  }
}