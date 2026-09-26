<template>
  <section class="pagina-mascote">
    <div class="cabecalho">
      <h1>Meu Mascote</h1>
      <p>Escolha o mascote que acompanhará sua jornada pelo Buswork.</p>
    </div>

    <div class="mascotes-grid">
      <button
        v-for="mascote in mascotes"
        :key="mascote.id"
        class="mascot-card"
        :class="{
          selected: mascote.id === mascoteSelecionadoId
        }"
        @click="selecionarMascote(mascote.id)"
      >
        <div
          class="svg-container"
          v-html="mascote.svg"
        ></div>

        <span class="mascot-name">
          {{ mascote.nome }}
        </span>
      </button>
    </div>

    <div class="acoes-mascote">
      <button
        class="btn-voltar"
        @click="voltar"
      >
        Voltar
      </button>

      <button
        class="btn-confirmar"
        :disabled="!mascoteSelecionadoId"
        @click="confirmarMascote"
      >
        Confirmar mascote
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const mascoteSelecionadoId = ref(
  localStorage.getItem('buswork_mascote_id') || null
)

const mascotes = [
  {
    id: 'pneu',
    nome: 'Pneuzinho',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="32" fill="#1F2937"/>
        <circle cx="50" cy="50" r="14" fill="#FFD600"/>
        <circle cx="42" cy="42" r="5" fill="white"/>
      </svg>
    `
  },

  {
    id: 'capivara',
    nome: 'Capivara',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="58" rx="32" ry="22" fill="#A66A3F"/>
        <circle cx="70" cy="48" r="15" fill="#A66A3F"/>
        <circle cx="75" cy="44" r="2.5" fill="#090C10"/>
        <circle cx="61" cy="43" r="3" fill="#090C10"/>
        <ellipse cx="80" cy="53" rx="7" ry="5" fill="#6B4329"/>
      </svg>
    `
  },

  {
    id: 'cachorro',
    nome: 'Cachorro',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="52" r="27" fill="#C58A52"/>
        <path d="M28 35 L18 22 L17 48 Z" fill="#8A5A32"/>
        <path d="M72 35 L82 22 L83 48 Z" fill="#8A5A32"/>
        <circle cx="40" cy="48" r="4" fill="#090C10"/>
        <circle cx="60" cy="48" r="4" fill="#090C10"/>
        <ellipse cx="50" cy="61" rx="7" ry="5" fill="#090C10"/>
      </svg>
    `
  },

  {
    id: 'gato',
    nome: 'Gato',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25 35 L28 17 L43 29 Q50 26 57 29 L72 17 L75 35
             Q82 45 75 63 Q67 78 50 78 Q33 78 25 63 Q18 45 25 35Z"
          fill="#8B95A5"
        />
        <circle cx="40" cy="47" r="4" fill="#090C10"/>
        <circle cx="60" cy="47" r="4" fill="#090C10"/>
        <path
          d="M46 60 Q50 64 54 60"
          fill="none"
          stroke="#090C10"
          stroke-width="3"
        />
      </svg>
    `
  },

  {
    id: 'leao',
    nome: 'Leão',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="#C88727"/>
        <circle cx="50" cy="50" r="25" fill="#DFAF54"/>
        <circle cx="41" cy="46" r="4" fill="#090C10"/>
        <circle cx="59" cy="46" r="4" fill="#090C10"/>
        <path
          d="M43 60 Q50 66 57 60"
          fill="none"
          stroke="#090C10"
          stroke-width="3"
        />
      </svg>
    `
  },

  {
    id: 'onca',
    nome: 'Onça',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="52" r="29" fill="#D69A32"/>
        <circle cx="34" cy="31" r="10" fill="#D69A32"/>
        <circle cx="66" cy="31" r="10" fill="#D69A32"/>
        <circle cx="40" cy="47" r="4" fill="#090C10"/>
        <circle cx="60" cy="47" r="4" fill="#090C10"/>
        <circle cx="34" cy="40" r="3" fill="#090C10"/>
        <circle cx="67" cy="42" r="3" fill="#090C10"/>
        <circle cx="38" cy="63" r="3" fill="#090C10"/>
        <circle cx="62" cy="64" r="3" fill="#090C10"/>
      </svg>
    `
  },

  {
    id: 'arara',
    nome: 'Arara',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="55" rx="25" ry="30" fill="#2563EB"/>
        <circle cx="50" cy="35" r="20" fill="#EF4444"/>
        <path d="M62 38 Q82 42 64 52 Z" fill="#111827"/>
        <circle cx="55" cy="32" r="4" fill="white"/>
        <circle cx="56" cy="32" r="2" fill="#090C10"/>
        <path d="M28 60 Q15 70 27 80 Q38 75 42 60Z" fill="#FFD600"/>
      </svg>
    `
  },

  {
    id: 'elefante',
    nome: 'Elefante',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="48" r="27" fill="#7B8794"/>
        <ellipse cx="28" cy="48" rx="13" ry="20" fill="#687582"/>
        <ellipse cx="72" cy="48" rx="13" ry="20" fill="#687582"/>
        <circle cx="41" cy="45" r="4" fill="#090C10"/>
        <circle cx="59" cy="45" r="4" fill="#090C10"/>
        <path
          d="M45 55 Q50 75 55 55"
          fill="none"
          stroke="#687582"
          stroke-width="7"
          stroke-linecap="round"
        />
      </svg>
    `
  },

  {
    id: 'cobra',
    nome: 'Cobra',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50 80
             Q25 72 35 55
             Q45 40 62 50
             Q77 59 68 42
             Q63 32 50 28"
          fill="none"
          stroke="#4B8B3B"
          stroke-width="15"
          stroke-linecap="round"
        />
        <circle cx="50" cy="28" r="14" fill="#5DA448"/>
        <circle cx="45" cy="25" r="3" fill="#090C10"/>
        <circle cx="55" cy="25" r="3" fill="#090C10"/>
      </svg>
    `
  },

  {
    id: 'carneiro',
    nome: 'Carneiro',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="55" r="25" fill="#F3F4F6"/>
        <circle cx="34" cy="40" r="13" fill="#9CA3AF"/>
        <circle cx="66" cy="40" r="13" fill="#9CA3AF"/>
        <circle cx="42" cy="51" r="4" fill="#090C10"/>
        <circle cx="58" cy="51" r="4" fill="#090C10"/>
        <ellipse cx="50" cy="63" rx="8" ry="6" fill="#374151"/>
      </svg>
    `
  }
]

