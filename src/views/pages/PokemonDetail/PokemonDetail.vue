<template>
  <div class="container">
    <div
      class="pt-4 fw-700 text-left cursor-pointer"
      @click="$router.push({ name: 'pokemon-list' })"
    >
      &#60; Back to Pokemon list
    </div>
    <div class="d-flex h-max" v-if="isLoading">
      <div class="m-auto">
        <PokemonLoaderComponent/>
      </div>
    </div>
    <div
      v-else-if="errorMsg"
      class="fade show alert alert-danger"
      role="alert"
      data-unq="error-info"
    >
      {{ errorMsg }}
    </div>
    <div v-else class="h-max">
      <div class="row m-0">
        <div class="col-12 col-md-6">
          <div class="pokemon-container w-100 d-flex">
            <img
              class="pokemon-image img-fluid mx-auto mt-auto"
              :src="pokemon.image"
              alt="pokemon-image"
            />
          </div>

          <div v-if="pokemon.evolutions">
            <div class="mt-2 f-22 fw-700 text-left">Evolution</div>
            <div class="evolution-list">
              <div
                v-for="(item, index) in pokemon.evolutions"
                :key="index"
                class="evolution-container d-flex mr-3"
                @click="openDetail(item.id, item.name)"
              >
                <img
                  class="pokemon-image img-fluid m-auto"
                  :src="item.image"
                  alt="pokemon-image"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="pokemon-card-detail w-100">
            <div class="f-24 fw-700">
              {{ pokemon.name }}
            </div>

            <!-- short specification -->
            <div class="d-flex justify-content-around mt-4">
              <div class="info w-30">
                <div>Flee Rate</div>
                <div>{{ pokemon.fleeRate }}</div>
              </div>
              <div class="info w-30">
                <div>Max CP</div>
                <div>{{ pokemon.maxCP }}</div>
              </div>
              <div class="info w-30">
                <div>Max HP</div>
                <div>{{ pokemon.maxHP }}</div>
              </div>
            </div>

            <div class="d-flex justify-content-center mt-4">
              <div class="info w-40 mx-2">
                <div>Weight Range</div>
                <div>{{ pokemon.weight.minimum }} - {{ pokemon.weight.maximum }}</div>
              </div>
              <div class="info w-40 mx-2">
                <div>Height Range</div>
                <div>{{ pokemon.height.minimum }} - {{ pokemon.height.maximum }}</div>
              </div>
            </div>

            <!-- More Info -->
            <div class="text-left mt-4">
              <div class="mb-3">
                <div class="title">Classification</div>
                <div>{{ pokemon.classification }}</div>
              </div>

              <div class="mb-3">
                <div class="title">Types</div>
                <div>
                  <ul>
                    <li v-for="(type, index) in pokemon.types" :key="index">
                      {{ type }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mb-3">
                <div class="title">Resistant</div>
                <div>
                  <ul>
                    <li v-for="(resistant, index) in pokemon.resistant" :key="index">
                      {{ resistant }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mb-3">
                <div class="title">Weakness</div>
                <div>
                  <ul>
                    <li v-for="(weakness, index) in pokemon.weaknesses" :key="index">
                      {{ weakness }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* import components */
import PokemonLoaderComponent from '@/components/general/PokemonLoaderComponent.vue'

/* import api */
import Pokemon from '@/helpers/api_call/Pokemon'

export default {
  name: 'pokemon-detail',
  components: {
    PokemonLoaderComponent
  },
  data() {
    return {
      isLoading: true,
      errorMsg: '',
      pokemon: {},
      payload: {
        operationName: 'pokemon',
        query: `
          query pokemon($id: String, $name: String){
            pokemon(id: $id, name: $name){
              id
              number
              name
              weight{
                minimum
                maximum
              }
              height{
                minimum
                maximum
              }
              classification
              types
              resistant
              weaknesses
              evolutions{
                id
                name
                image
              }
              fleeRate
              maxCP
              maxHP
              image
            }
          }
        `
      }
    }
  },
  methods: {
    getPokemonDetail() {
      this.payload.variables = {
        id: this.$route.params.id,
        name: this.$route.params.name,
      }

      Pokemon.postPokemonApi(this.payload)
        .then((res) => {
          this.pokemon = res.data.data.pokemon
        })
        .catch((err) => {
          if (err.response?.data?.errors?.[0]?.message) {
            this.errorHandling(err.response.data.errors[0].message)
          }
          else {
            this.errorHandling('Something went wrong at our side...')
          }
        })
        .finally(() => {
          this.isLoading = false
        }
      )
    },
    errorHandling(msg) {
      this.errorMsg = msg
    },
    openDetail(id, name) {
      this.$router.push({
        name: 'pokemon-detail',
        params: { id, name }
      })
    }
  },
  watch: {
    '$route.params': {
      handler: 'getPokemonDetail',
      immediate: true
    }
  },
  mounted() {
    this.getPokemonDetail()
  }
}
</script>

<style scoped lang="scss">
.h-max {
  min-height: calc(100vh - 182px);
  padding-bottom: 20px;
}

.pokemon-container {
  height: 445px;
  padding: 20px 0;
  border: none;
  border-bottom: 3px solid rgb(189, 187, 187);

  .pokemon-image {
    max-height: 100%;
    width: auto;
  }
}

.evolution-list {
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  width: 100%;
  height: 165px;
}

.evolution-container {
  flex: 0 0 auto;
  height: 150px;
  width: 150px;
  padding: 5px;
  border: 1px solid rgb(120, 13, 13);

  .pokemon-image {
    max-height: 100%;
    width: auto;
  }

  &:hover {
    cursor: pointer;
  }
}

.pokemon-card-detail {
  padding: 20px 20px;
  border: 1px solid rgb(189, 187, 187);
  border-radius: 10px;
}

.info {
  border: 1px solid rgb(76, 208, 46);
  border-radius: 5px;
  padding: 5px 0;
  font-size: 12px;
  font-weight: bold;
}

.title {
  font-weight: bold;
}

@media (max-width: 327px) {
  .pokemon-container {
    height: 300px;
    margin-bottom: 20px;
  }
}

@media (max-width: 767px) {
  .pokemon-container {
    margin-bottom: 20px;
  }
}
</style>

