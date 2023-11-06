"use strict";

let isSignup = false; //is the user goto Create account page or not
let validateName = false; //Validate name
let validateMobile = false; //Validate mobile number
let validateUsername = false; //Validate username
let validatePassword = false; //Validate password 
let isUnique = true; //Unique ID for post into Database
let postMethod = 0;  // 1 for axios, 2 for async and 3 for fetch

// --------------------- Hide and Show Loader ------------------------------------------------------
function showLoader(isShow){
  if(isShow) document.getElementById("loader").style.display="block"; // Show Loader
  else document.getElementById("loader").style.display="none"; // Hide Loader
}

// --------------------- Hide and Show input element to force user for select Post method ----------
function showCreateNewAccount(state){
  switch (state){
    case 1: //Hide postMethodButton
      document.getElementById("postMethodButton").style.visibility="hidden";
      break;
    case 2: //Show postMethodButton and Hide all elements of Create New Account
      document.getElementById("postMethodButton").style.visibility="visible";
      document.getElementById("name").style.visibility="hidden";
      document.getElementById("mobile").style.visibility="hidden";
      document.getElementById("username").style.visibility="hidden";
      document.getElementById("password").style.visibility="hidden";
      document.getElementById("result").style.visibility="hidden";
      break;
    case 3: //Hide postMethodButton and Show all elements of Create New Account
      document.getElementById("postMethodButton").style.visibility="hidden";
      document.getElementById("name").style.visibility="visible";
      document.getElementById("mobile").style.visibility="visible";
      document.getElementById("username").style.visibility="visible";
      document.getElementById("password").style.visibility="visible";
      document.getElementById("result").style.visibility="visible";
  }
}

// ------------------------------------------- Snackbar / Toast ---------------------------
function toast(message) {  
  var toastDiv = document.getElementById("toast");
  toastDiv.innerHTML = message;
  toastDiv.className = "show";
  // After 3 seconds, remove the show class
  setTimeout(function(){
    toastDiv.className = toastDiv.className.replace("show", ""); 
  }, 3000);
}

// ------------------------------------------- Select Post Method ---------------------------------
function selectPostMethod(name){
  if(name==='axios'){
    postMethod = 1;
    document.getElementById("postMethod").textContent = "((Axios))";
    document.getElementById("postMethodButton").style.display="none"; 
    showCreateNewAccount(3);
  } else if(name==='axiosAsync'){  
    postMethod = 2;
    document.getElementById("postMethod").textContent = "((Axios with Async))";
    document.getElementById("postMethodButton").style.display="none";   
    showCreateNewAccount(3);
  } else if(name==='fetchAsync'){  
    postMethod = 3;
    document.getElementById("postMethod").textContent = "((Fetch with Async))";
    document.getElementById("postMethodButton").style.display="none";   
    showCreateNewAccount(3);
  } else if(name==='fetch'){  
    postMethod = 4;
    document.getElementById("postMethod").textContent = "((Fetch))";
    document.getElementById("postMethodButton").style.display="none";   
    showCreateNewAccount(3);
  }
}

// ----------------------------------------------- Login ------------------------------------------
function login(){  
  const result = document.getElementById("result");
  result.textContent=""; //Clear previous content, if we click again on sign in button
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  showLoader(true);
  axios.get("http://localhost:3000/account")
  .then((response) => {
    showLoader(false);
    // check if the username and password is correct
    for (let index in response.data){
      if ((response.data[index].username === username.value.trim()) &&
      (response.data[index].password === password.value)){
        createLoginCookie(username.value.trim(),password.value);
        toast(`Welcome <span> ${response.data[index].name} </span><br> You have successfully logged in`);
        setTimeout(()=>{document.location.href="../../index.html"},3000);        
        document.getElementById("loginContainer").style.display = "none";        
        break;
      } else {
        showLoader(false);
        toast("Wrong Username or Password");        
      }
    }
  })
  .catch(error => {
    showLoader(false);
    result.innerHTML = error.message ;
    // result.innerHTML = error.message + "<br>" + error.config.url;
  })
}

