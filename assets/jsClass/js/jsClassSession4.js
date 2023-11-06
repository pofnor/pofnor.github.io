"use strict";
// -------------------------Variable Declaration-------------------
const number = "125,200$";

// ---------------------Functions Declaration--------------------
// Takes a number as input and returns the number of digits.
function countingDigits(number){
  const numberToString = String(number);
  let count = 0;
  for(let i of numberToString){
    if(+i){ // truthy = just numbers
      count++;
    } else {
      if( i==="0" ) count++; //for solve the zero problem
    }  
  }
  return count;
}

// Takes a number as input and returns the sum of digits.
function sumDigits(number){
  const numberToString = String(number);
  let sum = 0;
  for(let i of numberToString){
    if(+i){ // truthy = just numbers
      sum += +i;
    }  
  }
  return sum;
}

// Takes a number as input and returns the number of digits By regEx (Regular expression)
function countingDigitsByRegEx(number){  
  return (String(number)).replace(/\D/g,"").length; // Remove anything but numbers  replace(/[^0-9]/g,"")
}

// Takes a number as input and returns the sum of digits By regEx (Regular expression)
function sumDigitsByRegEx(number){
  const num = (String(number)).replace(/\D/g,"");  // replace(/[^0-9]/g,"")
  let sum = 0;
  for(let i of num) sum += +i;      
  return sum;
}

// Print odd numbers
function printOddNumbers(a,b) {
  let arrayNumber = [];
  for(let i = a; i < b ; i++) arrayNumber[i] = i;
  let odd = arrayNumber.filter(value => (value%2));
  return odd;
}

// Take an array and return just truthy (not falsy)
function truthy1(array){    
  return array.filter(value => value); 
}

// Take an array and return just truthy (not falsy)
function truthy2(array){
  let truthy = [];
  for(let i of array){    
     if(i) truthy.push(i);
  }
  return truthy;
}

// Take an array and return just truthy (not falsy)
// array.reduce(function(total, currentValue), initialValue)
function truthy3(array){    
  return array.reduce((total,currentValue) => {    
    if(currentValue){
      return[...total,currentValue]; // use spread(...) to returns a single value(an array)
    } else {return total;}
  },[]);
}

// Take an array and return just truthy (not falsy)
function truthy4(array){
  let truthy = [];
  array.forEach(value => {
    if(value) truthy.push(value);
  });
  return truthy;
}

console.log(`countingDigits(${number}) = `,countingDigits(number));
console.log(`sumDigits(${number}) = `,sumDigits(number));
console.log(`countingDigitsByRegEx(${number}) = `,countingDigitsByRegEx(number));
console.log(`sumDigitsByRegEx(${number}) = `,sumDigitsByRegEx(number));
console.log("Odd Number = ",printOddNumbers(1,100));
const array = ['a',0,-0,0n,null,"",'',``,NaN,false,true,undefined,Infinity,"false","true","0","1",1];
console.log("The Array Source is = ",array);
console.log("The Truthy1 Result is = ",truthy1(array));
console.log("The Truthy2 Result is = ",truthy2(array));
console.log("The Truthy3 Result is = ",truthy3(array));
console.log("The Truthy4 Result is = ",truthy4(array));

//--------------------------------- Call Apply Bind ------------------------------

// With the call() and apply() method, write a method that can be used on different objects.
// The Difference is 
// The call()  method takes arguments separately.
// The apply() method takes arguments as an array.
const robert = {
  name: "Robert Rocha",
  age: 12,
  height: "5,1",
  sex: "male",
  describe() {
      return "This is me " + this.name + " " + this.age + " " + this.height + " " + this.sex;
  },
  address(city,country) {
    return this.name + " Address : " + city + " , " + country ;
  }  
};
const richard = {
  name: "Richard Sash",
  age: 25,
  height: "6,4",
  sex: "male",
  print() {
    console.log("My name is " + this.name);
  }
}
console.log(robert.describe.call(richard ) );
console.log(robert.describe.apply(richard ) );
console.log(robert.address.call(richard,"Tehran","Iran"));
console.log(robert.address.apply(richard,["Tehran","Iran"]));
console.log(Math.max.apply(null, [1,2,3]));

// With the bind() method, an object can borrow a method from another object.
const describe = robert.describe.bind(richard);
const address  = robert.address.bind(richard);
console.log(describe());
console.log(address("Tehran","Iran"));

// the bind() method has to be used to prevent losing this.
// When a function is used as a callback, this is lost.

richard.print();
setTimeout(richard.print,1000);
const printBind = richard.print.bind(richard);
setTimeout(printBind,2000);