<template>
  <div class="container pb-3">
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
    <div v-else>
      <!-- Filter and Search -->
      <div class="pt-3 filter-container filter">
        <div class="row justify-content-between col-12">
          <div class="col-12 text-left fw-700 mb-3">
            Filter
          </div>
          <div class="col-12 col-md-6">
            <filter-pokemon-component
              :classifications="uniqueClassifications"
              :types="uniqueTypes"
              @select-classification="selectedClassification = $event"
              @select-type="selectedType = $event"
            />
          </div>
          <div class="col-12 col-md-4">
            <search-component
              :value="keyword"
              placeholder="Search pokemon"
              @input="keyword = $event"
            />
          </div>
        </div>
        <hr/>
      </div>

      <div
        class="pokemon-list"
        @scroll="onWindowScroll($event)"
      >
        <div
          class="row m-0 col-12"
          @scroll="onWindowScroll"
        >
          <div class="col-12" v-if="filteredPokemons.length === 0">
            Data not found!
          </div>
          <div
            v-else
            class="col-12 col-md-4 mb-5"
            v-for="(pokemon, index) in filteredPokemons"
            :key="index"
          >
            <pokemon-card-component
              :pokemonDetail="pokemon"
            />
          </div>
        </div>
        <div v-if="isGetMorePokemon" class="mb-4">
          <PokemonLoaderComponent
            :width="70"
            :height="50"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* import components */
import PokemonLoaderComponent from '@/components/general/PokemonLoaderComponent.vue'
import PokemonCardComponent from './components/PokemonCardComponent.vue'
import FilterPokemonComponent from './components/FilterPokemonComponent.vue'
import SearchComponent from '@/components/general/SearchComponent.vue'

/* import api */
import Pokemon from '@/helpers/api_call/Pokemon'

export default {
  name: 'pokemon-list',
  components: {
    PokemonLoaderComponent,
    PokemonCardComponent,
    FilterPokemonComponent,
    SearchComponent
  },
  data() {
    return {
      isLoading: true,
      isGetMorePokemon: false,
      isStopFetchData: false,
      errorMsg: '',
      keyword: '',
      selectedClassification: '',
      selectedType: '',
      pokemons: [],
      payload: {
        operationName: 'pokemons',
        query: `
          query pokemons($first: Int!){
            pokemons(first: $first){
              id
              number
              name
              fleeRate
              classification
              types
              maxCP
              maxHP
              image
            }
          }
        `,
        variables: {
          first: 12 // default to 12
        }
      }
    }
  },
  methods: {
    getPokemonsList() {
      Pokemon.postPokemonApi(this.payload)
        .then((res) => {
          this.pokemons = res.data.data.pokemons
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
    getMorePokemonsList() {
      this.isGetMorePokemon = true
      this.payload.variables.first += 12

      Pokemon.postPokemonApi(this.payload)
        .then((res) => {
          this.isStopFetchData = this.pokemons.length === res.data.data.pokemons.length
          this.pokemons = res.data.data.pokemons
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
          this.isGetMorePokemon = false
        }
      )
    },
    errorHandling(msg) {
      this.errorMsg = msg
    },
    onWindowScroll(event) {
      const { offsetHeight, scrollTop, scrollHeight } = event.target

      if (offsetHeight + scrollTop >= scrollHeight && !this.isStopFetchData) {
        this.getMorePokemonsList()
      }
    }
  },
  computed: {
    uniqueClassifications() {
      const classifications = new Set(this.pokemons.map(pokemon => pokemon.classification))

      return [...classifications]
    },
    uniqueTypes() {
      const types = new Set(this.pokemons.flatMap(pokemon => pokemon.types));

      return [...types]
    },
    filteredPokemons() {
      return this.pokemons.filter((pokemon) => {
        return pokemon.name.toUpperCase().includes(this.keyword.toUpperCase()) &&
              pokemon.types.some(type => type.toUpperCase().includes(this.selectedType.toUpperCase())) &&
              pokemon.classification.toUpperCase().includes(this.selectedClassification.toUpperCase())
      })
    }
  },
  mounted() {
    this.getPokemonsList()
  }
}
</script>

<style scoped lang="scss">
.h-max {
  min-height: calc(100vh - 110px);
}

.filter-container {
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.pokemon-list {
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 110px);
}
</style>

