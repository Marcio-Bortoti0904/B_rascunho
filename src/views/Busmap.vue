<template>
  <div class="mapa-container">
    <div ref="mapElement" class="map"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { pontos } from '/src/data/pontos.js'


// Ícone dos pontos no mapa
const iconePonto = L.icon({
  iconUrl: '/markers/marker-icon.png',
  iconRetinaUrl: '/markers/marker-icon-2x.png',
  shadowUrl: '/markers/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})


// Referência do elemento do mapa
const mapElement = ref(null)


// Instância do mapa
let mapa = null


// Lista dos marcadores
const marcadores = []


// Linha entre destinos
let linhaDestinos = null


// Inicialização do mapa
onMounted(() => {

  mapa = L.map(mapElement.value).setView(
    [-24.045, -52.378],
    14
  )


  // Mapa OpenStreetMap
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; OpenStreetMap contributors'
    }
  ).addTo(mapa)


  // Adiciona os pontos no mapa
  pontos.forEach((ponto) => {

    const marcador = L.marker(
      [
        ponto.latitude,
        ponto.longitude
      ],
      {
        icon: iconePonto
      }
    )
      .addTo(mapa)
      .bindPopup(ponto.nome)


    // Guarda o marcador para poder encontrá-lo depois
    marcadores.push({
      id: ponto.id,
      marcador
    })

  })

})


// Vai até um ponto específico
function irParaPonto(ponto) {

  mapa.setView(
    [
      ponto.latitude,
      ponto.longitude
    ],
    17
  )


  const encontrado = marcadores.find(
    (item) => item.id === ponto.id
  )


  if (encontrado) {
    encontrado.marcador.openPopup()
  }

}


// Adiciona uma linha entre dois destinos
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


  // Remove a linha anterior
  if (linhaDestinos) {
    mapa.removeLayer(linhaDestinos)
  }


  // Cria a nova linha
  linhaDestinos = L.polyline(
    coordenadas,
    {
      color: '#FFD600',
      weight: 4,
      dashArray: '8, 10'
    }
  ).addTo(mapa)


  // Ajusta o mapa para mostrar os dois pontos
  mapa.fitBounds(
    linhaDestinos.getBounds(),
    {
      padding: [50, 50]
    }
  )


  return calcularDistancia(
    destino1,
    destino2
  )

}


// Remove a linha dos destinos
function limparDestino() {

  if (linhaDestinos) {

    mapa.removeLayer(
      linhaDestinos
    )

    linhaDestinos = null
  }

}


// Permite que o componente pai
// utilize essas funções
defineExpose({

  irParaPonto,

  adicionarDestino,

  limparDestino

})


// Calcula a distância entre dois pontos
function calcularDistancia(
  ponto1,
  ponto2
) {

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