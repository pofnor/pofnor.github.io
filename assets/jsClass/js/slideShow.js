let slideIndex = 1;
let isAutoSlide = false; // Auto Show Status

let slideSource = [
  {
    src : "img/shakira-healing.jpg",    
    caption : "Shakira Is Making New Music, Healing",
    modal : "Global pop superstar Shakira’s unique blend of Latin pop music infused with the dance moves of her Arabic heritage has blazed a trail in the music industry, bringing joy to millions of her fans around the world and heralding the boom in Latin music.",
    modalText : "More...",
    link : "https://www.elle.com/culture/celebrities/a41296977/shakira-elle-digital-cover-october-2022",
    linkText : "Read News"    
  },
  {
    isVideo : true,
    src : "video/TAYLOR-SWIFT-THE-ERAS-TOUR-Concert.mp4",
    poster : "img/taylor-swift-ErasTour.webp",
    caption : "Taylor Swift 'The Eras Tour'",
    modal : "The Eras Tour is the ongoing sixth concert tour by American singer-songwriter Taylor Swift, who described it as a journey through all of her musical 'eras'. An homage to her albums, the Eras Tour is her most expansive tour yet, with 146 dates across five continents.It is her second all-stadium tour after the 2018 Reputation Stadium Tour.",
    modalText : "More...",
    link : "https://www.taylorswift.com/tour-us",
    linkText : "Buy Ticket"    
  },  
  {
    src : "img/AGT2023.jpg",    
    caption : "America's Got Talent 2023",
    modal : "It showcases winners, finalists, fan favorites, and viral sensations from previous seasons of the mothership series to return to the stage to compete for the All-Star title.",
    modalText : "More...",
    link : "https://www.nbc.com/americas-got-talent",
    linkText : "Vote"        
  }
];

// ---------------------------------- Main Function -----------------------------------------
function makeSlides(slideSource,autoSlide){    
  for(let i=0;i<slideSource.length;i++){    
    createSlide(slideSource[i],i+1,slideSource.length);    
  }
  if(autoSlide) isAutoSlide = true;  
  showSlides(slideIndex);
}

// create slide
function createSlide(slide,number,total){  
  // Remove Next and Prev icon and Dot, when we have one slide  
  if(total === 1) {
    document.getElementsByClassName("prev")[0].style.display="none";
    document.getElementsByClassName("next")[0].style.display="none";    
    document.getElementById("dotContainer").style.display="none";
  }
  const parent = document.getElementsByClassName("slideshow")[0];
  const divContainer = document.createElement("div");
  divContainer.className ="Slides fade";  
  // Don't Create slideNumber when we have one slide  
  if(total != 1) {
    const slideNumber = document.createElement("div");
    slideNumber.className = "slideNumber";
    slideNumber.textContent = `${number}/${total}`;
    divContainer.appendChild(slideNumber);
  }  
  if(slide.isVideo){
    const video = document.createElement("video");
    video.className = "slideImage";    
    video.setAttribute("poster",slide.poster);    
    video.loop = true;
    video.autoplay = true;
    video.muted = true;
    video.src = slide.src;
    video.textContent = "Your browser does not support the video tag.";
    divContainer.appendChild(video);
  } else {
    const image = document.createElement("img");
    image.className="slideImage";
    image.src = slide.src;
    image.alt = slide.caption;
    divContainer.appendChild(image);
  }  
  if(slide.caption){
    const caption = document.createElement("div");
    caption.className = "slideCaption";
    caption.textContent = slide.caption;
    divContainer.appendChild(caption);
  }
  if(slide.modal){
    const modal = document.createElement("div");
    modal.className = "btnSlide";
    modal.textContent = slide.modalText;
    modal.onclick = function(e){showModal(slide.modal);};
    divContainer.appendChild(modal);
  }
  if(slide.link){
    const link = document.createElement("div");
    link.className = "btnSlideHref";
    link.textContent = slide.linkText;
    link.onclick = function(e){document.location.href = slide.link;};
    divContainer.appendChild(link);
  }
  parent.appendChild(divContainer);

  // create dot
  const dotParent = document.getElementById("dotContainer");
  const dot = document.createElement("span");
  dot.className = "dot";
  dot.onclick = function(e){currentSlide(number)};
  dotParent.appendChild(dot);
}

// Modal
function showModal(text){
  let modal = document.getElementsByClassName("modal")[0];
  let closeButton = document.getElementsByClassName("modalClose")[0];
  let modalText = document.getElementById("modalText");  
  modalText.textContent = text; 
  modal.style.display = "block";
  // When the user clicks on <span> (x), close the modal
  closeButton.addEventListener("click",function(e){
    modal.style.display = "none";
  });  
}

// ---------------------- Navigate Slides  ---------------------- 

// Next/previous controls
function plusSlides(n) {  
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {  
  showSlides(slideIndex = n);
}

function showSlides(n) {  
  let slides = document.getElementsByClassName("Slides");  
  let dots = document.getElementsByClassName("dot");  
  
  // Rotate
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  // Hide All Slide
  for (let slide of slides){
    slide.style.display = "none";
  }
  for (let dot of dots) {
    dot.className = dot.className.replace(" dotActive", "");
  }

  // Show the Selected Slide
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " dotActive";  
  // Auto Rotate SlideShow
  if(isAutoSlide){
    setTimeout(()=>{plusSlides(1);},3000);
  }
}