// ----------------------------------------------- POST1 ------------------------------------------
// make it by axios with .then and .catch 
function post1(name,mobile,username,password){
  showLoader(true);
  const result = document.getElementById("result");  
  isUnique = true; //for run again the function, set it again to true
  
  // check the username is unique  
  axios.get("http://localhost:3000/account")
  .then((response)=>{
    showLoader(false);
    for(let data of response.data){
      if (data.username === username) {
        result.innerHTML = "username " + "<span>" + username + "</span>" + " is already taken";        
        isUnique = false;                
        isSignup = true;
        break;
      }       
    }  
    if(isUnique){
      // get last ID from database
      let lastId = response.data[response.data.length-1].id;                
      // Add new user
      const newId = +lastId + 1;
      showLoader(true);
      axios.post("http://localhost:3000/account",{
        "id": String(newId),
        "name": String(name),
        "mobile": String(mobile),
        "username": String(username),
        "password": String(password)
      })
      .then((response) => {
        showLoader(false);
        if(response.status === 201){
          toast("Your Account has successfully created");
          // result.textContent = "Your Account has successfully created";
          setTimeout(()=>{document.location.reload()},3000);
        } else {
          result.innerHTML = "<span>" + "Error :" + "</span><br>" + response.message + "<br>" + response.config.url;
        }
      }, (reject) => {
        showLoader(false);
        result.innerHTML = "<span>" + "Error :" + "</span><br>" + reject.message + "<br>" + reject.config.url;
        document.getElementById("buttonContainer").style.display="none";
        setTimeout(()=>{document.location.reload()},5000);
      });  
    } 
  })
  .catch((reject)=>{
    showLoader(false);
    result.innerHTML = "<span>" + "Error :" + "</span><br>" + reject.message + "<br>" + reject.config.url;
    document.getElementById("buttonContainer").style.display="none";
    setTimeout(()=>{document.location.reload()},5000);
  });
}  

// ----------------------------------------------- POST2 ------------------------------------------
// make it by async and await and axios
async function post2(name,mobile,username,password){
  showLoader(true);
  const result = document.getElementById("result");
  isUnique = true; //for run again the function, set it again to true  
  try{
    // check the username is unique  
    const datas = await axios.get("http://localhost:3000/account");
    showLoader(false);
    for(let data of datas.data){
      if (data.username === username) {
        result.innerHTML = "username " + "<span>" + username + "</span>" + " is already taken";        
        isUnique = false;                
        isSignup = true;
        break;
      } 
    }
    if(isUnique){
      // get last ID from database
      const lastId = datas.data[datas.data.length-1].id;      
      // Add new user
      const newId = +lastId + 1;
      showLoader(true);
      const post = await axios.post("http://localhost:3000/account",{
        "id": String(newId),
        "name": String(name),
        "mobile": String(mobile),
        "username": String(username),
        "password": String(password)
      });
      showLoader(false);
      if(post.status === 201){
        toast("Your Account has successfully created");
        // result.textContent = "Your Account has successfully created";
        setTimeout(()=>{document.location.reload()},3000);
      } else {
        result.innerHTML = "<span>" + "Error :" + "</span><br>" + response.message + "<br>" + response.config.url;
        setTimeout(()=>{document.location.reload()},5000);
      }      
    }                  
  }
  catch(error){
    showLoader(false);
    result.innerHTML = "<span>" + "Error :" + "</span><br>" + error.message + "<br>";
    setTimeout(()=>{document.location.reload()},5000);
  }
}  

