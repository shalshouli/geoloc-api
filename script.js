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

map.on("click", onMapClick);

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

map.on("click", function (e) {
  L.marker(e.latlng).addTo(map).bindPopup("Nouveau point");
});

let markersLayer = L.layerGroup().addTo(map);
let dataCache = []; // on garde les données chargées

fetch("locations.json")
  .then((r) => r.json())
  .then((data) => {
    dataCache = data;
    renderByType(); // affichage par défaut
  });

function renderByType(type = null) {
  markersLayer.clearLayers(); // on repart de zéro
  let locations = dataCache;
  if (type) {
    locations = dataCache.filter((location) => location.type === type);
  }
  locations.forEach((location) => {
    L.marker([location.lat, location.lng])
      .addTo(markersLayer)
      .bindPopup(`<b>${location.name}</b><br>${location.type}`);
  });
}

// branchement des boutons
document.querySelectorAll("button[data-type]").forEach((btn) => {
  btn.addEventListener("click", () => {
    renderByType(btn.dataset.type);
  });
});

const msg = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    msg.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function success(position) {
  L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
    .bindPopup(`Vous êtes ici ! (Latitude:
    ${position.coords.latitude} +
    "<br>Longitude :
    ${position.coords.longitude})`);
}

function error() {
  alert("Sorry, no position available.");
}
