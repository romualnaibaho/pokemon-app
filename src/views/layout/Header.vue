<template>
  <div class="header header-fixed text-center">
    <img
      src="@/assets/icons/pokeball.png"
      alt="pokeball-icon"
      width="30"
      height="30"
      class="cursor-pointer"
      @click="$router.push({ name: 'landing-page' })"
    >
  </div>
</template>

<script>
export default {
  name: 'header-id'
}
</script>

<style scoped lang="scss">
.header {
  border-bottom: solid 2px rgb(88, 87, 87);
  background-color: #FED269;
  padding: 15px 0;
  width: 100%;
}

.header-fixed {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
</style>
