<template>
  <section class="eventos-page">

    <h1>Eventos Culturais</h1>

    <div class="lista-eventos">
      <EventCard
        v-for="evento in eventos"
        :key="evento.id"
        :evento="evento"
      />
    </div>

  </section>
</template>

<script setup>
import EventCard from './Eventcard.vue'
import { eventos } from '../data/eventos.js'
</script>

<style scoped>

.eventos-page {
  padding: 30px;
}

.eventos-page h1 {
  margin: 0 0 25px;

  color: #ffffff;

  font-size: 28px;
  font-weight: 700;
}

.lista-eventos {
  display: grid;

  grid-template-columns: repeat(
    auto-fill,
    minmax(280px, 1fr)
  );

  gap: 20px;
}

</style>