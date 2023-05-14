<template>
  <div>
    <div class="card-header py-2">
      <div class="d-flex">
        <div class="w-30 text-left">{{pokemonDetail.number}}</div>
        <div class="w-70 fw-700">{{ pokemonDetail.name }}</div>
        <div class="w-30"></div>
      </div>
    </div>
    <div class="card-body">
      <!-- image -->
      <div class="image-container d-flex">
        <img
          class="pokemon-image img-fluid m-auto"
          :src="pokemonDetail.image"
          :alt="`pokemon-${pokemonDetail.name}`"
        />
      </div>

      <!-- short specification -->
      <div class="d-flex justify-content-around mt-4">
        <div class="info w-30">
          <div>Flee Rate</div>
          <div>{{pokemonDetail.fleeRate}}</div>
        </div>
        <div class="info w-30">
          <div>Max CP</div>
          <div>{{pokemonDetail.maxCP}}</div>
        </div>
        <div class="info w-30">
          <div>Max HP</div>
          <div>{{pokemonDetail.maxHP}}</div>
        </div>
      </div>
    </div>
    <div class="card-footer py-2">
      <div @click="openDetail(pokemonDetail.id, pokemonDetail.name)" class="f-16 fw-700">
        Open Detail
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pokemon-card',
  props: {
    pokemonDetail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    openDetail(id, name) {
      this.$router.push({
        name: 'pokemon-detail',
          params: { id, name }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.card-header {
  background-color: #831818;
  color: white;
  border-radius: 10px 10px 0 0;
}

.card-body {
  border: 1px solid rgb(175, 175, 175);
  border-top: 0;
  border-bottom: 0;

  .image-container {
    height: 270px;
    overflow: hidden;
  }

  .pokemon-image {
    max-height: 100%;
    width: auto;
  }

  .info {
    border: 1px solid rgb(76, 208, 46);
    border-radius: 5px;
    padding: 5px 0;
    font-size: 12px;
    font-weight: bold;
  }
}

.card-footer {
  background-color: #e6b03b;
  color: white;
  border-radius: 0 0 10px 10px;
  transition: background-color 0.5s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #dba020;
  }
}
</style>

