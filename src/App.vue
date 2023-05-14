<template>
  <div id="app">
    <component :is="layout"/>
  </div>
</template>

<script>
import MainLayout from './views/layout/MainLayout.vue'

export default {
  name: 'App',
  components: {
    'main-layout': MainLayout,
  },
  computed: {
    layout() {
      return 'main-layout'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
