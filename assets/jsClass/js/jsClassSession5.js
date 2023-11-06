"use strict";
// ------------------------------------------ Lesson ------------------------------------------
console.groupCollapsed("Lesson");
// ------------------------- Subject = Prototype ----------------
const parent = {
  name : "Martin" ,
};
const child = Object.create(parent);

console.groupCollapsed("Prototype");
console.log("child = ",child);
console.log("child.name = ",child.name);

console.log("Object.getPrototypeOf(parent) = ",Object.getPrototypeOf(parent));
console.log("parent.__proto__ = " , parent.__proto__);
console.log("child.__proto__" , child.__proto__);

const parent2 = {
  lastname : "Scorsese" ,
};

const child2 = Object.create(parent2);
console.log("parent2 test ref : child2.lastname = " ,
 child2.lastname ," and child2.age =" ,child2.age);

parent2.lastname = "Wallex";
child2.age = 25;

console.log("parent2 test ref : child2.lastname = " ,
 child2.lastname ," and child2.age =" ,child2.age);
console.groupEnd("Prototype");

// -----------------------------------------
console.groupCollapsed("Object");
console.log("Object.keys(parent) = " , Object.keys(parent));
console.log("Object.values(parent) = " , Object.values(parent));
console.log("Object.entries(parent) = " , Object.entries(parent)); // only return own property, not any of prototype
console.groupEnd("Object");
// -----------------------------------------

const user1 = {
  username : "user1" ,
  password : "hunter1" ,
};

const user2 = {
  username : "user2" ,
  password : "hunter2" ,
};

console.groupCollapsed("ObjectFreeze");
try{
  // Freeze the object
  const newUser1 = Object.freeze(user1); //newUser1 just a ref to user1 and in fact the 'user1' is freezed.
  console.log("Object.isFrozen(newUser1) = " , Object.isFrozen(newUser1));
  console.log("Object.isFrozen(user1) = " , Object.isFrozen(user1));
  newUser1.password = "PasswordChanged";
  newUser1.active = true ;
  console.log("newUser1 = " , newUser1);  //we get the error when 'use strict' mode 
} 
catch {
  console.log("For see the result, don't 'use strict'");
}
console.groupEnd("ObjectFreeze");

console.groupCollapsed("ObjectSeal");
try{
  // Seal the object
  const newUser2 = Object.seal(user2); //newUser2 just a ref to user2 and in fact the 'user2' is sealed.
  console.log("Object.isSealed(newUser1) = " , Object.isSealed(newUser2));
  console.log("Object.isSealed(user1) = " , Object.isSealed(user2));
  newUser2.password = "PasswordChanged";
  newUser2.active = true ;
  console.log("newUser2 = " , newUser2);  //we get the error when 'use strict' mode 
  
}
catch {
  console.log("For see the result, don't 'use strict'");
}
console.groupEnd("ObjectSeal");
console.groupEnd("Lesson");

// ------------------------------------------ Exercise ------------------------------------------
console.groupCollapsed("Exercise");

// --------------------------Constructor---------------------------------
console.groupCollapsed("Constructor");
// make object without Constructor but has object Accessors (Getters and Setters)
const ID = {
  name : "Taylor",
  family : "Swift",
  age : 20,
  balance : 0,
  get fullname() {
    return this.name + " " + this.family;
  },
  get isAdult() {
    return (this.age > 18) ? true : false;
  },
  set deposit(value) {
    this.balance += value;
  }
};

// declare a constructor without object Accessors
function ID1(name,family,age) {
  if (!new.target) { // if you run me without new
    return new ID1(name,family,age); // ...I will add new for you
  }
  this.name = name;
  this.family = family;
  this.age = age;
  this.balance = 0;
  this.fullname = () => {   
    return this.name + " " + this.family;
  };
  this.isAdult = () => {
    return (this.age > 18) ? true : false ; 
  };
  this.deposit = (value) => {
    this.balance += value;
  };
}

// declare a constructor with object Accessors (Getters and Setters)
function ID2(name,family,age) {
  if (!new.target) { // if you run me without new
    return new ID2(name,family,age); // ...I will add new for you
  }
  this.name = name;
  this.family = family;
  this.age = age;
  this.balance = 0;
}

Object.defineProperties(ID2.prototype,{
  fullname : {get : function() {return this.name + " " + this.family;}},
  isAdult : {get : function() {return (this.age > 18) ? true : false;}},
  deposit : {set : function(value) {this.balance += value;}}  
});

// Object.defineProperty(ID2.prototype,"fullname",{
//   get : function() {return this.name + " " + this.family;}
// });
// Object.defineProperty(ID2.prototype,"isAdult",{
//   get : function() {return (this.age > 18) ? true : false;}
// });
// Object.defineProperty(ID2.prototype,"deposit",{
//   set : function(value) {this.balance += value;}
// });

console.log("ID = " , ID);
ID.deposit = 40;
console.log(` balance ID = ${ID.balance}$`);

const objectByID1 = new ID1("Tylor","Swift",20);
console.log("object By ID1 = " , objectByID1);
console.log("fullname() = " , objectByID1.fullname()); //without Getters
console.log("isAdult() = " , objectByID1.isAdult()); //without Getters
objectByID1.deposit(20) ; //without Setters
console.log(` balance = ${objectByID1.balance}$`);
objectByID1.deposit(30) ; //without Setters
console.log(` balance = ${objectByID1.balance}$`);

const objectByID2 = new ID2("Shakira","Ripoll",38);
console.log("object By ID2 = " , objectByID2);
console.log("fullname = ",objectByID2.fullname); //with Getters
console.log("isAdult = ",objectByID2.isAdult); //with Getters
objectByID2.deposit = 20 ; //with Setters
console.log(` balance = ${objectByID2.balance}$`);
objectByID2.deposit = 30 ; //with Setters
console.log(` balance = ${objectByID2.balance}$`);

//The Problem of Declare a constructor with object Accessors
console.log("ID.fullname= ",Object.hasOwn(ID,"fullname"));
console.log("objectByID2.fullname= ",Object.hasOwn(objectByID2,"fullname"));

console.groupEnd("Constructor");

// --------------------------Prototype---------------------------------
console.groupCollapsed("Prototype");
const grandpa = {
  name : "grandpa",  
};
const father = Object.create(grandpa);
father.name = "father";
const son = Object.create(father);
const neighbor = {
  surename : "Neighbor"
};
// Object.hasOwn() is intended as a replacement for Object.prototype.hasOwnProperty().
console.log("name = ",grandpa.name,grandpa.hasOwnProperty("name"));
console.log("name = ",grandpa.name,Object.hasOwn(grandpa,"name"));
console.log("name = ",father.name,father.hasOwnProperty("name"));
console.log("name = ",father.name,Object.hasOwn(father,"name"));
console.log("name = ",son.name,son.hasOwnProperty("name"));
console.log("name = ",son.name,Object.hasOwn(son,"name"));
console.log(neighbor.name);
Object.setPrototypeOf(neighbor,son);
console.log(neighbor.name);
console.groupEnd("Prototype");

// --------------------------Rest---------------------------------
console.groupCollapsed("Rest");
function sum(...numbers){
  let result = 0;
  for(let number of numbers){
    result += number;
  }
  return result;
}
console.log("sum = ",sum(8,2,4,11));
console.groupEnd("Rest");
console.groupEnd("Exercise");