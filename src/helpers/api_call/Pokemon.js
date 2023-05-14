import httpCall from '@/helpers/Http'

const Env = require('@/helpers/Env')

const env = new Env()

class Pokemon {
  constructor() {
    this.baseUrl = `${env.getEnv('API_URL')}`

    // pokemon list
    this.pokemonUrl = `${this.baseUrl}/`
  }

  postPokemonApi(data) {
    return httpCall.post(this.pokemonUrl, data)
  }
}

export default new Pokemon()
