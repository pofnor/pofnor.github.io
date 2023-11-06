"use strict";

function checkPassword(){  
  const passwordInput = document.getElementById("passwordInput");
  const password = passwordInput.value;
  const passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/g ;
  const passResult = document.getElementById("result1");
  const passMatches = password.match(passRegExp);
  if(!passMatches) passResult.textContent = password + " INVALID PASSWORD" ;
  else passResult.textContent = password + " is a valid password" ;
}

function checkEmail(){  
  const emailInput = document.getElementById("emailInput");
  const mail = emailInput.value;
  const mailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
  const mailResult = document.getElementById("result2");
  const mailMatches = mail.match(mailRegExp);
  if(!mailMatches) mailResult.textContent = mail + " INVALID Mail Address" ;
  else mailResult.textContent = mail + " is a valid Mail Address" ;
}

function replaceCharacter(){
  const characterInput = document.getElementById("characterInput");
  const phrase = characterInput.value;
  const stringRegExp = /([A-Z])/g;
  const stringResult = document.getElementById("result3");
  stringResult.textContent = phrase + " = " + phrase.replace(stringRegExp, " $1");

  const objectRegExp1 = document.getElementById("result4");
  const objectRegExp2 = document.getElementById("result5");
  objectRegExp1.textContent = "Test Method for finding camel word = " +
   /camel/i.test(phrase); //returns true or false
  objectRegExp2.textContent = "Exec Method for finding camel word = " +
   /camel/i.exec(phrase); //returns the found text as an object
}