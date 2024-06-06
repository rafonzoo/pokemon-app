'use client'

import { FC, use } from 'react'
import { setPokeName } from '@/tools/helpers'
import { PokemonListItem } from '@/tools/types'
import Link from 'next/link'

type PokemonSearchProps = {
  items: PokemonListItem[]
  query: string
}

// Because we already have all pokemon (no query-name base for the API),
// we can simulate caching logic with our own.
const cache = new Map()

function fetchData(args: PokemonSearchProps) {
  // Everytime user type with the same query, they will hit the cache.
  // Otherwise `Suspense` will triggered.
  if (!cache.has(args.query)) {
    cache.set(args.query, getData(args))
  }

  return cache.get(args.query) as Promise<PokemonListItem[]>
}

async function getData({ items, query }: PokemonSearchProps) {
  // Here we simulate named base query since the API not provide it.
  await new Promise((resolve) => setTimeout(resolve, 500))

  const lowerQuery = query.trim().toLowerCase()
  const result = items.filter((item) => {
    const lowerName = item.name.toLowerCase()

    return (
      lowerName.startsWith(lowerQuery) ||
      lowerName.indexOf(' ' + lowerQuery) !== -1
    )
  })

  return result
}

const PokemonSearch: FC<PokemonSearchProps> = ({ items, query }) => {
  if (!query) {
    return null
  }

  // The new "use" API will trigger suspense.
  const list = use(fetchData({ items, query }))

  if (!list.length) {
    return (
      <p className='ml-1'>
        No matches for <i>{`"${query}"`}</i>
      </p>
    )
  }

  return (
    <ul className='max-h-[400px] overflow-y-auto overflow-x-hidden rounded-lg border py-2 shadow'>
      {list?.map((poke, index) => (
        <li key={index}>
          <Link
            // Do not prefetch the link that shown in this result. Because
            // we don't need prefetch about > 10 items in a row.
            prefetch={false}
            href={`/${poke.name}`}
            className='block px-5 py-3 hover:bg-zinc-100'
          >
            {setPokeName(poke.name)}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PokemonSearch
