export type PokeBagItem = {
  name: string
  pokeName: string
  imageUrl: string
  description: string
}

export type PokemonListItem = {
  name: string
  url: string
}

export type PokemonList = {
  count: number
  next: string
  previous: null
  results: PokemonListItem[]
}

export type Pokemon = {
  name: string
  sprites: {
    front_default: string | null
  }
  stats: {
    base_stat: number
    stat: {
      name:
        | 'hp'
        | 'attack'
        | 'defense'
        | 'special-attack'
        | 'special-defense'
        | 'speed'
    }
  }[]
  moves: {
    move: {
      name: string
    }
  }[]
  abilities: {
    ability: {
      name: string
    }
  }[]
}
