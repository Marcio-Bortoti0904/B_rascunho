<template>
  <section class="pontos">
    <div class="conteudo-pontos">

      <!-- RESUMO DE PONTOS -->
      <div class="resumo">

        <!-- SALDO -->
        <div class="cartao-pontos">
          <div>
            <span class="label">
              Saldo de Pontos
            </span>

            <div class="valor-pontos">
              {{ pontos }}
              <span>pts</span>
            </div>
          </div>

          <div class="nivel">
            <span>
              Nível:
              <strong>{{ nivelAtual.nome }}</strong>
            </span>

            <span>
              Próximo nível:
              {{ nivelAtual.proximo }} pts
            </span>
          </div>
        </div>

        <!-- ENVIAR FOTO -->
        <div class="enviar-evento">

          <div class="evento-descricao">
            <div class="titulo-evento">
              <span>Ganhar Pontos</span>

              <h2>
                Participaste num evento?
              </h2>
            </div>

            <p>
              Tira uma foto no local do evento para comprovar
              a tua presença e ganha até
              <strong>300 pontos</strong> por participação!
            </p>
          </div>

          <div class="acoes-evento">

            <label class="botao-arquivo">
              <span class="icone-camera">◉</span>

              <span>
                {{ nomeArquivo || 'Carregar Foto Comprovativo' }}
              </span>

              <input
                type="file"
                accept="image/*"
                @change="selecionarFoto"
              />
            </label>

            <button
              class="botao-enviar"
              :disabled="!arquivoSelecionado"
              @click="enviarComprovante"
            >
              Enviar
            </button>

          </div>

          <p
            v-if="mensagem"
            class="mensagem"
          >
            {{ mensagem }}
          </p>

        </div>

      </div>

      <!-- RECOMPENSAS -->
      <section class="recompensas">

        <div class="titulo-secao">
          <h2>
            Trocar Pontos por Prêmios
          </h2>

          <span>
            Usa os teus pontos para obter vantagens
          </span>
        </div>

        <div class="lista-recompensas">

          <article
            v-for="recompensa in recompensas"
            :key="recompensa.id"
            class="recompensa"
          >

            <div class="recompensa-conteudo">

              <div class="recompensa-topo">
                <span
                  class="categoria"
                  :class="recompensa.cor"
                >
                  {{ recompensa.categoria }}
                </span>

                <strong>
                  {{ recompensa.pontos }} pts
                </strong>
              </div>

              <h3>
                {{ recompensa.nome }}
              </h3>

              <p>
                {{ recompensa.descricao }}
              </p>

            </div>

            <button
              v-if="pontos >= recompensa.pontos"
              class="botao-resgatar"
              @click="resgatarRecompensa(recompensa)"
            >
              Resgatar
            </button>

            <button
              v-else
              class="botao-indisponivel"
              disabled
            >
              Pontos Insuficientes
            </button>

          </article>

        </div>

      </section>

      <!-- EVENTOS VALIDADOS -->
      <section class="eventos-validos">

        <div class="eventos-cabecalho">
          <h2>
            Eventos Validados
          </h2>

          <span>
            Histórico de envios
          </span>
        </div>

        <div class="lista-eventos">

          <div
            v-for="evento in historico"
            :key="evento.id"
            class="evento-validado"
          >

            <div class="evento-info">

              <div
                class="evento-icone"
                :class="evento.status"
              >
                <span v-if="evento.status === 'aprovado'">
                  ✓
                </span>

                <span v-else>
                  ◷
                </span>
              </div>

              <div>
                <strong>
                  {{ evento.nome }}
                </strong>

                <span>
                  {{ evento.descricao }}
                </span>
              </div>

            </div>

            <span
              class="evento-resultado"
              :class="evento.status"
            >
              {{ evento.resultado }}
            </span>

          </div>

        </div>

      </section>

    </div>
  </section>
</template>


<script setup>
import { computed, ref } from 'vue'


/* =========================
   PONTOS DO USUÁRIO
========================= */

const pontos = ref(
  Number(
    localStorage.getItem('buswork_pontos')
  ) || 1250
)


/* =========================
   NÍVEIS
========================= */

const niveis = [
  {
    nome: 'Iniciante',
    minimo: 0,
    proximo: 500
  },
  {
    nome: 'Explorador',
    minimo: 500,
    proximo: 2000
  },
  {
    nome: 'Aventureiro',
    minimo: 2000,
    proximo: 5000
  },
  {
    nome: 'Mestre das Rotas',
    minimo: 5000,
    proximo: 10000
  }
]

const nivelAtual = computed(() => {
  let nivel = niveis[0]

  niveis.forEach((item) => {
    if (pontos.value >= item.minimo) {
      nivel = item
    }
  })

  return nivel
})


/* =========================
   RECOMPENSAS
========================= */

