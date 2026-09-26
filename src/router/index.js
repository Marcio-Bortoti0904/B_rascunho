import { createRouter, createWebHistory } from 'vue-router'

import Home from '/src/views/Home.vue'
import Rotas from '/src/views/Rotas.vue'
import Historico from '/src/views/Historico.vue'
import Perfil from '/src/views/Perfil.vue'
import Config from '/src/views/Config.vue'
import Mascote from '/src/views/Mascote.vue'
import Pontos from '/src/views/Pontos.vue'
import eventos from '/src/views/eventos.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/rotas',
    component: Rotas
  },
  {
    path: '/historico',
    component: Historico
  },
  {
    path: '/perfil',
    component: Perfil
  },
  {
    path: '/config',
    component: Config
  },
  {
    path: '/mascote',
    component: Mascote
  },
  {
    path: '/pontos',
    component: Pontos
  },
  {
    path: '/eventos',
    component: eventos
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router