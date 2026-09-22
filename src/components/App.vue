<template>
  <div class="app">
    <Menu />

    <main class="conteudo">
      <div id="map">
        <Busmap />
      </div>
    </main>
  </div>
</template>

<script setup>
import Busmap from '/src/views/Busmap.vue';
import Menu from '/src/views/Menu.vue';
</script>

<style>
.app {
  display: flex;
  width: 100%;
  height: 100vh;
}

.conteudo {
  flex: 1;
  height: 100vh;
}

#map {
  width: 100%;
  height: 100%;
}
</style>