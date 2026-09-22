<template>
  <div class="mapa-container">
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { pontos } from '../data/pontos.js'

onMounted(() => {

  const map = L.map('map').setView(
    [-24.045, -52.378],
    14
  )

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; OpenStreetMap contributors'
    }
  ).addTo(map)

  pontos.forEach((ponto) => {

    L.marker([
      ponto.latitude,
      ponto.longitude
    ])
      .addTo(map)
      .bindPopup(ponto.nome)

  })

})
</script>

<style scoped>

.mapa-container {
  width: 100%;
  height: 380px;
  border-radius: 16px;
  overflow: hidden;
}

#map {
  width: 100%;
  height: 100%;
}

</style>