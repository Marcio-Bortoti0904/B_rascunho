<template>
  <head>
    <title>Buswork - Perfil</title>
  </head>
  <section class="pagina">
    <div class="cabecalho">
      <h1>Minha Carteira</h1>
      <p>Gerencie suas informações no Buswork.</p>
    </div>
  </section>
  <div class="carteira">
    <div class="conteudo-carteira">

      <!-- CARTÃO E TARIFAS -->
      <div class="grade-superior">

        <!-- CARTÃO PASSE DIGITAL -->
        <div class="cartao-passe">
          <div class="brilho"></div>

          <div class="cartao-topo">
            <div>
              <span class="cartao-label">
                Cartão Passe Digital
              </span>

              <h2>
                Estudante / Comum
              </h2>
            </div>

            <div class="icone-cartao">
              ▣
            </div>
          </div>

          <div class="saldo">
            <span>Saldo Disponível</span>

            <strong>
              {{ saldoFormatado }}
            </strong>
          </div>

          <div class="cartao-rodape">
            <span>Nº **** **** 4821</span>

            <span class="status">
              • Ativo
            </span>
          </div>
        </div>

        <!-- TARIFAS -->
        <div class="tarifas">
          <div>
            <h2>
              <span class="icone-info">ⓘ</span>
              Tarifas Vigentes
            </h2>

            <p>
              Valores atualizados do transporte público municipal.
            </p>
          </div>

          <div class="lista-tarifas">

            <div class="tarifa">
              <div class="tarifa-nome">
                <span class="bolinha normal"></span>
                <span>Tarifa Normal</span>
              </div>

              <strong>
                {{ formatarMoeda(tarifas.normal) }}
              </strong>
            </div>

            <div class="tarifa">
              <div class="tarifa-nome">
                <span class="bolinha estudante"></span>
                <span>Estudantes</span>
              </div>

              <strong class="tarifa-estudante">
                {{ formatarMoeda(tarifas.estudante) }}
              </strong>
            </div>

          </div>

          <button
            class="botao-recarregar"
            @click="recarregarSaldo"
          >
            Recarregar Saldo
          </button>
        </div>

      </div>

      <!-- HISTÓRICO -->
      <section class="historico">

        <div class="historico-cabecalho">
          <h2>Últimas Atividades</h2>

          <button @click="mostrarTudo = !mostrarTudo">
            {{ mostrarTudo ? 'Mostrar menos' : 'Ver tudo' }}
          </button>
        </div>

        <div class="lista-atividades">

          <div
            v-for="atividade in atividadesVisiveis"
            :key="atividade.id"
            class="atividade"
          >

            <div class="atividade-esquerda">

              <div
                class="atividade-icone"
                :class="atividade.tipo"
              >
                <span v-if="atividade.tipo === 'saida'">
                  ↔
                </span>

                <span v-else>
                  +
                </span>
              </div>

              <div class="atividade-info">
                <strong>
                  {{ atividade.titulo }}
                </strong>

                <span>
                  {{ atividade.descricao }}
                </span>
              </div>

            </div>

            <strong
              class="valor"
              :class="atividade.tipo"
            >
              {{ atividade.tipo === 'saida' ? '-' : '+' }}
              {{ formatarMoeda(atividade.valor) }}
            </strong>

          </div>

        </div>

      </section>

    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const saldo = ref(
  Number(localStorage.getItem('buswork_saldo')) || 48.20
)

const mostrarTudo = ref(false)

const tarifas = {
  normal: 4.81,
  estudante: 2.40
}

const atividades = ref([
  {
    id: 1,
    tipo: 'saida',
    titulo: 'Uso da Tarifa (Estudante)',
    descricao: 'Linha Parque Verde • Hoje, 07:12',
    valor: 2.40
  },
  {
    id: 2,
    tipo: 'entrada',
    titulo: 'Recarga Pix',
    descricao: 'Aprovado • Ontem, 18:40',
    valor: 50.00
  },
  {
    id: 3,
    tipo: 'saida',
    titulo: 'Uso da Tarifa (Normal)',
    descricao: 'Linha Campus Integrado • 18/09/2026',
    valor: 4.81
  }
])

