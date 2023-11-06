// "use strict";
// ------------------------------------------ Lesson ------------------------------------------
console.groupCollapsed("Lesson");

// ----- rest parameters and spread operator ----
console.groupCollapsed("Rest&Spread");
// rest
// In array, names can be different
// Array Object Destructuring
let people = ["steve","Pete","Mike","Nick"];
let [Doctor,Lawyer,...students] = people;
console.log("Doctor = ",Doctor);
console.log("Lawyer = ",Lawyer);
console.log("students = ",students);
// In the object, the names must be the same
// Object Destructuring
const {surname,age,...otherDetails} = {
  surname : "steve",
  age : 19,
  place : "Romania",
  hobby : "reading"
};
console.log("surname = ",surname);
console.log("age = ",age);
console.log("otherDetails = ",otherDetails);

// Spread
// Make new array from other
let number1 = [1,2];
let number2 = [3,4];
let newNumber = [...number1,...number2,5,6];
console.log(newNumber);
// Copy array
let scores = [80,70,90];
let copiedScores = [...scores];
console.log(copiedScores);
// Spread and String
let chars = ['A',...'BC','D'];
console.log(chars);




console.groupEnd("Rest&Spread");

console.groupEnd("Lesson");

// ------------------------------------------ Function ------------------------------------------
function randomHi(){
  let hi = document.getElementById("randomHi");  
  hi.src=`img/Hi${Math.floor((Math.random() * 4) + 1)}.png`;  
}

function randomColor(){
  /* The value of the Hexadecimal can range from 00 to FF. So, the maximum value can be 
  FFFFFF - white color, and the minimum value can be 000000 - black color.
  How to calculate FFFFFF to 16777215 
  let t = 0xFFFFFF; 
  console.log(t.toString()); */  

  // use padStart to ensure that the string length is at least 6
  let colorValue =  "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6,"0").toUpperCase();  

  let color = document.getElementById("randomColor");  
  color.style.color = colorValue;
}

function date(){
  const now = new Date();
  let dateH1 = document.getElementById("date");
  let hour = now.getHours();
  let amPM = "AM";
  if(hour > 12){
    amPM = "PM";
    hour -= 12;
  } 
  dateH1.innerHTML = `Time is <span>${hour.toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`+
  `:${now.getSeconds().toString().padStart(2,"0")} ${amPM}</span> `+
  `on ${now.getFullYear()}/${now.getMonth()}/${now.getDate()} <br> ${now.toDateString()}` ;
  setTimeout(date,1000);
}

// ------------------------------------------ addEventListener ---------------------------------
function event(){
  let element = document.getElementById("randomColor");  
  element.addEventListener("click",() =>{
    element.style.border = "1px solid white";
    randomColor();
  });
  element.addEventListener("mouseout",() =>{
    element.style.border = "";
    element.style.background = "";
  });
  element.addEventListener("mouseover",() =>{
    element.style.background = "black";
  });
  
}
// ------------------------------------------ Exercise ------------------------------------------
console.groupCollapsed("Exercise");

console.groupCollapsed("P1");

/* Write a function that takes a number(n) and  
return an array that output values are from 1 to n.(while) */
function makeArrayOfNumber(n){  
  let i = 1;
  let array = []; array.length
  while(i<=n){
    array.push(i);
    i++;
  }
  return array;
}
const result = makeArrayOfNumber(10);
console.log("makeArrayOfNumber(10) = ",result);


/* Use the above output array and slice it by three and 
use rest and spread operator to move the pieces. */

/* Slice(0,5) gives from zero to 5. 
Do not forget that the last element is not inside. */
function slice3(result){
  let sliceSize = Math.trunc(+(result.length) / 3);  
  let s1 = result.slice(0,sliceSize);  
  let s2 = result.slice(sliceSize,sliceSize*2);
  let s3 = result.slice(sliceSize*2);
  
  let x = Math.floor((Math.random() * 3) + 1);
  let output;
  switch(x){
    case 1 : 
      output = [...s1,...s3,...s2];
      break;    
    case 2 :
      output = [...s2,...s1,...s3];
      break;
    case 3 :
      output = [...s3,...s2,...s1];      
  }
  return output;
}

console.log(slice3(result));
console.groupEnd("P1");

console.groupCollapsed("this");
// ------------------------------------------------
function foo(a) {
  this.a = a;
}
var bar = new foo( 2 );
console.log("1.new binding", bar.a );
// ------------------------------------------------
function fooo() {
  console.log("2.explicit binding", this.a );
}
var obj = {
  a: 2
};
fooo.call( obj );
// ------------------------------------------------
function foooo(something) {
  console.log("2.Hard Binding(explicit binding)", this.a, something );
  return this.a + something;
}
var obj = {
  a: 2
};
var bar = foooo.bind( obj );
var b = bar( 3 );
console.log( b );
// ------------------------------------------------
function fo() {
  console.log( "3.implicit binding",this.a );
}
var obj = {
  a: 2,
  fo: fo
};
obj.fo();


function foo1() {
 console.log( "3.implicit binding",this.a );
}
var obj2 = {
 a: 42,
 foo: foo1
};
var obj1 = {
 a: 2,
 obj2: obj2
};
obj1.obj2.foo();
// ------------------------------------------------
function boo() {
  console.log( "4.default binding",this.a );
}
var a = 2;
boo();
// ------------------------------------------------
function doo1() {
  return function (a) {
    console.log( "functions",this.a );
  };
}
function doo() {
  // return an arrow function
  return (a) => {
    // `this` here is lexically adopted from `foo()`
    console.log( "arrow-functions",this.a );
  };
}
var obj1 = {
  a: 2
};
var obj2 = {
  a: 3
};
var bar = doo.call( obj1 );
var bar1 = doo1.call( obj1 );
bar.call( obj2 );
bar1.call( obj2 );
// ------------------------------------------------
function loo() {
  console.log("Losing this", this.a );
}
var obj = {
  a: 2,
  foo: loo
};
var bar = obj.foo; // function reference/alias!
var a = "oops, global"; // `a` also property on global object
bar();
// ------------------------------------------------
console.groupEnd("this");

console.groupEnd("Exercise");