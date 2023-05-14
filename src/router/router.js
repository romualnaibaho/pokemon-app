import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const LandingPage = () => import(/* webpackChunkName: "landing-page" */ '@/views/pages/LandingPage/LandingPage.vue')
const PokemonList = () => import(/* webpackChunkName: "pokemon-list" */ '@/views/pages/PokemonList/PokemonList.vue')
const PokemonDetail = () => import(/* webpackChunkName: "pokemon-detail" */ '@/views/pages/PokemonDetail/PokemonDetail.vue')

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/pokemon-list',
      name: 'pokemon-list',
      component: PokemonList
    },
    {
      path: '/detail/:id/:name',
      name: 'pokemon-detail',
      component: PokemonDetail
    }
  ]
})

export default router