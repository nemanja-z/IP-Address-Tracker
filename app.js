
const submit = document.querySelector("button[type='submit']");
const map = L.map("mapid").locate({setView:true});
mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
	L.tileLayer(
	    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; ' + mapLink,
	    maxZoom: 18
        }).addTo(map); 
  const myIcon = L.icon({
          iconUrl: './images/icon-location.svg'
      });

let marker;
let data;
function onMapClick(e) {
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
        const data = JSON.parse(event.target.responseText);
        const {location, isp} = data;
        const id = Object.values(data)[0];
        const table = document.querySelector("tbody");
        const row= document.createElement("tr");
        row.innerHTML =  `<td style="text-align:center; border-right: 1px solid #ccc;"><strong>${id}</strong></td>
                          <td style="text-align:center; border-right: 1px solid #ccc;"><strong>${location.city}, ${location.country}</strong></td>
                          <td style="text-align:center; border-right: 1px solid #ccc;"><strong>${location.timezone}</strong></td>
                          <td style="text-align:center; border-right: 1px solid #ccc;"><strong>${isp}</strong></td>`
        table.appendChild(row);
        console.log(table)
      } );
  
      XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
      } );
  
      if(typeof query.value == 'number')
      {
          XHR.open( "GET", `https://geo.ipify.org/api/v1?apiKey=&ipAddress=${query.value}`);
      }else if(query.value.length !== 0)
      {
      XHR.open( "GET", `https://geo.ipify.org/api/v1?apiKey=&domain=${query.value}`);
     }
     else
    {
      XHR.open( "GET", `https://geo.ipify.org/api/v1?apiKey=`);
    }
      XHR.send( FD );
      query.value = '';
    }
   
    const form = document.getElementById( "myForm" );
  
    form.addEventListener( "submit", function ( event ) {
      event.preventDefault();
  
      sendData();
    } );

window.onload = sendData

map.on('click', onMapClick);