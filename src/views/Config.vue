<template>
  <section class="pagina-configuracoes">

    <!-- PERFIL DO USUÁRIO -->
    <div class="perfil-card">
      <div class="perfil-info">

        <div class="avatar">
          MB
        </div>

        <div>
          <h2>Usuário Buswork</h2>

          <p>
            usuario@buswork.com
          </p>

          <span class="nivel">
            Nível Explorador
          </span>
        </div>

      </div>

      <button
        class="botao-editar"
        @click="editarPerfil"
      >
        Editar Perfil
      </button>
    </div>


    <!-- NOTIFICAÇÕES -->
    <div class="config-card">

      <div class="config-titulo">
        <span class="icone">🔔</span>

        <h3>
          Preferências de Notificação
        </h3>
      </div>

      <div class="config-conteudo">

        <div class="config-item">

          <div>
            <p>Alertas de Chegada de Ônibus</p>

            <small>
              Avisar quando a linha selecionada estiver próxima do ponto
            </small>
          </div>

          <label class="switch">
            <input
              v-model="configuracoes.alertasOnibus"
              type="checkbox"
            >

            <span></span>
          </label>

        </div>


        <div class="config-item">

          <div>
            <p>Novos Eventos & Prêmios</p>

            <small>
              Notificar sobre novos eventos parceiros para ganhar pontos
            </small>
          </div>

          <label class="switch">
            <input
              v-model="configuracoes.eventos"
              type="checkbox"
            >

            <span></span>
          </label>

        </div>


        <div class="config-item">

          <div>
            <p>Resumo de Atividade por Email</p>

            <small>
              Receber relatório semanal de pontos acumulados
            </small>
          </div>

          <label class="switch">
            <input
              v-model="configuracoes.email"
              type="checkbox"
            >

            <span></span>
          </label>

        </div>

      </div>

    </div>


    <!-- SEGURANÇA -->
    <div class="config-card">

      <div class="config-titulo">
        <span class="icone">🔒</span>

        <h3>
          Segurança & Localização
        </h3>
      </div>

      <div class="config-conteudo">

        <div class="config-item">

          <div>
            <p>Permissão de Localização</p>

            <small>
              Permitir uso do GPS para calcular rotas e verificar presença em eventos
            </small>
          </div>

          <label class="switch">
            <input
              v-model="configuracoes.localizacao"
              type="checkbox"
            >

            <span></span>
          </label>

        </div>


        <div class="config-item">

          <div>
            <p>Alterar Senha</p>

            <small>
              Atualize sua senha de acesso periodicamente
            </small>
          </div>

          <button
            class="botao-link"
            @click="alterarSenha"
          >
            Alterar
          </button>

        </div>

      </div>

    </div>


    <!-- AÇÕES -->
    <div class="acoes-conta">

      <button
        class="botao-termos"
        @click="abrirTermos"
      >
        Termos de Uso & Política de Privacidade
      </button>

      <button
        class="botao-sair"
        @click="sairDaConta"
      >
        Sair da Conta
      </button>

    </div>

  </section>
</template>


<script setup>
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


/*
|--------------------------------------------------------------------------
| CONFIGURAÇÕES
|--------------------------------------------------------------------------
*/

const configuracoes = reactive({
  alertasOnibus:
    localStorage.getItem('buswork_alertas_onibus') !== 'false',

  eventos:
    localStorage.getItem('buswork_eventos') !== 'false',

  email:
    localStorage.getItem('buswork_email') === 'true',

  localizacao:
    localStorage.getItem('buswork_localizacao') !== 'false'
})


/*
|--------------------------------------------------------------------------
| SALVAR CONFIGURAÇÕES
|--------------------------------------------------------------------------
*/

watch(
  () => configuracoes.alertasOnibus,
  (valor) => {
    localStorage.setItem(
      'buswork_alertas_onibus',
      valor
    )
  }
)

watch(
  () => configuracoes.eventos,
  (valor) => {
    localStorage.setItem(
      'buswork_eventos',
      valor
    )
  }
)

watch(
  () => configuracoes.email,
  (valor) => {
    localStorage.setItem(
      'buswork_email',
      valor
    )
  }
)

watch(
  () => configuracoes.localizacao,
  (valor) => {
    localStorage.setItem(
      'buswork_localizacao',
      valor
    )
  }
)


/*
|--------------------------------------------------------------------------
| AÇÕES
|--------------------------------------------------------------------------
*/

function editarPerfil() {
  router.push('/perfil')
}

function alterarSenha() {
  alert('A função de alteração de senha será implementada posteriormente.')
}

function abrirTermos() {
  alert(
    'Os Termos de Uso e a Política de Privacidade serão disponibilizados posteriormente.'
  )
}

function sairDaConta() {
  const confirmar = window.confirm(
    'Deseja realmente sair da sua conta?'
  )

  if (!confirmar) {
    return
  }

  localStorage.removeItem('buswork_mascote_id')
  localStorage.removeItem('buswork_mascote_nome')
  localStorage.removeItem('buswork_mascote_svg')

  router.push('/')
}
</script>


<style scoped>

