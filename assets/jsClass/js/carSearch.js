"use strict";
let isAscendingSort = true;
let searchCategory = "company";
let lastElement ;
const cars = [
  {company : "Toyota"  , model : "Corolla" , color : "Blue"   , capacity : "4" , price : "22000$" , year : "2018" , gear : "Automatic" , fuel : "Gas"},
  {company : "Benz"    , model : "S500"    , color : "Black"  , capacity : "4" , price : "35000$" , year : "2023" , gear : "Automatic" , fuel : "Hybrid"},
  {company : "Ford"    , model : "Mustang" , color : "Silver" , capacity : "2" , price : "45000$" , year : "2002" , gear : "manual"    , fuel : "Gas"},
  {company : "Ferrari" , model : "Enzo"    , color : "Yellow" , capacity : "2" , price : "80000$" , year : "2011" , gear : "Automatic" , fuel : "Gas"},
  {company : "Fiat"    , model : "Panda"   , color : "White"  , capacity : "2" , price : "12000$" , year : "2016" , gear : "Automatic" , fuel : "Gas"},
  {company : "BMW"     , model : "X4"      , color : "Black"  , capacity : "4" , price : "32000$" , year : "2013" , gear : "Automatic" , fuel : "Gas"},
  {company : "Ford"    , model : "Shelby"  , color : "Red"    , capacity : "2" , price : "57000$" , year : "1970" , gear : "Automatic" , fuel : "Gas"},    
  {company : "BMW"     , model : "X6"      , color : "Black"  , capacity : "6" , price : "33000$" , year : "2016" , gear : "Automatic" , fuel : "Gas"},
  {company : "Honda"   , model : "Civic"   , color : "White"  , capacity : "4" , price : "27000$" , year : "2022" , gear : "Automatic" , fuel : "Gas"},
  {company : "BMW"     , model : "760Li"   , color : "Black"  , capacity : "4" , price : "41000$" , year : "2023" , gear : "Automatic" , fuel : "Hybrid"},
];

function showCars(cars) {
  let listParent = document.getElementById("list");
  let td, tr; // table tags
  for (let car of cars) {
    tr = document.createElement("tr");
    for (let property in car) {
      td = document.createElement("td");
      td.textContent = car[property];
      tr.appendChild(td);
    }
    listParent.appendChild(tr);
  }
}

function remove(){  
  let tableRows = document.querySelectorAll("tr");
  let tableHeader = document.querySelectorAll("#tableHeader");  
  for (let tableRow of tableRows){
    if(tableRow != tableHeader[0]) tableRow.remove();
  }
}

function setSearchCategory(category,element){  
  searchCategory = category;
  let searchbar = document.getElementById("searchbar");
  if(lastElement) lastElement.classList.toggle("selectTh");
  element.classList.toggle("selectTh");
  lastElement = element;    
  searchbar.value = "";
  remove();
  showCars(cars);
  searchbar.setAttribute("placeholder",`Search on ${category}`);
}

function search(category = searchCategory) {
  let result = [];
  const searchItem = document.getElementById("searchbar").value.toLowerCase();  
  for (let car of cars) {    
    if (car[category].toLowerCase().includes(searchItem)){      
      result.push(car);
    }
  }
  remove();
  showCars(result);
}

function sortPrice() {
  let searchbar = document.getElementById("searchbar");
  searchbar.value = "";
  let priceArrow = document.getElementById("priceBtn");
  if(isAscendingSort){
    isAscendingSort = false;
    priceArrow.innerHTML = "Price Sort &uarr;"
    //ascending order
    cars.sort((car1, car2) => {
      if (car1.price < car2.price) return 1;
      else if (car1.price > car2.price) return -1;
      else return 0;
    //  (car1.price < car2.price) ? 1 : (car1.price > car2.price) ? -1 : 0);
    })
  }else{
    isAscendingSort = true;
    priceArrow.innerHTML = "Price Sort &darr;"
    //descending order
    cars.sort((car1, car2) => {
      if (car1.price > car2.price) return 1;
      else if (car1.price < car2.price) return -1;
      else return 0;
    })
  }
  remove();
  showCars(cars);  
}