<template>
  <header class="header">

    <!-- Logo -->
    <div class="logo-area">
      <img
        src="/logo.png"
        alt="Buswork"
        class="logo"
      >
    </div>

    <div class="separador"></div>

    <!-- Saudação -->
    <div class="saudacao">
      <div>
        <strong>Olá, BusWorker!</strong>
        <p>Bora seguir hoje? 🚌</p>
      </div>
    </div>

    <!-- Informações -->
    <div class="acoes">

      <div class="cidade">
        📍 Campo Mourão - PR
      </div>

      <button class="notificacao" type="button">
        🔔
      </button>

    </div>

  </header>
</template>

<style scoped>

.header {
  height: 60px;

  background: #FFD600;
  color: #090C10;
  display: flex;
  align-items: center;

  padding: 0 24px;
  gap: 20px;

  box-sizing: border-box;
}

/* LOGO */

.logo-area {
  width: 150px;
  height: 60px;
  display: flex;
  align-items: center;
}

.logo {
  width: 150px;
  height: 140px;

  object-fit: contain;
}


/* SEPARADOR */

.separador {
  height: 35px;
  width: 1px;

  background-color: #090C10;

  opacity: 0.6;
}


/* SAUDAÇÃO */

.saudacao {
  display: flex;
  align-items: center;
}

.saudacao strong {
  font-size: 18px;
}

.saudacao p {
  margin: 2px 0 0;

  font-size: 12px;
}


/* LADO DIREITO */

.acoes {
  margin-left: auto;

  display: flex;
  align-items: center;

  gap: 25px;
}

.cidade {
  font-size: 13px;
  font-weight: 600;
}

.notificacao {
  border: none;
  background: transparent;

  font-size: 21px;

  cursor: pointer;

  width: 40px;
  height: 40px;

  border-radius: 8px;
}

.notificacao:hover {
  background: rgba(0, 0, 0, 0.1);
}

</style>