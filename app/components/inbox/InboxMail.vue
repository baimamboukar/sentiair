<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define interfaces
interface AirQualityMetrics {
  aqi: number;
  no2: number;
  co: number;
  o3: number;
}

interface AirQualityData {
  city: string;
  coordinates: [number, number];
  metrics: AirQualityMetrics;
}

// Air quality data with random values
const locations: AirQualityData[] = [
  {
    city: "Kigali",
    coordinates: [-1.9441, 30.0619],
    metrics: {
      aqi: 297,
      no2: 41.78,
      co: 0.28,
      o3: 17.81,
    },
  },
  {
    city: "Musanze",
    coordinates: [-1.4975, 29.6349],
    metrics: {
      aqi: 48,
      no2: 48.43,
      co: 1.7,
      o3: 46.48,
    },
  },
  {
    city: "Gisenyi",
    coordinates: [-1.7021, 29.257],
    metrics: {
      aqi: 95,
      no2: 20.36,
      co: 5.41,
      o3: 32.25,
    },
  },
];

// Quality layers definition
const qualityLayers = {
  "0-50": "Min Quality",
  "51-100": "Moderate Quality",
  "101-150": "Unhealthy for Sensitive Groups",
  "151-200": "Unhealthy",
  "201-300": "Very Unhealthy",
};

onMounted(() => {
  const map = L.map("map").setView([-1.9441, 30.0619], 8);

  // Add base tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Create layer groups for each quality level
  const layerGroups = {};
  Object.keys(qualityLayers).forEach((range) => {
    layerGroups[range] = L.layerGroup().addTo(map);
  });

  // Add markers with hover functionality
  locations.forEach((location) => {
    const marker = L.circleMarker(location.coordinates, {
      radius: 10,
      fillColor: getColorForAQI(location.metrics.aqi),
      color: "#fff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
    });

    // Add hover tooltip
    marker.bindTooltip(
      `
      <div class="p-3">
        <h3 class="font-bold">${location.city}</h3>
        <p>AQI: ${location.metrics.aqi}</p>
        <p>NO₂: ${location.metrics.no2.toFixed(2)} ppb</p>
        <p>CO: ${location.metrics.co.toFixed(2)} ppm</p>
        <p>O₃: ${location.metrics.o3.toFixed(2)} ppb</p>
      </div>
    `,
      {
        permanent: false,
        direction: "top",
      }
    );

    // Add to appropriate layer group
    const range = getAQIRange(location.metrics.aqi);
    layerGroups[range].addLayer(marker);
  });

  // Add legend
  const legend = L.control({ position: "bottomright" });
  legend.onAdd = () => {
    const div = L.DomUtil.create("div", "legend");
    div.innerHTML = `
      <div class="bg-white p-3 rounded-lg shadow-lg">
        <h4 class="font-bold mb-2">Air Quality Index</h4>
        ${Object.entries(qualityLayers)
          .map(
            ([range, quality]) => `
            <div class="flex items-center gap-2 mb-1">
              <div class="w-4 h-4 rounded" style="background: ${getColorForRange(
                range
              )}"></div>
              <span>${range}: ${quality}</span>
            </div>
          `
          )
          .join("")}
      </div>
    `;
    return div;
  };
  legend.addTo(map);
});

// Utility functions
function getColorForAQI(aqi: number): string {
  if (aqi <= 50) return "#00e400";
  if (aqi <= 100) return "#ffff00";
  if (aqi <= 150) return "#ff7e00";
  if (aqi <= 200) return "#ff0000";
  return "#7e0023";
}

function getAQIRange(aqi: number): string {
  if (aqi <= 50) return "0-50";
  if (aqi <= 100) return "51-100";
  if (aqi <= 150) return "101-150";
  if (aqi <= 200) return "151-200";
  return "201-300";
}

function getColorForRange(range: string): string {
  const ranges = {
    "0-50": "#00e400",
    "51-100": "#ffff00",
    "101-150": "#ff7e00",
    "151-200": "#ff0000",
    "201-300": "#7e0023",
  };
  return ranges[range];
}
</script>

<template>
  <div class="relative">
    <div id="map" class="h-[600px] w-full rounded-lg shadow-lg" />
  </div>
</template>

<style scoped>
@import "leaflet/dist/leaflet.css";

:deep(.legend) {
  background-color: white;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

:deep(.leaflet-tooltip) {
  background-color: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