const mascoteSelecionado = computed(() => {
  return mascotes.find(
    (mascote) => mascote.id === mascoteSelecionadoId.value
  ) || null
})

function selecionarMascote(id) {
  mascoteSelecionadoId.value = id
}

function confirmarMascote() {
  if (!mascoteSelecionado.value) {
    return
  }

  const mascote = mascoteSelecionado.value

  localStorage.setItem(
    'buswork_mascote_id',
    mascote.id
  )

  localStorage.setItem(
    'buswork_mascote_nome',
    mascote.nome
  )

  localStorage.setItem(
    'buswork_mascote_svg',
    mascote.svg
  )

  router.push('/')
}

function voltar() {
  router.push('/')
}
</script>

<style scoped>
.pagina-mascote {
  width: 100%;
  min-height: 100%;
  padding: 30px 25px 40px;
}

.cabecalho {
  margin-bottom: 25px;
}

.cabecalho h1 {
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 28px;
  font-weight: 800;
}

.cabecalho p {
  margin: 0;
  color: #9CA3AF;
  font-size: 14px;
}

.mascotes-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(150px, 1fr)
  );
  gap: 16px;
  width: 100%;
}

.mascot-card {
  min-height: 180px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #0D1117;
  color: #ffffff;

  border: 1px solid #1F2937;
  border-radius: 16px;

  cursor: pointer;

  transition:
    border-color 0.2s,
    background-color 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}

.mascot-card:hover {
  background: #111720;
  border-color: #FFD600;
  transform: translateY(-2px);
}

.mascot-card.selected {
  background: #151A21;
  border-color: #FFD600;
  box-shadow: 0 0 0 2px rgba(255, 214, 0, 0.15);
}

.svg-container {
  width: 110px;
  height: 110px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-container :deep(svg) {
  width: 100%;
  height: 100%;
}

.mascot-name {
  margin-top: 12px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
}

.mascot-card.selected .mascot-name {
  color: #FFD600;
}

.acoes-mascote {
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  margin-top: 25px;
}

.btn-voltar,
.btn-confirmar {
  padding: 11px 18px;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;
  transition: 0.2s;
}

.btn-voltar {
  background: #151A21;
  color: #ffffff;
  border: 1px solid #374151;
}

.btn-voltar:hover {
  background: #1F2937;
}

.btn-confirmar {
  background: #FFD600;
  color: #090C10;
  border: 1px solid #FFD600;
}

.btn-confirmar:hover:not(:disabled) {
  background: #FFE44D;
}

.btn-confirmar:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .pagina-mascote {
    padding: 20px 15px 30px;
  }

  .cabecalho h1 {
    font-size: 24px;
  }

  .mascotes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .acoes-mascote {
    flex-direction: column-reverse;
  }

  .btn-voltar,
  .btn-confirmar {
    width: 100%;
  }
}
</style>