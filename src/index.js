import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import './style.css';
import image from "./images/icon-location.svg";

 
const map = L.map('mapid', {
  center: [37.7749, -122.4194],
   zoom: 13
 });
const mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; ' + mapLink,
  maxZoom: 18}).addTo(map);
map.locate({setView:true}).on("locationfound", function(){
  sendData(); 
});
const myIcon = L.icon({
  iconUrl: image
});
let marker = L.marker([37.7749, -122.4194], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500.,
  icon:myIcon
}).addTo(map);
 
 

function sendData() {
      const XHR = new XMLHttpRequest();
      let query = document.getElementById("ip");
      const FD = new FormData( form );
      
      XHR.addEventListener("load", function(event) {
        const info = JSON.parse(event.target.responseText);
        rerender(info.lat, info.lon);
        setTable(info);
      } );
  
      XHR.addEventListener( "error", function( event ) {
        throw new Error( 'Oops! Something went wrong.' );
      } );
  
      if(query.value.length !== 0){
        XHR.open( "GET", `http://ip-api.com/json/${query.value}`);
     }
      else{
        XHR.open( "GET", `http://ip-api.com/json/`);
    }
      XHR.send( FD );
      query.value = '';
    }
function rerender(arg1, arg2){
  map.setView([arg1, arg2]);
  marker.setLatLng([arg1, arg2]).update();
}
const form = document.getElementById( "myForm" );
  
form.addEventListener( "submit", function ( event ) {
    event.preventDefault();
    sendData();
    
  } );

function setTable(info){
      const {city, country, isp, timezone, query} = info;
      const proba = document.querySelectorAll('.table p');
      proba[0].innerHTML = `${query}`;
      proba[1].innerHTML = `${city}, ${country}`;
      proba[2].innerHTML = `${timezone}`;
      proba[3].innerHTML = `${isp}`;   
    } 
window.onload = () => {
  sendData();
};