const saldoFormatado = computed(() => {
  return formatarMoeda(saldo.value)
})

const atividadesVisiveis = computed(() => {
  if (mostrarTudo.value) {
    return atividades.value
  }

  return atividades.value.slice(0, 3)
})

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function recarregarSaldo() {
  const valor = Number(
    prompt('Digite o valor da recarga:')
  )

  if (!valor || valor <= 0) {
    return
  }

  saldo.value += valor

  localStorage.setItem(
    'buswork_saldo',
    saldo.value
  )

  atividades.value.unshift({
    id: Date.now(),
    tipo: 'entrada',
    titulo: 'Recarga',
    descricao: 'Adicionada agora',
    valor
  })
}
</script>

<style scoped>
.carteira {
  width: 100%;
  min-height: 100%;
}

.conteudo-carteira {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.grade-superior {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

/* =========================
   CARTÃO
========================= */

.cartao-passe {
  position: relative;
  min-height: 224px;
  padding: 24px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: linear-gradient(
    135deg,
    #1e293b,
    #0f172a
  );

  border: 1px solid #374151;
  border-radius: 18px;

  box-shadow:
    0 15px 30px rgba(0, 0, 0, 0.25);
}

.brilho {
  position: absolute;
  right: -30px;
  bottom: -30px;

  width: 130px;
  height: 130px;

  background: rgba(255, 214, 0, 0.10);
  border-radius: 50%;

  filter: blur(25px);
}

.cartao-topo {
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.cartao-label {
  color: #FFD600;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.cartao-topo h2 {
  margin: 4px 0 0;

  color: white;
  font-size: 18px;
  font-weight: 700;
}

.icone-cartao {
  color: #FFD600;
  font-size: 28px;
}

.saldo {
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 3px;
}

.saldo span {
  color: #9CA3AF;
  font-size: 12px;
}

.saldo strong {
  color: white;
  font-size: 32px;
  font-weight: 800;
}

.cartao-rodape {
  position: relative;

  display: flex;
  justify-content: space-between;

  padding-top: 12px;

  border-top: 1px solid rgba(75, 85, 99, 0.6);

  color: #9CA3AF;
  font-size: 12px;
}

.status {
  color: #4ADE80;
  font-weight: 700;
}

/* =========================
   TARIFAS
========================= */

.tarifas {
  min-height: 224px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;

  background: #0F172A;

  border: 1px solid #1F2937;
  border-radius: 18px;

  box-shadow:
    0 15px 30px rgba(0, 0, 0, 0.20);
}

.tarifas h2 {
  display: flex;
  align-items: center;
  gap: 8px;

  margin: 0 0 4px;

  color: white;
  font-size: 16px;
}

.icone-info {
  color: #FFD600;
}

.tarifas p {
  margin: 0;

  color: #9CA3AF;
  font-size: 12px;
}

.lista-tarifas {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tarifa {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 13px 14px;

  background: #1E293B;

  border: 1px solid rgba(75, 85, 99, 0.6);
  border-radius: 12px;
}

.tarifa-nome {
  display: flex;
  align-items: center;
  gap: 10px;

  color: #E5E7EB;
  font-size: 14px;
  font-weight: 600;
}

.bolinha {
  width: 10px;
  height: 10px;
  flex-shrink: 0;

  border-radius: 50%;
}

.bolinha.normal {
  background: #FFD600;
}

.bolinha.estudante {
  background: #3B82F6;
}

.tarifa strong {
  color: white;
  font-size: 17px;
}

.tarifa .tarifa-estudante {
  color: #FFD600;
}

.botao-recarregar {
  width: 100%;
  padding: 12px;

  background: #FFD600;
  color: #090C10;

  border: none;
  border-radius: 11px;

  font-size: 14px;
  font-weight: 800;

  cursor: pointer;

  transition:
    background 0.2s,
    transform 0.2s;
}

.botao-recarregar:hover {
  background: #E6C200;
  transform: translateY(-1px);
}

/* =========================
   HISTÓRICO
========================= */

.historico {
  margin-top: 24px;

  background: #0D1117;

  border: 1px solid #1F2937;
  border-radius: 18px;

  overflow: hidden;

  box-shadow:
    0 15px 30px rgba(0, 0, 0, 0.20);
}

.historico-cabecalho {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 17px 20px;

  background: #111827;

  border-bottom: 1px solid #1F2937;
}

.historico-cabecalho h2 {
  margin: 0;

  color: white;
  font-size: 16px;
}

.historico-cabecalho button {
  padding: 0;

  background: transparent;
  color: #FFD600;

  border: none;

  font-size: 12px;
  font-weight: 600;

  cursor: pointer;
}

.historico-cabecalho button:hover {
  text-decoration: underline;
}

.lista-atividades {
  display: flex;
  flex-direction: column;
}

.atividade {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px 20px;

  border-bottom: 1px solid rgba(31, 41, 55, 0.6);

  transition: background 0.2s;
}

.atividade:last-child {
  border-bottom: none;
}

.atividade:hover {
  background: rgba(31, 41, 55, 0.3);
}

.atividade-esquerda {
  display: flex;
  align-items: center;
  gap: 12px;

  min-width: 0;
}

.atividade-icone {
  width: 42px;
  height: 42px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 11px;

  font-size: 21px;
  font-weight: 800;
}

.atividade-icone.saida {
  color: #F87171;
  background: rgba(239, 68, 68, 0.10);
  border: 1px solid rgba(239, 68, 68, 0.20);
}

.atividade-icone.entrada {
  color: #4ADE80;
  background: rgba(34, 197, 94, 0.10);
  border: 1px solid rgba(34, 197, 94, 0.20);
}

.atividade-info {
  display: flex;
  flex-direction: column;
  gap: 4px;

  min-width: 0;
}

.atividade-info strong {
  color: white;
  font-size: 14px;
}

.atividade-info span {
  color: #9CA3AF;
  font-size: 12px;
}

.valor {
  flex-shrink: 0;
  margin-left: 15px;

  font-size: 14px;
}

.valor.saida {
  color: #F87171;
}

.valor.entrada {
  color: #4ADE80;
}

/* =========================
   RESPONSIVIDADE
========================= */

@media (max-width: 800px) {
  .grade-superior {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .carteira {
    padding: 16px;
  }

  .cartao-passe,
  .tarifas {
    padding: 20px;
  }

  .saldo strong {
    font-size: 28px;
  }

  .atividade {
    padding: 14px;
  }

  .atividade-info strong {
    font-size: 13px;
  }

  .atividade-info span {
    font-size: 11px;
  }

  .valor {
    font-size: 13px;
  }
}
.pagina {
  padding: 30px;
}

.cabecalho h1 {
  margin: 0;
  font-size: 28px;
}

.cabecalho p {
  color: #9CA3AF;
}

.perfil-card {
  margin-top: 25px;
  padding: 25px;

  display: flex;
  align-items: center;
  gap: 18px;

  background: #0D1117;
  border: 1px solid #1F2937;
  border-radius: 16px;
}

.avatar {
  width: 64px;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #FFD600;
  color: #090C10;

  border-radius: 50%;

  font-size: 20px;
  font-weight: 800;
}

.informacoes {
  flex: 1;
}

.informacoes h2 {
  margin: 0 0 5px;
}

.informacoes p {
  margin: 0;
  color: #9CA3AF;
}

.botao-editar {
  padding: 10px 16px;

  border: 1px solid #374151;
  border-radius: 10px;

  background: #151A21;
  color: #FFD600;

  cursor: pointer;
}

.botao-editar:hover {
  background: #FFD600;
  color: #090C10;
}
</style>