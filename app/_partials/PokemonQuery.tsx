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
          className='h-12.5 inline-flex w-full appearance-none items-center rounded-lg bg-zinc-100 px-5 text-base'
          placeholder='Search Pokemon'
          value={pokemonName}
          onChange={onChange}
        />
      </div>
      <Suspense fallback={<p className='ml-1'>Loading...</p>}>
        <PokemonSearch items={list} query={pokemonName} />
      </Suspense>
    </>
  )
}

export default PokemonQuery
