"use strict";

// ----------------------------------- Lesson --------------------------------------------------

/* -----------------------Remove this for see compare the Axios Vs Fetch

// axios
const axiosOptions = {
   url:"http://localhost:3000/account" ,
   method: "POST",
   timeout: 4000, // easy === AbortController

   data: {      
      "id": "100",
      "name": "AXIOS",
      "mobile": "09353300330",
      "username": "axios@axios.com",
      "password": "Aa@12345"
   }
};
axios(axiosOptions)
   .then(response => {
      console.log("axios",response.status);
});

// fetch
const url = "http://localhost:3000/account";
const fetchOptions = {
   method: "POST",
   headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
   },
   body: JSON.stringify({
      "id": "101",
      "name": "FETCH",
      "mobile": "09353300330",
      "username": "fetch@fetch.com",
      "password": "Ff@12345"
   })
};
fetch(url,fetchOptions)
   .then(response => {
      console.log("fetch",response.status);
   });

// AbortController for fetch
const controller = new AbortController();
const options = {
   method: "POST",
   signal: controller.signal,
   headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
   },
   body: JSON.stringify({
      "id": "102",
      "name": "FETCH",
      "mobile": "09353300330",
      "username": "fetch@abort.com",
      "password": "Ff@12345"
   })
};
const promise = fetch(url,options);
const timeoutId = setTimeout(()=>controller.abort(),4000);
promise
   .then(response => {console.log("fetch with abort",response.status)})
   .catch(error => {console.error("timeout exceeded",error.message)});

*/ // ------------------------Remove this for see compare the Axios Vs Fetch

// ----------------------------------- Exercise --------------------------------------------------
function convertPersianToEnglish(){
  const persian = document.getElementById("persian");
  const english = document.getElementById("english");
  let input = persian.value;
  let output;
  let temp;
  for(let char of input){        
    if     (char === "1") temp="1";
    else if(char === "2") temp="2";
    else if(char === "3") temp="3";
    else if(char === "4") temp="4";
    else if(char === "5") temp="5";
    else if(char === "6") temp="6";
    else if(char === "7") temp="7";
    else if(char === "8") temp="8";
    else if(char === "9") temp="9";
    else if(char === "0") temp="0";
    else temp = char;

    if(output) output += temp;
    else output=temp;
  }  
  english.textContent = output; 
}

function numberSeparately1(){
  const number = document.getElementById("number1");
  const numberSep = document.getElementById("numberSeparately1");
  let test = +(number.value);
  numberSep.textContent = test.toLocaleString("en-US"); //number formatted with commas) 
}
function numberSeparately2(){
  const number = document.getElementById("number2");  
  const numberSep = document.getElementById("numberSeparately2");
  const numberFormatter = Intl.NumberFormat('en-US');
  const formatted = numberFormatter.format(+(number.value));
  numberSep.textContent = formatted;
}
function numberSeparately3() {
  const number = document.getElementById("number3");  
  const numberSep = document.getElementById("numberSeparately3");
  var parts = number.value.toString().split(".");
  const numberPart = parts[0];
  const decimalPart = parts[1];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;  
  // /…/g creates a regular expression that matches all the occurrences of a pattern.
  // \B means do not match the beginning of the number string.
  // (?=(…)) does a positive lookahead. The captured match must be followed by what is specified inside the parenthesis, but that part is not captured.
  // (\d{3}) captures three digits.
  // (?!\d) does a negative lookahead. It matches with something not followed by a digit.
  // So \B(?=(\d{3})+(?!\d)) checks that one or more groups of exactly three digits follows, but ensures no additional digits follow that.
  // For instance, if you use this regular expression on 987654321.00:
  // Every point left to 3 is matched by the positive lookahead as 321 is 3 digits in length. The negative lookahead then checks that the multiple of 3 digits does not have any digits after it.
  // 321 is followed by a period. It is a group of 3 digits so a comma goes there.
  // But 432 is also multiple of 3 digits. However, it is followed by by 1 from the earlier group, so commas inserted.
  // 543 is also 3 digits in length. But it is followed by 2 and 1 from the earlier group. No commas are necessary.
  // 654 is 3 digits in length followed by 321, which is the whole earlier match group. Thus a comma is inserted here.
  // This process continues all the way to the beginning of the digit.
  // The result will be 987,654,321.00
  numberSep.textContent = numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
}

// -------------------------- Webcam ---------------------------------------
function openCam(){
   const prompt = document.getElementById("webcamPrompt");   
   let All_mediaDevices=navigator.mediaDevices
   if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
      prompt.textContent = "getUserMedia() not supported.";
      return;
   }
   All_mediaDevices.getUserMedia({
      audio: false,
      video: true
   })
   .then(function(vidStream) {
      var video = document.getElementById('videoCam');
      if ("srcObject" in video) {
         video.srcObject = vidStream;
      } else {
         video.src = window.URL.createObjectURL(vidStream);
      }
      video.onloadedmetadata = function(e) {
         video.play();
      };
   })
   .catch(function(e) {
      prompt.textContent = e.name + ": " + e.message;
   });
}

// -------------------------- Class ---------------------------------------
class Car{
   constructor(name , year){
     this.name = name;
     this.year = year;
   }
   print() {
     return(`The car name is ${this.name} and build on ${this.year}`);
   }
   age(){
     const date = new Date();
     return (date.getFullYear() - this.year);
   }
 }
 
 class Model extends Car{
   constructor(brand,year,mod){
     super(brand,year);
     this.model = mod;
   }
   show1(){
     return this.print() + "and the model is = " + this.model;
   }
   get show(){
     return this.print() + "and the model is = " + this.model;
   }
 }
 
 const car = new Car("toyota","2020");
 console.log("the age of this car = ",car.age());
 const myCar = new Model("toyota","2020","corolla");
 console.log("myCar.show1() => ",myCar.show1());
 console.log("myCar.show => ",myCar.show);
 console.log("myCar.year => ",myCar.year);