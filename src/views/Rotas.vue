<template>
  <div class="estrutura">

    <main class="conteudo">

      <div class="container">

        <!-- SELETOR DE LINHA -->

        <section class="seletor">

          <label for="linha">
            Selecione a Linha:
          </label>

          <select
            id="linha"
            v-model="linhaSelecionada"
          >

            <option
              v-for="(rota, chave) in HORARIOS_BUSWORK"
              :key="chave"
              :value="chave"
            >
              {{ rota.nome }}
            </option>

          </select>

        </section>


        <!-- HORÁRIOS -->

        <section
          v-for="periodo in periodos"
          :key="periodo.id"
          class="bloco-horarios"
        >

          <header class="titulo-periodo">

            <span class="icone">
              {{ periodo.icone }}
            </span>

            <h2>
              {{ periodo.titulo }}
            </h2>

          </header>


          <div class="horarios-grid">

            <!-- TERMINAL -->

            <div class="sentido">

              <div class="titulo-sentido">

                <span class="ponto amarelo"></span>

                <h3>
                  Saída: Terminal Urbano
                </h3>

              </div>


              <div class="lista-horarios">

                <span
                  v-for="horario in horariosSelecionados[periodo.id].terminalUrbano"
                  :key="horario"
                  class="horario"
                >
                  {{ horario }}
                </span>

                <span
                  v-if="horariosSelecionados[periodo.id].terminalUrbano.length === 0"
                  class="sem-operacao"
                >
                  Sem operação
                </span>

              </div>

            </div>


            <!-- BAIRRO -->

            <div class="sentido">

              <div class="titulo-sentido">

                <span class="ponto azul"></span>

                <h3>
                  Saída: Bairro
                </h3>

              </div>


              <div class="lista-horarios">

                <span
                  v-for="horario in horariosSelecionados[periodo.id].bairro"
                  :key="horario"
                  class="horario"
                >
                  {{ horario }}
                </span>

                <span
                  v-if="horariosSelecionados[periodo.id].bairro.length === 0"
                  class="sem-operacao"
                >
                  Sem operação
                </span>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>

  </div>

</template>


<script setup>

import { computed, ref } from 'vue'

import { HORARIOS_BUSWORK } from '/src/data/horarios.js'


/* LINHA SELECIONADA */

const linhaSelecionada = ref(
  Object.keys(HORARIOS_BUSWORK)[0]
)


/* LINHA ATUAL */

const rotaAtual = computed(() => {

  return HORARIOS_BUSWORK[linhaSelecionada.value]

})


/* PERÍODOS */

const periodos = [
  {
    id: 'diasUteis',
    titulo: 'Dias Úteis',
    icone: '◷'
  },

  {
    id: 'sabados',
    titulo: 'Sábados',
    icone: '▣'
  },

  {
    id: 'domingosEFeriados',
    titulo: 'Domingos e Feriados',
    icone: '✦'
  }
]


/* HORÁRIOS DA LINHA ATUAL */

const horariosSelecionados = computed(() => {

  return rotaAtual.value

})

</script>


<style scoped>

.estrutura {

  display: flex;

  width: 100%;

  min-height: calc(100vh - 60px);

  background: #090C10;

}


.conteudo {

  flex: 1;

  min-width: 0;

  overflow-y: auto;

  padding: 24px;

}


.container {

  width: 100%;

  max-width: 1100px;

  margin: 0 auto;

}


/* SELETOR */

.seletor {

  background: #0F172A;

  border: 1px solid #1F2937;

  padding: 20px;

  border-radius: 16px;

  margin-bottom: 24px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);

}


.seletor label {

  display: block;

  margin-bottom: 8px;

  color: #FFD600;

  font-size: 14px;

  font-weight: 700;

}


.seletor select {

  width: 100%;

  padding: 12px 16px;

  background: #1E293B;

  color: white;

  border: 1px solid #374151;

  border-radius: 12px;

  font-size: 17px;

  font-weight: 600;

  outline: none;

}


.seletor select:focus {

  border-color: #FFD600;

}


/* BLOCO DE HORÁRIOS */

.bloco-horarios {

  margin-bottom: 24px;

  background: #0D1117;

  border: 1px solid #1F2937;

  border-radius: 16px;

  overflow: hidden;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);

}


/* TÍTULO */

.titulo-periodo {

  display: flex;

  align-items: center;

  gap: 10px;

  padding: 14px 20px;

  background: #111827;

  border-bottom: 1px solid #1F2937;

}


.titulo-periodo h2 {

  margin: 0;

  color: white;

  font-size: 18px;

}


.icone {

  color: #FFD600;

  font-size: 20px;

}


/* DUAS COLUNAS */

.horarios-grid {

  display: grid;

  grid-template-columns: 1fr 1fr;

}


/* SENTIDO */

.sentido {

  padding: 20px;

}


.sentido + .sentido {

  border-left: 1px solid #1F2937;

}


/* TÍTULO DO SENTIDO */

.titulo-sentido {

  display: flex;

  align-items: center;

  gap: 8px;

  margin-bottom: 16px;

}


.titulo-sentido h3 {

  margin: 0;

  color: #D1D5DB;

  font-size: 12px;

  text-transform: uppercase;

  letter-spacing: 0.08em;

}


/* PONTOS */

.ponto {

  width: 8px;

  height: 8px;

  border-radius: 50%;

}


.amarelo {

  background: #FFD600;

}


.azul {

  background: #3B82F6;

}


/* HORÁRIOS */

.lista-horarios {

  display: grid;

  grid-template-columns: repeat(5, 1fr);

  gap: 8px;

}


.horario {

  padding: 7px 8px;

  text-align: center;

  background: #1F2937;

  border: 1px solid #374151;

  border-radius: 8px;

  color: white;

  font-size: 13px;

  font-weight: 600;

}


/* SEM OPERAÇÃO */

.sem-operacao {

  color: #6B7280;

  font-size: 13px;

  font-style: italic;

}


/* RESPONSIVO */

@media (max-width: 768px) {

  .conteudo {

    padding: 16px;

  }


  .horarios-grid {

    grid-template-columns: 1fr;

  }


  .sentido + .sentido {

    border-left: none;

    border-top: 1px solid #1F2937;

  }


  .lista-horarios {

    grid-template-columns: repeat(4, 1fr);

  }

}

</style>