import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Mascote from '../views/Mascote.vue'
import Historico from '../views/Historico.vue'
import Rotas from '../views/Rotas.vue'
import Carteira from '../views/Carteira.vue'
import Pontos from '../views/Pontos.vue'
import Configuracoes from '../views/Configuracoes.vue'

const routes = [

  {
    path: '/',
    component: Home
  },

  {
    path: '/mascote',
    component: Mascote
  },

  {
    path: '/historico',
    component: Historico
  },

  {
    path: '/rotas',
    component: Rotas
  },

  {
    path: '/carteira',
    component: Carteira
  },

  {
    path: '/pontos',
    component: Pontos
  },

  {
    path: '/configuracoes',
    component: Configuracoes
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router