.pagina-configuracoes {
  width: 100%;
  max-width: 900px;

  margin: 0 auto;

  padding: 25px;
}


/*
|--------------------------------------------------------------------------
| PERFIL
|--------------------------------------------------------------------------
*/

.perfil-card {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 24px;

  background: #0F172A;

  border: 1px solid #1F2937;

  border-radius: 16px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);

  margin-bottom: 24px;
}

.perfil-info {
  display: flex;
  align-items: center;

  gap: 15px;
}

.avatar {
  width: 64px;
  height: 64px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #FFD600;

  color: #090C10;

  font-size: 20px;
  font-weight: 900;

  border: 2px solid #FFD600;
}

.perfil-info h2 {
  margin: 0 0 4px;

  color: white;

  font-size: 18px;
}

.perfil-info p {
  margin: 0;

  color: #9CA3AF;

  font-size: 12px;
}

.nivel {
  display: inline-block;

  margin-top: 6px;

  padding: 3px 8px;

  border-radius: 6px;

  background: rgba(255, 214, 0, 0.1);

  border: 1px solid rgba(255, 214, 0, 0.2);

  color: #FFD600;

  font-size: 10px;

  font-weight: 700;
}

.botao-editar {
  padding: 9px 16px;

  border: 1px solid #374151;

  border-radius: 10px;

  background: #1E293B;

  color: #D1D5DB;

  font-size: 12px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.botao-editar:hover {
  background: #374151;

  color: white;
}


/*
|--------------------------------------------------------------------------
| CARDS DE CONFIGURAÇÃO
|--------------------------------------------------------------------------
*/

.config-card {
  margin-bottom: 24px;

  overflow: hidden;

  background: #0F172A;

  border: 1px solid #1F2937;

  border-radius: 16px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.config-titulo {
  display: flex;
  align-items: center;

  gap: 10px;

  padding: 16px 20px;

  background: rgba(17, 24, 39, 0.6);

  border-bottom: 1px solid #1F2937;
}

.icone {
  font-size: 18px;
}

.config-titulo h3 {
  margin: 0;

  color: white;

  font-size: 14px;

  font-weight: 700;
}

.config-conteudo {
  padding: 5px 20px;
}

.config-item {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  padding: 18px 0;

  border-bottom: 1px solid rgba(55, 65, 81, 0.6);
}

.config-item:last-child {
  border-bottom: none;
}

.config-item p {
  margin: 0 0 5px;

  color: white;

  font-size: 14px;

  font-weight: 600;
}

.config-item small {
  display: block;

  max-width: 650px;

  color: #9CA3AF;

  font-size: 12px;

  line-height: 1.5;
}


/*
|--------------------------------------------------------------------------
| SWITCH
|--------------------------------------------------------------------------
*/

.switch {
  position: relative;

  display: inline-block;

  width: 44px;
  height: 24px;

  flex-shrink: 0;

  cursor: pointer;
}

.switch input {
  display: none;
}

.switch span {
  position: absolute;

  inset: 0;

  background: #374151;

  border-radius: 999px;

  transition: 0.2s;
}

.switch span::after {
  content: '';

  position: absolute;

  width: 20px;
  height: 20px;

  left: 2px;
  top: 2px;

  background: white;

  border-radius: 50%;

  transition: 0.2s;
}

.switch input:checked + span {
  background: #FFD600;
}

.switch input:checked + span::after {
  transform: translateX(20px);
}


/*
|--------------------------------------------------------------------------
| BOTÃO ALTERAR
|--------------------------------------------------------------------------
*/

.botao-link {
  border: none;

  background: transparent;

  color: #FFD600;

  font-size: 12px;

  font-weight: 700;

  cursor: pointer;
}

.botao-link:hover {
  text-decoration: underline;
}


/*
|--------------------------------------------------------------------------
| AÇÕES DA CONTA
|--------------------------------------------------------------------------
*/

.acoes-conta {
  display: flex;

  gap: 12px;

  padding-top: 5px;
}

.botao-termos {
  flex: 1;

  padding: 12px 16px;

  background: #1F2937;

  border: 1px solid #374151;

  border-radius: 10px;

  color: #D1D5DB;

  font-size: 12px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.botao-termos:hover {
  background: #374151;
}

.botao-sair {
  padding: 12px 22px;

  background: rgba(239, 68, 68, 0.1);

  border: 1px solid rgba(239, 68, 68, 0.3);

  border-radius: 10px;

  color: #F87171;

  font-size: 12px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.botao-sair:hover {
  background: rgba(239, 68, 68, 0.2);
}


/*
|--------------------------------------------------------------------------
| RESPONSIVIDADE
|--------------------------------------------------------------------------
*/

@media (max-width: 600px) {

  .pagina-configuracoes {
    padding: 20px 15px 30px;
  }

  .perfil-card {
    align-items: flex-start;

    flex-direction: column;
  }

  .botao-editar {
    width: 100%;
  }

  .config-item {
    align-items: flex-start;
  }

  .config-item small {
    font-size: 11px;
  }

  .acoes-conta {
    flex-direction: column;
  }

  .botao-sair {
    width: 100%;
  }
}

</style>