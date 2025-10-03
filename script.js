let map = L.map("map").setView([48.8566, 2.3522], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

let brocanteIcon = L.icon({
    iconUrl: "images/ancre.png",
    iconSize: [40, 40],
    iconAnchor: [20, 10],
});

let popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on('click', onMapClick);

L.marker([48.855053, 2.27801]).addTo(map).bindPopup("Bienvenue à l'ICAN ! 🖥️");

L.marker([48.9028387917675, 2.3413173099835665], { icon: brocanteIcon })
  .addTo(map)
  .bindPopup("Marché aux Puces de Saint-Ouen 🎞️");

L.marker([48.85499605762928, 2.414863040855274])
  .addTo(map)
  .bindPopup("<b>Marché aux Puces de Montreuil ⚱️</b>");

L.marker([48.82506919431646, 2.310780138413855])
  .addTo(map)
  .bindPopup("Marché aux Puces de la Porte de Vanves 🕰️");

L.marker([48.8491320710258, 2.377821170412059])
  .addTo(map)
  .bindPopup("Marché d'Aligre 🫜");

let circle = L.circle([48.854, 2.349], {
  color: "red",
  fillColor: "rgba(212, 38, 44, 1)",
  fillOpacity: 0.2,
  radius: 1000,
}).addTo(map);
