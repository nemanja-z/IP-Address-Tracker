import L from 'leaflet';
import "leaflet/dist/leaflet.css";

//const submit = document.querySelector("button[type='submit']");
const map = L.map("mapid").locate({setView:true});
let marker;
let data;
map.on("locationfound", function(e){
  e.preventDefault();
  mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; ' + mapLink,
    maxZoom: 18}).addTo(map);
    sendData();
    onMapClick(e);
    setTable();})
const myIcon = L.icon({
        iconUrl: './images/icon-location.svg'
    }); 



function onMapClick(e) {
  e.preventDefault();
    if(marker){
      map.removeLayer(marker);
    }
    marker = L.marker(e.latlng, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500.,
    icon:myIcon
  }).addTo(map);
  }  
function sendData() {
      const XHR = new XMLHttpRequest();
      let query = document.getElementById("ip");
      const FD = new FormData( form );
      
      XHR.addEventListener("load", function(event) {
        data = JSON.parse(event.target.responseText);
        setTable();
      } );
  
      XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
      } );
  
      if(typeof query.value == 'number'){
          XHR.open( "GET", `https://geo.ipify.org/api/v1?apiKey=at_EHkOXZQFBC9SOWA1lSMu0lNDIeeO8&ipAddress=${query.value}`);
      }
      else if(query.value.length !== 0){
      XHR.open( "GET", `https://geo.ipify.org/api/v1?apiKey=at_EHkOXZQFBC9SOWA1lSMu0lNDIeeO8&domain=${query.value}`);
     }
     else{
      XHR.open( "GET", `https://geo.ipify.org/api/v1?apiKey=at_EHkOXZQFBC9SOWA1lSMu0lNDIeeO8`);
    }
      XHR.send( FD );
      query.value = '';
    }
   
    const form = document.getElementById( "myForm" );
  
    form.addEventListener( "submit", function ( event ) {
      event.preventDefault();
  
      sendData();
    } );
function setTable(){
      const {location, isp} = data;
      const id = Object.values(data)[0];
      const table = document.querySelector("tbody");
      const secondRow = document.querySelector("tr").nextSibling;
      if(secondRow){
        secondRow.remove();
      }
      const row= document.createElement("tr");
      row.innerHTML =  `<td style="text-align:center; border-right: 1px solid #ccc;"><strong>${id}</strong></td>
                        <td style="text-align:center; border-right: 1px solid #ccc;"><strong>${location.city}, ${location.country}</strong></td>
                        <td style="text-align:center; border-right: 1px solid #ccc;"><strong>${location.timezone}</strong></td>
                        <td style="text-align:center; border-right: 1px solid #ccc;"><strong>${isp}</strong></td>`
      
      table.appendChild(row);               
    }
window.onload = (e) => {
  sendData();
  onMapClick(e);
};



map.on('click', onMapClick);