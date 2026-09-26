<template>
  <div class="mapa-container">
    <div ref="mapElement" class="map"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { pontos } from '../data/pontos.js'

const mapElement = ref(null)

let mapa = null

const marcadores = []
let linhaDestinos = null

onMounted(() => {
  mapa = L.map(mapElement.value).setView(
    [-24.045, -52.378],
    14
  )

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; OpenStreetMap contributors'
    }
  ).addTo(mapa)

  pontos.forEach((ponto) => {
    const marcador = L.marker([
      ponto.latitude,
      ponto.longitude
    ])
      .addTo(mapa)
      .bindPopup(ponto.nome)

    marcadores.push({
      id: ponto.id,
      marcador
    })
  })
})

function irParaPonto(ponto) {
  mapa.setView(
    [ponto.latitude, ponto.longitude],
    17
  )

  const encontrado = marcadores.find(
    (item) => item.id === ponto.id
  )

  if (encontrado) {
    encontrado.marcador.openPopup()
  }
}

function adicionarDestino(destino1, destino2) {
  const coordenadas = [
    [
      destino1.latitude,
      destino1.longitude
    ],
    [
      destino2.latitude,
      destino2.longitude
    ]
  ]

  if (linhaDestinos) {
    mapa.removeLayer(linhaDestinos)
  }

  linhaDestinos = L.polyline(
    coordenadas,
    {
      color: '#FFD600',
      weight: 4,
      dashArray: '8, 10'
    }
  ).addTo(mapa)

  mapa.fitBounds(linhaDestinos.getBounds(), {
    padding: [50, 50]
  })

  return calcularDistancia(destino1, destino2)
}

function limparDestino() {
  if (linhaDestinos) {
    mapa.removeLayer(linhaDestinos)
    linhaDestinos = null
  }
}

defineExpose({
  irParaPonto,
  adicionarDestino,
  limparDestino
})

function calcularDistancia(ponto1, ponto2) {
  const inicio = L.latLng(
    ponto1.latitude,
    ponto1.longitude
  )

  const fim = L.latLng(
    ponto2.latitude,
    ponto2.longitude
  )

  return inicio.distanceTo(fim)
}
</script>

<style scoped>
.mapa-container {
  width: calc(100% - 50px);
  height: 380px;
  margin-left: 25px;
  margin-top: 10px;
  border-radius: 16px;
  overflow: hidden;
}

.map {
  width: 100%;
  height: 100%;
}
</style>