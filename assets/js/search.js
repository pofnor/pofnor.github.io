"use strict";

let indexDBKeyword;
let indexDB;
let isExactSearchMethod = true; //
axiosJsonDB();
// fetchIndexDB(); //  Old function that works by fetch

function searchMethod(method){
  if(method==="Exact") {
    isExactSearchMethod=true;
    document.getElementById("exact").style.fontSize = "22px";
    document.getElementById("anywhere").style.fontSize = "16px";
  }
  if(method==="Anywhere") {
    isExactSearchMethod=false;  
    document.getElementById("anywhere").style.fontSize = "22px";
    document.getElementById("exact").style.fontSize = "16px";
  }
}

async function axiosJsonDB(){
  try{
    let response = await axios.get('http://localhost:3000/indexDB');    
    if (response.status === 200) {
      loaderStatus(true);
      let indexDataBase = response.data;
      // make a new object without keywords
      indexDB = convertKeywordsToKeyword(indexDataBase);
      const indexDBKey = indexDB.map(value => value.keyword);
      /// new set to remove duplicate and again convert to array by ...
      indexDBKeyword = [...new Set(indexDBKey)];
      document.getElementById("searchbar").addEventListener("keyup",function(e){search(indexDB)});      
      autocomplete(document.getElementById("searchbar"), indexDBKeyword);      
    } else {    
      loaderStatus(false,`${response.statusText} (${response.status})`);    
    }  
  }
catch{
  const errorMessage = "Can't Find the 'http://localhost:3000/indexDB'<br>"+
    "Please goto 'node_modules\\.bin'<br>"+
    "and"+
    "<br>run 'json-server --watch ..\\..\\assets\\DB\\jsonDB.json' ";
  loaderStatus(false,errorMessage);
  }
}

//  Old function that works by fetch
// async function fetchIndexDB(){
//   try{
//     let response = await fetch('http://localhost:3000/indexDB');    
//     if (response.status === 200) {
//       loaderStatus(true);
//       let indexDataBase = await response.json(); 
//       // make a new object without keywords
//       indexDB = convertKeywordsToKeyword(indexDataBase);
//       const indexDBKey = indexDB.map(value => value.keyword);
//       /// new set to remove duplicate and again convert to array by ...
//       indexDBKeyword = [...new Set(indexDBKey)];
//       document.getElementById("searchbar").addEventListener("keyup",function(e){search(indexDB)});      
//       autocomplete(document.getElementById("searchbar"), indexDBKeyword);      
//     } else {    
//       loaderStatus(false,`${response.statusText} (${response.status})`);    
//     }  
//   }
// catch{
//   const errorMessage = "Can't Find the 'http://localhost:3000/indexDB'<br>"+
//     "Please goto 'node_modules\\.bin'<br>"+
//     "and"+
//     "<br>run 'json-server --watch ..\\..\\assets\\DB\\jsonDB.json' ";
//   loaderStatus(false,errorMessage);
//   }
// }

// ability to use multi words as keywords at indexDB
function convertKeywordsToKeyword(indexDB){
  let resultDB = [];  
  for(let item of indexDB){
    if(item.keyword.includes(",")){
      let keywords = item.keyword.split(",");      
      for(let key of keywords){
        let tempObj = {};
        tempObj.keyword = key;
        tempObj.href = item.href;
        tempObj.description = item.description;
        resultDB.push(tempObj);
      }      
    } else {
      resultDB.push(item);
    }
  }
  return resultDB;
}

function loaderStatus(status,statusText) {
  if(status){
    document.getElementById('loader').style.display = 'none';
  } else {
    document.getElementById('loaderIcon').style.display = 'none';
    document.getElementById('loaderText').innerHTML = statusText;
  }
}

function remove(){  
  let elements = document.querySelectorAll("article.exercise");
  for (let element of elements){
    element.remove();
  }
}

function search(indexDB) {    
  const searchItem = document.getElementById("searchbar").value.toLowerCase();   
  let resultItems = searchItem.split("&");  
  let match = [];  
  for(let resultItem of resultItems){
    for(let index of indexDB){
      if(resultItem.toLowerCase().trim() === index.keyword.toLowerCase()){        
        match.push(index);
      }
    }
  }  
  remove(); //remove all previous elements that contain from last search
  for(let matchItem of match){    
    let section = document.getElementById("result");
    let article = document.createElement("article");      
    let a = document.createElement("a");
    a.className = "a";
    a.id = matchItem.keyword;
    a.setAttribute("href",matchItem.href);      
    a.innerHTML = matchItem.description;      
    article.className = "exercise";
    article.appendChild(a);
    section.appendChild(article);      
  }  
}

