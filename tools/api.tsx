import { callApi } from '@/tools/helpers'
import { Pokemon, PokemonList } from '@/tools/types'

export async function getAllPokemon() {
  try {
    const response = await fetch(callApi('/pokemon?limit=100000&offset=0'))
    const json = (await response.json()) as PokemonList

    return json
  } catch (error) {
    return { results: [] }
  }
}

export async function getPokemonByName(name: string) {
  try {
    const response = await fetch(callApi(`/pokemon/${name}`))
    const json = (await response.json()) as Pokemon

    return json
  } catch (error) {
    return null
  }
}
