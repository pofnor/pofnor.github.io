function cat(){  
  let i=0;
  while(i<1000){
    let parent = document.getElementById("cat");
    let cat = document.createElement("img");
    cat.src = "img/Cat.webp";
    cat.width = "150";
    cat.height = "150";
    cat.alt = "Cat"
    
    cat.addEventListener("mouseover",function(e){
      let random = Math.floor(Math.random()*5)+1;
      switch(random){
        case 1:
          this.width = "160";
          this.height = "160";
          break;
        case 2:
          this.width = "130";
          this.height = "130";
          break;
        case 3:
          this.width = "180";
          this.height = "180";
          break;
        case 4:
          this.width = "200";
          this.height = "200";
          break;
        case 5:
          this.style.display = "none";          
      }
    });    
    let random = Math.floor(Math.random()*3)+1;
    cat.setAttribute("data-wow-delay",`${random}s`);
    cat.setAttribute("data-wow-duration","1s");
    switch(random){
      case 1:
        cat.className = "wow animate__flash";          
        break;
      case 2:
        cat.className = "wow animate__bounce";          
        break;
      case 3:
        cat.className = "wow animate__heartBeat";          
    }      
    parent.appendChild(cat);    
    i += 1;    
  }
}