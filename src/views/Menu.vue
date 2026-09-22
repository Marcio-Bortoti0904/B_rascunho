<template>
  <aside class="sidebar">

    <img src="/src/imagem/logo.png" alt="BW" height="125" width="125">

    <nav class="menu">

      <a href="#" class="menu-item ativo">
        <span class="icone">⌂</span>
        <span>Início</span>
      </a>

      <a href="#" class="menu-item">
        <span class="icone">🚌</span>
        <span>Rotas</span>
      </a>

      <a href="#" class="menu-item">
        <span class="icone">🕘</span>
        <span>Histórico</span>
      </a>

      <a href="#" class="menu-item">
        <span class="icone">💳</span>
        <span>Carteira</span>
      </a>

      <a href="#" class="menu-item">
        <span class="icone">🐾</span>
        <span>Meu Bichinho</span>
      </a>

      <a href="#" class="menu-item">
        <span class="icone">⭐</span>
        <span>Meus Pontos</span>
      </a>

      <a href="#" class="menu-item">
        <span class="icone">🎭</span>
        <span>Eventos Culturais</span>
      </a>

    </nav>

    <div class="menu-inferior">

      <a href="#" class="menu-item">
        <span class="icone">👤</span>
        <span>Editar Perfil</span>
      </a>

      <a href="#" class="menu-item">
        <span class="icone">⚙</span>
        <span>Configurações</span>
      </a>

    </div>

  </aside>
</template>

<style scoped>

.sidebar {
  width: 240px;
  min-width: 240px;
  height: 100vh;

  box-sizing: border-box;

  background-color: #0D1117;
  color: white;

  display: flex;
  flex-direction: column;

  padding: 24px 16px;

  border-right: 1px solid #1F2937;
}

.logo {
  color: #FFD600;

  font-size: 24px;
  font-weight: 900;

  padding: 0 12px;
  margin-bottom: 35px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 12px;

  border-radius: 8px;

  color: white;
  text-decoration: none;

  font-size: 15px;
  font-weight: 600;
}

.menu-item:hover {
  background-color: #1F2937;
}

.menu-item.ativo {
  background-color: #FFD600;
  color: #090C10;
}

.icone {
  width: 24px;

  display: flex;
  justify-content: center;
}

.menu-inferior {
  margin-top: auto;

  display: flex;
  flex-direction: column;

  gap: 8px;
}

</style>