<script setup lang="ts">
import { onMounted } from "vue";
import L from "leaflet";

// Cities data with random AQI values
const cities = [
  { city: "Kigali", coordinates: [-1.9441, 30.0619], aqi: 297 },
  { city: "Musanze", coordinates: [-1.4975, 29.6349], aqi: 119 },
  { city: "Huye", coordinates: [-2.5, 29.74], aqi: 14 },
  { city: "Rubavu", coordinates: [-1.6752, 29.2665], aqi: 253 },
  { city: "Nyagatare", coordinates: [-1.2977, 30.3272], aqi: 152 },
  { city: "Rwamagana", coordinates: [-1.9487, 30.4347], aqi: 16 },
  { city: "Kirehe", coordinates: [-2.1041, 30.2361], aqi: 48 },
  { city: "Ngoma", coordinates: [-2.0245, 30.5014], aqi: 137 },
  { city: "Gisenyi", coordinates: [-1.7021, 29.257], aqi: 87 },
  { city: "Muhanga", coordinates: [-2.0833, 29.75], aqi: 95 },
];

const getColor = (aqi: number) => {
  if (aqi <= 50) return "#00e400"; // Green
  if (aqi <= 100) return "#ffff00"; // Yellow
  if (aqi <= 150) return "#ff7e00"; // Orange
  if (aqi <= 200) return "#ff0000"; // Red
  return "#7e0023"; // Purple
};

onMounted(() => {
  const map = L.map("map").setView([-1.9441, 30.0619], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  cities.forEach((city) => {
    const circle = L.circleMarker(city.coordinates, {
      radius: 10,
      fillColor: getColor(city.aqi),
      color: "#fff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
    });

    const popupContent = `
      <div class="p-4">
        <h3 class="font-bold text-lg mb-2">${city.city}</h3>
        <p class="font-medium">AQI: ${city.aqi}</p>
      </div>
    `;

    circle.bindPopup(popupContent);
    circle.addTo(map);
  });

  // Add legend
  const legend = L.control({ position: "bottomright" });
  legend.onAdd = () => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="bg-white p-3 rounded shadow">
        <h4 class="font-bold mb-2">Air Quality Index</h4>
        <div class="space-y-1">
          <div><span class="inline-block w-3 h-3 mr-2 bg-[#00e400]"></span>Good (0-50)</div>
          <div><span class="inline-block w-3 h-3 mr-2 bg-[#ffff00]"></span>Moderate (51-100)</div>
          <div><span class="inline-block w-3 h-3 mr-2 bg-[#ff7e00]"></span>Unhealthy for Sensitive Groups (101-150)</div>
          <div><span class="inline-block w-3 h-3 mr-2 bg-[#ff0000]"></span>Unhealthy (151-200)</div>
          <div><span class="inline-block w-3 h-3 mr-2 bg-[#7e0023]"></span>Very Unhealthy (201+)</div>
        </div>
      </div>
    `;
    return div;
  };
  legend.addTo(map);
});
</script>

<template>
  <div id="map" class="h-[600px] w-full rounded-lg shadow-lg" />
</template>

<style>
@import "leaflet/dist/leaflet.css";
</style>
