<template>
  <section class="home">

    <div class="conteudo-principal">
      <div class="barra-pesquisa">
        <input
          v-model="pesquisa"
          type="text"
          :placeholder="placeholder"
        />

        <div
          v-if="pesquisa && resultados.length"
          class="resultados"
        >
          <button
            v-for="ponto in resultados"
            :key="ponto.id"
            class="resultado"
            @click="selecionarPonto(ponto)"
          >
            <span class="resultado-icone">🚏</span>

            <div>
              <strong>{{ ponto.nome }}</strong>
              <small>Ponto de interesse</small>
            </div>
          </button>
        </div>
      </div>
<div
  v-if="perguntarSegundoDestino"
  class="pergunta-destino"
>
  <div class="pergunta-texto">
    <strong>Destino selecionado</strong>

    <span>
      📍 {{ destinoInicial.nome }}
    </span>
  </div>

  <p>
    Deseja adicionar outro destino para calcular a distância?
  </p>

  <div class="pergunta-acoes">
    <button
      class="botao-sim"
      @click="adicionarSegundoDestino"
    >
      + Adicionar destino
    </button>

    <button
      class="botao-nao"
      @click="cancelarSegundoDestino"
    >
      Não
    </button>
  </div>
    </div>
    <div
  v-if="distancia !== null"
  class="resultado-distancia"
>
  <div class="distancia-cabecalho">
    <div class="icone-distancia">
      ↔
    </div>

    <div>
      <strong>Distância calculada: </strong>
      <span>Entre os destinos selecionados: </span>
    </div>

    <div class="valor-distancia">
      {{ (distancia / 1000).toFixed(2) }}
      <small>km</small>
    </div>
  </div>

  <div class="trajeto">
    <div class="ponto-trajeto">
      <span class="marcador origem"></span>

      <div>
        <small>Origem:</small>
        <strong>{{ destinoInicial.nome }}</strong>
      </div>
    </div>

    <div class="linha-trajeto"></div>

    <div class="ponto-trajeto">
      <span class="marcador destino"></span>

      <div>
        <small>Destino:</small>
        <strong>{{ segundoDestino.nome }}</strong>
      </div>
    </div>
  </div>
</div>
    <button
      v-if="distancia !== null"
      class="botao-reset"
      @click="resetar"
    >
  Refazer
</button>
      <!-- MAPA -->
      <div class="coluna-esquerda">

        <BusMap ref="busMap" />

        <!-- MURAL DE ANÚNCIOS E EVENTOS -->
        <section id="eventos-section">

          <h2>Mural de Anúncios & Eventos</h2>

          <div class="mural">

            <!-- SETA ESQUERDA -->
            <button
              class="seta esquerda"
              @click="rolarEsquerda"
              aria-label="Eventos anteriores"
            >
              ‹
            </button>

            <!-- EVENTOS -->
            <div
              ref="listaEventos"
              class="eventos"
            >
              <EventCard
                v-for="evento in eventos"
                :key="evento.id"
                :evento="evento"
              />
            </div>

            <!-- SETA DIREITA -->
            <button
              class="seta direita"
              @click="rolarDireita"
              aria-label="Próximos eventos"
            >
              ›
            </button>

          </div>

        </section>

      </div>

    </div>

  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

import BusMap from '/src/views/Busmap.vue'
import EventCard from '/src/views/Eventcard.vue'

import { eventos } from '/src/data/eventos.js'
import { pontos } from '/src/data/pontos.js'

function resetar() {
  destinoInicial.value = null
  segundoDestino.value = null
  distancia.value = null
  perguntarSegundoDestino.value = false
  pesquisa.value = ''
  placeholder.value = 'Pesquise um endereço ou ponto de ônibus...'

  busMap.value?.limparDestino()
}

const listaEventos = ref(null)

const pesquisa = ref('')
const placeholder = ref('Pesquise um endereço ou ponto de ônibus...')

const resultados = computed(() => {
  const texto = pesquisa.value.toLowerCase().trim()

  if (texto === '') {
    return []
  }

  return pontos.filter((ponto) =>
    ponto.nome.toLowerCase().includes(texto)
  )
})

function selecionarPonto(ponto) {
  if (!destinoInicial.value) {
    destinoInicial.value = ponto

    pesquisa.value = ''

    busMap.value?.irParaPonto(ponto)

    perguntarSegundoDestino.value = true
    placeholder.value = 'Digite o novo endereço'

    return
  }

  segundoDestino.value = ponto

  pesquisa.value = ''

  perguntarSegundoDestino.value = false

  distancia.value = busMap.value?.adicionarDestino(
    destinoInicial.value,
    segundoDestino.value
  )
}

function rolarDireita() {
  listaEventos.value?.scrollBy({
    left: 350,
    behavior: 'smooth'
  })
}

function rolarEsquerda() {
  listaEventos.value?.scrollBy({
    left: -350,
    behavior: 'smooth'
  })
}

const busMap = ref(null)
const distancia = ref(null)
const destinoInicial = ref(null)
const segundoDestino = ref(null)

const perguntarSegundoDestino = ref(false)

function adicionarSegundoDestino() {
  pesquisa.value = ''
  perguntarSegundoDestino.value = false
}

