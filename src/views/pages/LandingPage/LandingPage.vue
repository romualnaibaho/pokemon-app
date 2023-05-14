<template>
  <div class="container">
    <div class="h-max">
      <div class="row col-12 m-0">
        <div class="h-max col-12 col-md-8 d-flex">
          <img
            src="@/assets/images/pokemon.png"
            alt="pokemon-ilustration"
            class="img-fluid m-auto"
          >
        </div>

        <div class="h-max col-12 col-md-4 d-flex">
          <div class="m-auto">
            <button @click="$router.push({ name: 'pokemon-list' })" class="landing-page-btn">
              Open Pokemon
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-dashboard',
  methods: {
  }
}
</script>

<style scoped lang="scss">
.h-max {
  min-height: calc(100vh - 110px);
}

.landing-page-btn {
  background-color: #CF6B76;
  padding: 20px;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  transition: background-color 1s ease;

  &:hover {
    background-color: #408861;
  }
}
</style>