const recompensas = [
  {
    id: 1,
    categoria: 'Desconto Tarifa',
    cor: 'verde',
    pontos: 500,
    nome: 'Passagem Grátis',
    descricao:
      'Troca por 1 viagem gratuita em qualquer linha municipal.'
  },

  {
    id: 2,
    categoria: 'Desconto Comercial',
    cor: 'azul',
    pontos: 800,
    nome: '20% no Lanche de Parceiros',
    descricao:
      'Cupão válido nas lanchonetes da Estação Central.'
  },

  {
    id: 3,
    categoria: 'Passe Mensal',
    cor: 'roxo',
    pontos: 2000,
    nome: 'Desconto de 50% Recarga',
    descricao:
      'Metade do valor na tua próxima recarga mensal.'
  }
]


/* =========================
   HISTÓRICO
========================= */

const historico = ref([
  {
    id: 1,
    status: 'aprovado',
    nome: 'Feira de Profissões e Tecnologia',
    descricao:
      'Comprovativo por Foto • Aprovado ontem',
    resultado: '+ 250 pts'
  },

  {
    id: 2,
    status: 'pendente',
    nome: 'Workshop de Mobilidade Urbana',
    descricao:
      'Foto enviada • Em análise pela equipe',
    resultado: 'Pendente'
  }
])


/* =========================
   UPLOAD
========================= */

const arquivoSelecionado = ref(null)
const nomeArquivo = ref('')
const mensagem = ref('')


function selecionarFoto(evento) {
  const arquivo = evento.target.files[0]

  if (!arquivo) {
    arquivoSelecionado.value = null
    nomeArquivo.value = ''
    return
  }

  arquivoSelecionado.value = arquivo
  nomeArquivo.value = arquivo.name
  mensagem.value = ''
}


function enviarComprovante() {
  if (!arquivoSelecionado.value) {
    return
  }

  historico.value.unshift({
    id: Date.now(),
    status: 'pendente',
    nome: 'Novo evento',
    descricao:
      'Foto enviada • Em análise pela equipe',
    resultado: 'Pendente'
  })

  mensagem.value =
    'Comprovativo enviado para análise.'

  arquivoSelecionado.value = null
  nomeArquivo.value = ''
}


/* =========================
   RESGATE
========================= */

function resgatarRecompensa(recompensa) {
  if (pontos.value < recompensa.pontos) {
    return
  }

  const confirmar = window.confirm(
    `Deseja trocar ${recompensa.pontos} pontos por "${recompensa.nome}"?`
  )

  if (!confirmar) {
    return
  }

  pontos.value -= recompensa.pontos

  localStorage.setItem(
    'buswork_pontos',
    pontos.value
  )

  window.alert(
    `Recompensa "${recompensa.nome}" resgatada!`
  )
}
</script>


<style scoped>
.pontos {
  width: 100%;
  min-height: 100%;
  padding: 24px;
}

.conteudo-pontos {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 24px;
}


/* =========================
   RESUMO
========================= */

.resumo {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;
}

.cartao-pontos {
  min-height: 190px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: linear-gradient(
    135deg,
    #1E293B,
    #0F172A
  );

  border: 1px solid #374151;
  border-radius: 16px;

  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.2);
}

.label {
  color: #FFD600;

  font-size: 11px;
  font-weight: 800;

  text-transform: uppercase;
  letter-spacing: 1px;
}

.valor-pontos {
  margin-top: 8px;

  color: white;

  font-size: 36px;
  font-weight: 800;
}

.valor-pontos span {
  color: #9CA3AF;

  font-size: 16px;
  font-weight: 400;
}

.nivel {
  display: flex;
  justify-content: space-between;
  gap: 10px;

  padding-top: 14px;

  border-top: 1px solid rgba(75, 85, 99, 0.6);

  color: #9CA3AF;

  font-size: 11px;
}

.nivel strong {
  color: #FFD600;
}


/* =========================
   ENVIAR EVENTO
========================= */

.enviar-evento {
  padding: 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: #0F172A;

  border: 1px solid rgba(255, 214, 0, 0.3);
  border-radius: 16px;

  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.2);
}

.titulo-evento {
  display: flex;
  align-items: center;
  gap: 8px;
}

.titulo-evento > span {
  padding: 3px 8px;

  background: #FFD600;
  color: #090C10;

  border-radius: 999px;

  font-size: 10px;
  font-weight: 800;

  text-transform: uppercase;
}

.titulo-evento h2 {
  margin: 0;

  color: white;

  font-size: 16px;
}

.evento-descricao p {
  margin: 8px 0 0;

  color: #D1D5DB;

  font-size: 12px;
  line-height: 1.5;
}

.evento-descricao strong {
  color: white;
}

.acoes-evento {
  margin-top: 18px;

  display: flex;
  align-items: center;
  gap: 12px;
}