// ----------------------------------------------- POST3 ------------------------------------------
// make it by fetch with async and await
async function post3JSON(data) {
  showLoader(true);
  const result = document.getElementById("result");
  try {
    const response = await fetch("http://localhost:3000/account", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    showLoader(false);

    // const result1 = await response.json();
    if(response.status===201){
      toast("Your Account has successfully created");
      // result.textContent = "Your Account has successfully created";
      document.getElementById("buttonContainer").style.display="none";
      setTimeout(()=>{document.location.reload()},5000);
    } else {
      result.innerHTML = "<span>" + "Error :" + "</span><br>" + response.statusText + "<br>" + response.status + "<br>" + response.url;
      document.getElementById("buttonContainer").style.display="none";
      setTimeout(()=>{document.location.reload()},5000);
    }
  } catch (error) {
    showLoader(false);
    result.innerHTML = "<span>" + "Error :" + "</span><br>" + error.message + "<br>";
    document.getElementById("buttonContainer").style.display="none";
    setTimeout(()=>{document.location.reload()},5000);
  }
}
 
async function post3(name,mobile,username,password){
  showLoader(true);
  const result = document.getElementById("result");
  isUnique = true; //for run again the function, set it again to true  
  try{
    // check the username is unique  
    const accounts = await fetch("http://localhost:3000/account");
    showLoader(false);
    let accountsJson = await accounts.json();          
    for(let account of accountsJson){
      if (account.username === username) {
        result.innerHTML = "username " + "<span>" + username + "</span>" + " is already taken";        
        isUnique = false;                
        isSignup = true;
        break;
      } 
    }
    if(isUnique){
      // get last ID from database
      const lastId = accountsJson[accountsJson.length-1].id;      
      // Add new user
      const newId = +lastId + 1;    
      const data = {
          "id": String(newId),
          "name": String(name),
          "mobile": String(mobile),
          "username": String(username),
          "password": String(password)        
        };
        post3JSON(data);
    }
  }
  catch(error){
    showLoader(false);
    result.innerHTML = "<span>" + "Error :" + "</span><br>" + error.message + "<br>";
    document.getElementById("buttonContainer").style.display="none";
    setTimeout(()=>{document.location.reload()},5000);
  }
}          

// ----------------------------------------------- POST4 ------------------------------------------
// make it by pure fetch 
function post4JSON(data) {
  showLoader(true);
  const result = document.getElementById("result");  
  fetch("http://localhost:3000/account", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((response)=>{
    showLoader(false);
    if(response.status===201){
      toast("Your Account has successfully created");
      // result.textContent = "Your Account has successfully created";
      document.getElementById("buttonContainer").style.display="none";
      setTimeout(()=>{document.location.reload()},5000);
    } else {
      result.innerHTML = "<span>" + "Error :" + "</span><br>" + response.statusText + "<br>" + response.status + "<br>" + response.url;
      document.getElementById("buttonContainer").style.display="none";
      setTimeout(()=>{document.location.reload()},5000);
    }
  })
  .catch((error)=>{
    showLoader(false);
    result.innerHTML = "<span>" + "Error :" + "</span><br>" + error.message + "<br>";
    document.getElementById("buttonContainer").style.display="none";
    setTimeout(()=>{document.location.reload()},5000);
  });
}
 
function post4(name,mobile,username,password){
  showLoader(true);
  const result = document.getElementById("result");
  isUnique = true; //for run again the function, set it again to true  
    // check the username is unique  
  fetch("http://localhost:3000/account")
  .then((response)=> response.json())
  .then((accountsJson) => {
    showLoader(false);
    for(let account of accountsJson){
      if (account.username === username) {
        result.innerHTML = "username " + "<span>" + username + "</span>" + " is already taken";        
        isUnique = false;                
        isSignup = true;
        break;
      } 
    }
    if(isUnique){
      // get last ID from database
      const lastId = accountsJson[accountsJson.length-1].id;      
      // Add new user
      const newId = +lastId + 1;    
      const data = {
        "id": String(newId),
        "name": String(name),
        "mobile": String(mobile),
        "username": String(username),
        "password": String(password)        
        };
      post4JSON(data);
    }
  })
  .catch((error)=>{
    showLoader(false);
    result.innerHTML = "<span>" + "Error :" + "</span><br>" + error.message + "<br>";
    document.getElementById("buttonContainer").style.display="none";
    setTimeout(()=>{document.location.reload()},5000);
  });  
}        

// ----------------------------------------------- Sign up ------------------------------------------
function signup(){  
  const loginHeader = document.getElementById("loginHeader");
  const username = document.getElementById("username");  
  const password = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");      
  const loginContainer = document.getElementById("loginContainer");
  // run if the first time click on "Create account" button, after that this button change name to "Sign up"
  if (!isSignup){
    isSignup = true;
    username.value = ""  ;
    password.value = ""  ;    
    // add 2 input element for name and mobile number
    let nameInput = document.createElement("input");
    let mobileInput = document.createElement("input");
    nameInput.className="inputText";
    nameInput.id="name";
    nameInput.placeholder="Name and Family";
    nameInput.setAttribute("autocomplete","off");
    mobileInput.className="inputText";
    mobileInput.id="mobile";
    mobileInput.placeholder="Mobile Number";  
    mobileInput.setAttribute("autocomplete","off");
    loginContainer.insertBefore(mobileInput,username);
    let mobile = document.getElementById("mobile");    
    loginContainer.insertBefore(nameInput,mobile);
    loginBtn.style.display = "none" ;
    loginHeader.textContent = "Create New Account";
    signupBtn.textContent = "Sign up";
    // hide "sign up" button so that the user completes all the Items first.
    document.getElementById("buttonContainer").style.visibility="hidden";
    document.getElementById("result").textContent = "Complete all the Items to create an Account";

    // AddEventListener for validate
    document.getElementById("name").addEventListener("keyup",function(e){validate(e)});
    mobile.addEventListener("keyup",function(e){validate(e)});
    username.addEventListener("keyup",function(e){validate(e)});
    password.addEventListener("keyup",function(e){validate(e)});        

    // wait for select post method
    showCreateNewAccount(2);
    
    // click on "sign up" button after that select the Post Method
  } else if (isSignup){
    isSignup = false;
    const name = document.getElementById("name");
    const mobile = document.getElementById("mobile");
    switch (postMethod){
      case 1:
        post1(name.value.trim(),mobile.value.trim(),username.value.trim(),password.value.trim());
        break;
      case 2:
        post2(name.value.trim(),mobile.value.trim(),username.value.trim(),password.value.trim());
        break;
      case 3:
        post3(name.value.trim(),mobile.value.trim(),username.value.trim(),password.value.trim());
        break;
      case 4:
        post4(name.value.trim(),mobile.value.trim(),username.value.trim(),password.value.trim());
    }
  } 
}

// ---------------------------------------- Validate ------------------------------------------------
function validate(element){  
  if(element.target.id === "name"){
    if(element.target.value.length===0){
      validateName = false;      
      document.getElementById("buttonContainer").style.visibility="hidden";
      document.getElementById("result").textContent = "Complete all the Items to create an Account";
    } else {
      validateName = true;
    };
  }
  if(element.target.id === "mobile"){
    if(element.target.value.length===0){
      validateMobile = false;
      document.getElementById("buttonContainer").style.visibility="hidden";
      document.getElementById("result").textContent = "Complete all the Items to create an Account";
    } else {
      const mobileRegExp = /^\d+$/; // Just Numbers Allowed
      if(element.target.value.match(mobileRegExp)){
        element.target.style.backgroundColor = "";
        validateMobile = true;
      } else {
        validateMobile = false;
        element.target.style.backgroundColor = "red";
        document.getElementById("buttonContainer").style.visibility="hidden";
        document.getElementById("result").textContent = "Just Numbers are Allowed";
      }         
    };
  }
  if(element.target.id === "username"){
    if(element.target.value.length===0){
      validateUsername = false;
      document.getElementById("buttonContainer").style.visibility="hidden";
      document.getElementById("result").textContent = "Complete all the Items to create an Account";
    } else {
      const mailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
      if(element.target.value.match(mailRegExp)){
        element.target.style.backgroundColor = "";
        validateUsername = true;
      } else {
        validateUsername = false;
        element.target.style.backgroundColor = "red";
        document.getElementById("buttonContainer").style.visibility="hidden";
        document.getElementById("result").innerHTML = "Your username must be a Valid e-mail Address";      
      }
    };
  }
  if(element.target.id === "password"){
    if(element.target.value.length===0){
      validatePassword = false;      
      document.getElementById("buttonContainer").style.visibility="hidden";
      document.getElementById("result").textContent = "Complete all the Items to create an Account";
    } else {
      const passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/g ;
      if(element.target.value.match(passRegExp)){
        element.target.style.backgroundColor = "";
        validatePassword = true;
      } else {
        validatePassword = false; 
        element.target.style.backgroundColor = "red";
        document.getElementById("buttonContainer").style.visibility="hidden";
        document.getElementById("result").innerHTML = "Your password must have at least 8 characters,"+ "<br>"
                    +"at least an upper case letter, an lowercase letter, a number and a symbol";
      }      
    };
  }
  if(validateName && validateMobile && validateUsername && validatePassword){
    document.getElementById("buttonContainer").style.visibility="visible";
    document.getElementById("result").textContent = "";
  }  
}

// --------------------------- Cookie ---------------------------------------------
function createLoginCookie(username,password){
  // The setTime() method sets a date and time by adding or subtracting 
  // a specified number of milliseconds to/from midnight January 1, 1970.
  // getTime() , Calculate the number of years since January 1, 1970:
  const d = new Date();
  d.setTime(d.getTime() + (24*60*60*1000)); // set time to 24 hours later
  let expires = d.toUTCString();
  let passwordEncode = encode(password);
  document.cookie = `username=${username}; expires=${expires};path=/assets/jsClass`;
  document.cookie = `password=${passwordEncode}; expires=${expires};path=/assets/jsClass`;  
}
function getLoginCookie(){
  let user = {};
  const cookie = document.cookie;  
  const c1 = cookie.split(";");
  for(let c of c1){    
    if(c.includes("username=")){
      user.username = c.split("=")[1];
    }
    if(c.includes("password=")){
      let passwordEncode = c.split("=")[1];     
      user.password = decode(passwordEncode);
    }
  }
  return user;
}
// --------------------- check Cookie ---------------------
function checkCookieStatus(){  
  const user = getLoginCookie();
  if(user.username){
    document.getElementById("username").value = user.username;
    document.getElementById("password").value = user.password;
    setTimeout(login,500);
  } 
}
// ------------------------------------------ Encryption ----------------------------
function encode(text){  
  let length = text.length;
  let output;  
  for(let i=0;i<length;i++){        
    if(output) output += String.fromCharCode(+(text.charCodeAt(i)) + 1);
    else output = String.fromCharCode(+(text.charCodeAt(i)) + 1);
  }
  return output;
}
function decode(text){  
  let length = text.length;
  let output;  
  for(let i=0;i<length;i++){        
    if(output) output += String.fromCharCode(+(text.charCodeAt(i)) - 1);
    else output = String.fromCharCode(+(text.charCodeAt(i)) - 1);
  }
  return output;
}