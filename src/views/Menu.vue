<template>
  <aside class="sidebar">

    <nav class="menu">

      <RouterLink to="/" class="menu-item">
        <span class="icone">⌂</span>
        <span>Início</span>
      </RouterLink>

      <RouterLink to="/mascote" class="menu-item">
        <span class="icone">☻</span>
        <span>Meu Bichinho</span>
      </RouterLink>

      <RouterLink to="/historico" class="menu-item">
        <span class="icone">◷</span>
        <span>Histórico</span>
      </RouterLink>

      <RouterLink to="/rotas" class="menu-item">
        <span class="icone">◈</span>
        <span>Rotas</span>
      </RouterLink>

      <RouterLink to="/perfil" class="menu-item">
        <span class="icone"><svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
</svg></span>
        <span>Perfil</span>
      </RouterLink>

      <RouterLink to="/pontos" class="menu-item">
        <span class="icone">☆</span>
        <span>Meus Pontos</span>
      </RouterLink>

      <RouterLink to="/eventos" class="menu-item">
        <span class="icone">□</span>
        <span>Eventos Culturais</span>
      </RouterLink>

    </nav>

    <div class="separador"></div>

    <nav class="menu menu-inferior">

      <RouterLink to="/config" class="menu-item">
        <span class="icone">⚙</span>
        <span>Configurações</span>
      </RouterLink>

    </nav>

  </aside>
</template>

<style scoped>

.sidebar {
  width: 260px;
  min-width: 260px;

  min-height: calc(100vh - 40px);

  background-color: #090C10;

  border-right: 1px solid #1F2937;

  padding: 32px 20px;
  margin: 4px;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.menu-item {
  height: 48px;

  display: flex;
  align-items: center;
  gap: 14px;

  padding: 0 16px;

  border-radius: 12px;

  color: #9CA3AF;

  text-decoration: none;

  font-size: 16px;
  font-weight: 500;

  transition: 0.2s;
}

.menu-item:hover {
  background-color: #151A21;
  color: white;
}

.menu-item.router-link-active {
  background-color: #FFD600;
  color: #090C10;
  font-weight: 700;
}

.icone {
  width: 22px;

  display: flex;
  justify-content: center;

  font-size: 20px;
}

.separador {
  height: 1px;

  background-color: #1F2937;

  margin: 14px 0;
}

.menu-inferior {
  margin-top: 0;
}

</style>