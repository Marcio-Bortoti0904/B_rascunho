<template>
  <Header />
  <div class="flex-1 flex overflow-hidden">
    <Sidebar />
  </div>
    <main class="home">

      <section class="conteudo-principal">

        <div class="coluna-esquerda">

          <BusMap />

          <section id="eventos-section">
            <h2>Mural de Anúncios & Eventos</h2>

            <div class="eventos">
              <EventCard
                v-for="evento in eventos"
                :key="evento.id"
                :evento="evento"
              />
            </div>
          </section>

        </div>

        <div class="coluna-direita">

          <PromotionCard />

          <SupportCard />

        </div>

      </section>

    </main>
  </template>

  <script setup>
  import BusMap from 'src/views/BusMap.vue'
  import EventCard from 'src/views/Eventcard.vue'
  import PromotionCard from 'src/views/PromotionCard.vue'
  import SupportCard from 'src/views/SupportCard.vue'

  import { eventos } from 'src/data/eventos.js'
  </script>