function cancelarSegundoDestino() {
  perguntarSegundoDestino.value = false
  placeholder.value = 'Pesquise um endereço ou ponto de ônibus...'
}
</script>

<style scoped>
.botao-reset {
  margin: 0 25px 15px;
  padding: 10px 16px;

  background: #151A21;
  color: #FFD600;

  border: 1px solid #374151;
  border-radius: 10px;

  font-size: 13px;
  font-weight: 700;

  cursor: pointer;
  transition: 0.2s;
}

.botao-reset:hover {
  background: #FFD600;
  color: #090C10;
}

.resultado-distancia {
  width: calc(100% - 50px);
  margin: 10px 25px 15px;
  padding: 18px;
  background: #0D1117;
  border: 1px solid #1F2937;
  border-radius: 16px;
}

.distancia-cabecalho {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icone-distancia {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #FFD600;
  color: #090C10;

  border-radius: 12px;

  font-size: 22px;
  font-weight: 900;
}

.distancia-cabecalho > div:nth-child(2) {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.distancia-cabecalho strong {
  color: white;
  font-size: 15px;
}

.distancia-cabecalho span {
  color: #6B7280;
  font-size: 12px;
}

.valor-distancia {
  margin-left: auto;

  color: #FFD600;
  font-size: 24px;
  font-weight: 800;
}

.valor-distancia small {
  font-size: 13px;
  font-weight: 600;
  color: #9CA3AF;
}

.trajeto {
  margin-top: 18px;
  padding-top: 16px;

  border-top: 1px solid #1F2937;
}

.ponto-trajeto {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ponto-trajeto > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.ponto-trajeto small {
  color: #6B7280;
  font-size: 11px;
}

.ponto-trajeto strong {
  color: white;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.marcador {
  flex-shrink: 0;

  width: 12px;
  height: 12px;

  border-radius: 50%;
}

.marcador.origem {
  background: #FFD600;
}

.marcador.destino {
  background: white;
}

.linha-trajeto {
  width: 2px;
  height: 20px;

  margin-left: 5px;

  background: #374151;
}
.pergunta-destino {
  width: calc(100% - 50px);
  margin: 10px 25px 15px;
  padding: 16px;

  background: #0D1117;
  border: 1px solid #1F2937;
  border-radius: 14px;
}

.pergunta-texto {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.pergunta-texto strong {
  color: #FFD600;
  font-size: 15px;
}

.pergunta-texto span {
  color: white;
  font-size: 14px;
}

.pergunta-destino p {
  margin: 12px 0;
  color: #9CA3AF;
  font-size: 14px;
}

.pergunta-acoes {
  display: flex;
  gap: 10px;
}

.pergunta-acoes button {
  padding: 10px 15px;

  border-radius: 9px;
  border: 1px solid #374151;

  cursor: pointer;
  font-weight: 600;
}

.botao-sim {
  background: #FFD600;
  color: #090C10;
}

.botao-nao {
  background: #151A21;
  color: white;
}

.botao-nao:hover {
  background: #1F2937;
}
.barra-pesquisa {
  position: relative;

  width: calc(100% - 50px);

  margin: 20px 25px 10px;
}

.barra-pesquisa input {
  width: 100%;
  height: 52px;

  padding: 0 18px;

  background: #0D1117;
  color: white;

  border: 1px solid #1F2937;
  border-radius: 14px;

  outline: none;

  font-size: 15px;
}

.barra-pesquisa input:focus {
  border-color: #FFD600;
}

.barra-pesquisa input::placeholder {
  color: #6B7280;
}

.resultados {
  position: absolute;

  top: 60px;
  left: 0;
  right: 0;

  z-index: 1000;

  padding: 6px;

  background: #0D1117;

  border: 1px solid #1F2937;
  border-radius: 12px;
}

.resultado {
  width: 100%;

  display: flex;
  align-items: center;

  gap: 12px;

  padding: 12px;

  border: none;
  border-radius: 8px;

  background: transparent;
  color: white;

  text-align: left;

  cursor: pointer;
}

.resultado:hover {
  background: #151A21;
}

.resultado div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.resultado small {
  color: #9CA3AF;
}

.home {
  width: 100%;
}

.conteudo-principal {
  width: 100%;
}

.coluna-esquerda {
  width: 100%;
}

#eventos-section {
  margin-top: 24px;
}

#eventos-section h2 {
  margin: 0 0 16px;
  margin-left: 23px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
}

.mural {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
}

.eventos {
  display: flex;
  gap: 16px;
  margin: 20px;
  width: 100%;

  overflow-x: auto;
  scroll-behavior: smooth;

  scrollbar-width: none;
}

.eventos::-webkit-scrollbar {
  display: none;
}

.seta {
  flex-shrink: 0;

  width: 42px;
  height: 42px;
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid #374151;
  border-radius: 50%;

  background: #0D1117;
  color: #FFD600;

  font-size: 32px;
  line-height: 1;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.2s;
}

.seta:hover {
  background: #FFD600;
  color: #090C10;
}

.eventos :deep(.evento) {
  flex: 0 0 300px;
}

@media (max-width: 700px) {

  .seta {
    width: 36px;
    height: 36px;
    font-size: 27px;
  }

  .eventos :deep(.evento) {
    flex: 0 0 260px;
  }

}
</style>