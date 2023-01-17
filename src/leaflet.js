import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

// icon blue ballon & shadow
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


// Set anchor point - icon
let myIcon = L.icon({
    iconUrl: icon,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -40],
    shadowUrl: iconShadow

});

// global variables
let myMap, marker;

// initialize the leaflet map
export const initMap = (coordinates) => {


    myMap = L.map("mapContainer");


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    myMap.setView(coordinates, 10);
    marker = L.marker(coordinates, { icon: myIcon }).addTo(myMap);

}

export const initMapAllActivites = (coordinates) => {

    myMap = L.map("mapContainer");


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    console.log(coordinates)
    myMap.setView([coordinates[0].lat, coordinates[0].long], 9);

    coordinates.forEach(coord => {

        const info = `${coord.name}`
        marker = new L.marker([coord.lat, coord.long], { icon: myIcon }).setLatLng([coord.lat, coord.long]).bindPopup(info).addTo(myMap);
    });
}

// change the view of the map
export const changeView = (coordinates, zoom = 10, info) => {


    myMap.setView(coordinates, zoom);
    marker.setLatLng(coordinates).bindPopup(info).openPopup();


}

export const getLatitudeLongitude = () => {

    myMap.on('click', function (event) {

        const latlng = myMap.mouseEventToLatLng(event.originalEvent);
    });
}

// Clean up map - called when component is unmounted.
export const cleanUpMap = () => {

    if (myMap) {
        myMap.off();
        myMap = null;
        //myMap.remove();
    }
}

export { marker };