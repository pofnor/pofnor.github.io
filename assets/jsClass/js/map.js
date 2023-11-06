let isMarker = false;
let isCircle = false;

function showMap(){
  const map = L.map('map').setView([35.714183, 51.365204], 11);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,    
    }).addTo(map);

    // const marker = L.marker([35.678494, 51.306839]).addTo(map);

    // const circle = L.circle([35.695504, 51.469917], {
    // color: 'red',
    // fillColor: '#f03',
    // fillOpacity: 0.5,
    // radius: 500
    // }).addTo(map);

    // var polygon = L.polygon([
    // [35.769079, 51.345978],
    // [35.769079, 51.38855],
    // [35.74902, 51.384773]
    // ]).addTo(map);

    // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    // circle.bindPopup("I am a circle.");
    // polygon.bindPopup("I am a polygon.");

    const popup = L.popup();

    function onMapClick(e) {           
      showLoader1(true);
      axios.get(`https://geocode.maps.co/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
      .then((response) => {
        showLoader1(false);
        document.getElementById("address").innerHTML = "Latitude: " + e.latlng.lat + 
        "<br>Longitude: " + e.latlng.lng +
        "<br>Address = " + response.data.display_name;
      })
      .catch(error=>{
        showLoader1(false);
        document.getElementById("address").textContent = "Error=" + error.message ;
      });
      if(isMarker){        
        let m = L.marker([e.latlng.lat,e.latlng.lng]).addTo(map);
        m.bindPopup(e.latlng.toString());        
      }
      if(isCircle){
        let c = L.circle([e.latlng.lat,e.latlng.lng], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
          }).addTo(map);          
        c.bindPopup(e.latlng.toString());
      } else {      
      popup
        .setLatLng(e.latlng) 
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    }
  }

    map.on('click', onMapClick);

    // https://geocode.maps.co/reverse?lat=35.648927&lon=51.366583
}

// --------------- Client Location -----------------------
function getLocation() { 
  if (navigator.geolocation) {
    showLoader2(true);
    navigator.geolocation.getCurrentPosition(showPosition,showError);
  } else { 
    document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
  }
}
    
function showPosition(position) {
  showLoader2(false);
  document.getElementById("location").innerHTML="Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
}
function showError(error) {
  showLoader2(false);
  switch(error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById("location").innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById("location").innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      document.getElementById("location").innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById("location").innerHTML = "An unknown error occurred."
      break;
  }
}

// --------------------- Hide and Show Loader ------------------------------------------------------
function showLoader1(isShow){
  if(isShow) document.getElementById("loader1").style.display="block"; // Show Loader
  else document.getElementById("loader1").style.display="none"; // Hide Loader
}
function showLoader2(isShow){
  if(isShow) document.getElementById("loader2").style.display="block"; // Show Loader
  else document.getElementById("loader2").style.display="none"; // Hide Loader
}

// --------------------- Map Marker ------------------------------------------------------
function marker(){
  document.getElementById("marker").style.fontSize = "22px";
  document.getElementById("circle").style.fontSize = "16px";
  isMarker = true;
  isCircle = false;
}
function circle(){
  document.getElementById("circle").style.fontSize = "22px";
  document.getElementById("marker").style.fontSize = "16px";
  isCircle = true;
  isMarker = false;
}