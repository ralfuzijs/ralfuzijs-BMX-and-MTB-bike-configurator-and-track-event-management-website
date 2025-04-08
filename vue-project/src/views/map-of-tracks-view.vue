<script setup>
import { onMounted, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const tracksLoaded = ref(false);

onMounted(async () => {
    const map = L.map('map').setView([56.95, 24.11], 13);

    // OpenStreetMap tile layer
    const OpenStreetMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const googleMaps = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }); 

    // marker
    const BikeIcon = L.Icon.extend({
      options: {
          iconSize: [35, 50],
          iconAnchor: [22, 44],
          popupAnchor: [-3, -46]
      }
    });

    // Use proper public folder paths with forward slashes
    const blueIcon = new BikeIcon({iconUrl: '/images/bike_point_blue.png'}),
          orangeIcon = new BikeIcon({iconUrl: '/images/bike_point_orange.png'});
    
    // Create layer groups
    const skateparks = L.layerGroup([]);
    const pumptracks = L.layerGroup([]);
    const bmx_tracks = L.layerGroup([]);

    // Fetch data from API
    try {
        const response = await fetch('http://localhost:5000/api/tracks');
        const result = await response.json();
        
        if (result.success) {
            result.data.forEach(track => {
                const [lng, lat] = track.location.coordinates;
                let marker;
                
                // Select icon based on track type
                if (track.type === 'skatepark') {
                    marker = L.marker([lat, lng], {icon: blueIcon})
                        .bindPopup(`<b>${track.name}</b><br>${track.description || ''}`);
                    skateparks.addLayer(marker);
                } else if (track.type === 'pumptrack') {
                    marker = L.marker([lat, lng], {icon: orangeIcon})
                        .bindPopup(`<b>${track.name}</b><br>${track.description || ''}`);
                    pumptracks.addLayer(marker);
                } else if (track.type === 'bmx_track') {
                    marker = L.marker([lat, lng], {icon: orangeIcon})
                        .bindPopup(`<b>${track.name}</b><br>${track.description || ''}`);
                    bmx_tracks.addLayer(marker);
                }
            });
            
            tracksLoaded.value = true;
        }
    } catch (error) {
        console.error('Error fetching tracks:', error);
    }

    // Define base layers and overlays for the layers control
    var baseMaps = {
        "Open Street Map": OpenStreetMap,
        "Google Maps": googleMaps
    };

    var overlayMaps = {
        "Skateparks": skateparks,
        "Pumptracks": pumptracks,
        "BMX Tracks": bmx_tracks
    };

    // Add the Layer Control to the map
    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

    // Add the layers to the map by default
    skateparks.addTo(map);
    pumptracks.addTo(map);
    bmx_tracks.addTo(map);
});
</script>

<template>
  <main>
      <div id="map"></div>
      <div v-if="!tracksLoaded" class="loading">Loading tracks from database...</div>
  </main>
</template>

<style scoped>
#map {
    width: 80%;
    height: 75vh;
    margin: auto;
}

.loading {
    text-align: center;
    margin: 20px;
    color: #666;
}
</style>