.botao-arquivo {
  flex: 1;

  min-width: 0;

  padding: 10px 14px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background: #1E293B;

  border: 1px dashed rgba(255, 214, 0, 0.5);
  border-radius: 11px;

  color: #D1D5DB;

  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.botao-arquivo:hover {
  background: #1F2937;
}

.botao-arquivo input {
  display: none;
}

.icone-camera {
  color: #FFD600;
  font-size: 18px;
}

.botao-enviar {
  padding: 11px 24px;

  background: #FFD600;
  color: #090C10;

  border: none;
  border-radius: 11px;

  font-size: 12px;
  font-weight: 800;

  cursor: pointer;
}

.botao-enviar:hover:not(:disabled) {
  background: #E6C200;
}

.botao-enviar:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.mensagem {
  margin: 10px 0 0;

  color: #4ADE80;

  font-size: 12px;
}


/* =========================
   RECOMPENSAS
========================= */

.recompensas {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.titulo-secao {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 4px;
}

.titulo-secao h2 {
  margin: 0;

  color: #FFD600;

  font-size: 13px;
  font-weight: 800;

  text-transform: uppercase;
  letter-spacing: 1px;
}

.titulo-secao span {
  color: #9CA3AF;
  font-size: 11px;
}

.lista-recompensas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.recompensa {
  min-height: 205px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: #0F172A;

  border: 1px solid #1F2937;
  border-radius: 16px;

  transition: 0.2s;
}

.recompensa:hover {
  border-color: #374151;
}

.recompensa-conteudo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.recompensa-topo {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.categoria {
  padding: 4px 9px;

  border-radius: 8px;

  font-size: 10px;
  font-weight: 800;
}

.categoria.verde {
  color: #4ADE80;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.categoria.azul {
  color: #60A5FA;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.categoria.roxo {
  color: #C084FC;
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.2);
}

.recompensa-topo > strong {
  color: #FFD600;
  font-size: 13px;
}

.recompensa h3 {
  margin: 0;

  color: white;
  font-size: 15px;
}

.recompensa p {
  margin: 0;

  color: #9CA3AF;

  font-size: 11px;
  line-height: 1.5;
}

.botao-resgatar,
.botao-indisponivel {
  width: 100%;
  padding: 10px;

  border-radius: 10px;

  font-size: 12px;
  font-weight: 800;

  cursor: pointer;
}

.botao-resgatar {
  background: #1E293B;
  color: white;

  border: 1px solid #374151;

  transition: 0.2s;
}

.botao-resgatar:hover {
  background: #FFD600;
  color: #090C10;
}

.botao-indisponivel {
  background: #1F2937;
  color: #6B7280;

  border: 1px solid #1F2937;

  cursor: not-allowed;
}


/* =========================
   EVENTOS VALIDADOS
========================= */

.eventos-validos {
  background: #0D1117;

  border: 1px solid #1F2937;
  border-radius: 16px;

  overflow: hidden;

  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.2);
}

.eventos-cabecalho {
  padding: 16px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #111827;

  border-bottom: 1px solid #1F2937;
}

.eventos-cabecalho h2 {
  margin: 0;

  color: white;
  font-size: 15px;
}

.eventos-cabecalho span {
  color: #9CA3AF;
  font-size: 11px;
}

.lista-eventos {
  display: flex;
  flex-direction: column;
}

.evento-validado {
  padding: 16px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid rgba(31, 41, 55, 0.6);

  transition: 0.2s;
}

.evento-validado:last-child {
  border-bottom: none;
}

.evento-validado:hover {
  background: rgba(31, 41, 55, 0.3);
}

.evento-info {
  display: flex;
  align-items: center;
  gap: 12px;

  min-width: 0;
}

.evento-icone {
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 11px;

  font-size: 20px;
  font-weight: 800;
}

.evento-icone.aprovado {
  color: #4ADE80;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.evento-icone.pendente {
  color: #FACC15;
  background: rgba(234, 179, 8, 0.1);
  border: 1px solid rgba(234, 179, 8, 0.2);
}

.evento-info > div:last-child {
  display: flex;
  flex-direction: column;
  gap: 4px;

  min-width: 0;
}

.evento-info strong {
  color: white;
  font-size: 13px;
}

.evento-info span {
  color: #9CA3AF;
  font-size: 11px;
}

.evento-resultado {
  flex-shrink: 0;
  margin-left: 15px;

  font-size: 13px;
  font-weight: 800;
}

.evento-resultado.aprovado {
  color: #4ADE80;
}

.evento-resultado.pendente {
  color: #FACC15;
}


/* =========================
   RESPONSIVIDADE
========================= */

@media (max-width: 850px) {
  .resumo {
    grid-template-columns: 1fr;
  }

  .lista-recompensas {
    grid-template-columns: 1fr;
  }

  .titulo-secao {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}

@media (max-width: 600px) {
  .pontos {
    padding: 16px;
  }

  .nivel {
    flex-direction: column;
  }

  .acoes-evento {
    flex-direction: column;
  }

  .botao-arquivo,
  .botao-enviar {
    width: 100%;
  }

  .evento-validado {
    align-items: flex-start;
    gap: 10px;
  }

  .evento-resultado {
    margin-left: 0;
  }
}
</style>