function autocomplete(searchbarElement, indexDBKeyword) {
  /*the autocomplete function takes two arguments,
  the search field element and an indexDBKeyword(array) of possible autocompleted values:*/
  let currentFocus;  
  /*execute a function when someone writes in the search field:*/
  searchbarElement.addEventListener("input", function(e) {      
    let searchText = this.value;
    let autocompleteItem, matchingItem;
    /*close any already open lists of autocompleted values*/
    closeAllLists();      
    if (!searchText) { return false;}
    currentFocus = -1;
    /*create a Section element that will contain the searchText(values):*/
    autocompleteItem = document.createElement("section");      
    autocompleteItem.setAttribute("id", this.id + "autocomplete-list");
    autocompleteItem.setAttribute("class", "autocomplete-items");
    /*append the Section element as a child of the autocomplete container:*/
    this.parentNode.appendChild(autocompleteItem);
    /*for each item in the indexDBKeyword(array)...*/
    for (let keyword of indexDBKeyword) {
      if(isExactSearchMethod){
        /*check if the item starts with the same letters as the search field value:*/
        if (keyword.substr(0, searchText.length).toUpperCase() === searchText.toUpperCase()) {          
          /*create a DIV element for each matching element:*/
          matchingItem = document.createElement("DIV");
          /*make the matching letters bold:*/
          matchingItem.innerHTML = "<strong>" + keyword.substr(0, searchText.length) + "</strong>";
          matchingItem.innerHTML += keyword.substr(searchText.length);          
          /*insert a input field that will hold the current indexDBKeyword(array) item's value:*/          
          matchingItem.innerHTML += "<input type='hidden' value='" + keyword + "'>";          
          /*execute a function when someone clicks on the matchingItem (DIV element):*/
          matchingItem.addEventListener("click", function(e) {
          /*insert the value for the autocomplete search field:*/          
          searchbarElement.value = this.getElementsByTagName("input")[0].value;
          search(indexDB); //run search for fixed the click problem and show the result
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();              
          });
          autocompleteItem.appendChild(matchingItem);
        }
      } else { //Anywhere search method
        /*check if the item contains with the same letters as the search field value:*/
        if (keyword.toLowerCase().includes(searchText.toLowerCase())) {          
          /*create a DIV element for each matching element:*/
          matchingItem = document.createElement("DIV");          
          matchingItem.innerHTML = keyword;          
          matchingItem.innerHTML += "<input type='hidden' value='" + keyword + "'>";          
          /*execute a function when someone clicks on the matchingItem (DIV element):*/
          matchingItem.addEventListener("click", function(e) {
          /*insert the value for the autocomplete search field:*/          
          searchbarElement.value = this.getElementsByTagName("input")[0].value;
          search(indexDB); //run search for fixed the click problem and show the result
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();              
          });
          autocompleteItem.appendChild(matchingItem);
        }
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  searchbarElement.addEventListener("keydown", function(e) {
    let autocompleteItem = document.getElementById(this.id + "autocomplete-list");      
    let matchingItems;
    if (autocompleteItem) matchingItems = autocompleteItem.getElementsByTagName("div");      
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed, increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/        
      addActive(matchingItems);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(matchingItems);
    } else if (e.keyCode == 13) {  //Enter key
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (matchingItems) matchingItems[currentFocus].click();
      }
    }
  });
  function addActive(matchingItems) {
    /*a function to classify an item as "active":*/
    if (!matchingItems) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(matchingItems);    
    if (currentFocus >= matchingItems.length) currentFocus = 0; //Rotate active item from down
    if (currentFocus < 0) currentFocus = (matchingItems.length - 1); //Rotate active item from top
    /*add class "autocomplete-active":*/
    matchingItems[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(matchingItems) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (let matchingItem of matchingItems) {
      matchingItem.classList.remove("autocomplete-active");      
    }
  }
  function closeAllLists(element) {    
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    let autocompleteItems = document.getElementsByClassName("autocomplete-items");        
    for (let autocompleteItem of autocompleteItems) {
      autocompleteItem.remove();
      // if (element != autocompleteItem && element != searchbarElement) {        
      //   autocompleteItem.parentNode.removeChild(autocompleteItem);
      // }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}