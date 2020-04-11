// Map
var mymap;

// Markers
var markers;

// Select Locations
var locations;

// To execute on boot
init();
function init(){
  eq = false;
  mymap = L.map('mapdiv').setView([40, -9], 6);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoieGFja2EiLCJhIjoiY2s4bHc3NWo3MDVteTNsbzd4cTloZDRzNyJ9.k47kNQJQNpoyZQOlD3Rozg'
      }).addTo(mymap);

  markers = [
    [40.62, -8.748, 'Av. José Estêvão'],
    [40.6268, -8.732, 'A25']
  ];

  locations = ['A25'];
}

// ----------------------------------- Leaflet ------------------------------------------- https://leafletjs.com/examples/quick-start/
// Update map div
function getMap(arg1){
  getEquipment();  // Temp
  destroyMap();
  var id1 = document.getElementById(arg1);
  if(id1.value == "aveiro"){
      mymap = L.map('mapdiv').setView([40.61771, -8.75], 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 15,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoieGFja2EiLCJhIjoiY2s4bHc3NWo3MDVteTNsbzd4cTloZDRzNyJ9.k47kNQJQNpoyZQOlD3Rozg'
      }).addTo(mymap);
      addMarkers();
  }
}

// Adds Markers to map
function addMarkers(){
  var markerIcon = L.icon({
        iconUrl: 'Images/marker.png',
        iconSize:     [25, 30],
        iconAnchor:   [25, 30],
      });

  for (i = 0; i < markers.length; i++) {
    var buttonID = "buttonMarker" +i;
    L.marker([markers[i][0], markers[i][1]], {icon: markerIcon}).addTo(mymap).bindPopup("<center><b>" +markers[i][2] +"</b><br><button id= \"" +buttonID +"\" onclick='getEquipment(\"" +markers[i][2] +"\"); changeText(this.id);'>Select</button></center>");
  }
}

// When pressing a map popup button
function getEquipment(eqName){
  document.getElementById("dateinput").disabled=false;
  showEquip();
  // Selects or deselects a equipment
  if(locations.includes(eqName)){
    removeEquipment(eqName);
  }
  else{
    addEquipment(eqName);
  }

  // Writes on the app page
  var names = " Equipment: ";
  for (i = 0; i < locations.length; i++){
    if(i == 0)
      names = names.concat(locations[i]);
    else 
      names = names.concat(", " +locations[i]);
  }
  document.getElementById("equip").innerHTML=("<span class='fa-stack'><span class='fa fa-circle-o fa-stack-2x'></span><strong class='fa-stack-1x fa fa-camera'></strong></span></i>" +names);
}

function changeText(arg1){
  if(document.getElementById(arg1).innerHTML == "Select")
    document.getElementById(arg1).innerHTML="Deselect";
  else
    document.getElementById(arg1).innerHTML="Select";
}

// Adds Equipment to locations
function addEquipment(eqName){
  locations.push(eqName)
  locations = removeEmptyElements(locations);
  locations = removeDuplicates(locations);
}

// Removes Equipment to locations
function removeEquipment(eqName){
  const index = locations.indexOf(eqName);
  if (index > -1) {
    locations.splice(index, 1);
  }
}

// Destroys mymap
function destroyMap(){
  mymap.off();
  mymap.remove();
}
