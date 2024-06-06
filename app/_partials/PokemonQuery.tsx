'use client'

import { PokemonListItem } from '@/tools/types'
import { ChangeEvent, FC, Suspense, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import PokemonSearch from '@/app/_partials/PokemonSearch'

const PokemonQuery: FC<{ list: PokemonListItem[] }> = ({ list }) => {
  const [pokemonName, setPokemonName] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const previousQuery = useSearchParams().get('q')

  // Basically everytime user typing, we push query to search params.
  // It is very useful to get the last query if you back from detail page.
  useEffect(() => setPokemonName(previousQuery ?? ''), [previousQuery])

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setPokemonName(e.target.value)
    router.push(pathname + `?q=${e.target.value}`)
  }

  return (
    <>
      <div className='pb-4'>
        <input
          type='text'
          autoComplete='name'
          className='inline-flex h-12.5 w-full appearance-none items-center rounded-lg bg-zinc-100 px-5 text-base'
          placeholder='Search Pokemon'
          value={pokemonName}
          onChange={onChange}
        />
      </div>
      {/* Suspense a new query before showing the result, unless it cached it'd shown instantly. */}
      <Suspense fallback={<p className='ml-1'>Loading...</p>}>
        <PokemonSearch items={list} query={pokemonName} />
      </Suspense>
    </>
  )
}

export default PokemonQuery
