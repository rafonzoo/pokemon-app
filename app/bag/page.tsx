/* eslint-disable @next/next/no-img-element */

'use client'

import { PokeBagItem } from '@/tools/types'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { usePokeBag } from '@/tools/hook'
import { setPokeName } from '@/tools/helpers'
import PageTitle from '@/components/PageTitle'

const BagPage = () => {
  const [hydrated, setHydrated] = useState(false)
  const queryClient = useQueryClient()
  const bag = usePokeBag()

  // Forces a rerender
  useEffect(() => {
    setHydrated(true)
    return () => setHydrated(false)
  }, [])

  function deletePokemon(name: string) {
    const data = queryClient.setQueryData<PokeBagItem[] | undefined>(
      ['@@poke/bag'],
      (prev) => (!prev ? prev : prev.filter((item) => item.name !== name))
    )

    if (data) {
      localStorage.setItem('x-poke', JSON.stringify(data))
    }
  }

  // Returns null on first render, so the client and server match
  if (!hydrated || !bag) {
    return null
  }

  return (
    <div className='flex h-[calc(100vh_-_56px)] min-h-[568px] flex-col'>
      <PageTitle>Poke bag</PageTitle>
      <div className='mx-auto w-[87.5%] max-w-[572px]'>
        <ul className='flex flex-wrap'>
          {bag.map((item, index) => (
            <li
              key={index}
              className='relative w-full overflow-hidden p-1 sm:w-1/2'
            >
              <div className='flex w-full items-center rounded-lg bg-zinc-100'>
                <figure className='max-w-[96px] overflow-hidden rounded-3xl bg-zinc-100'>
                  <img
                    width={96}
                    height={96}
                    src={item.imageUrl}
                    alt='Pokemon avatar'
                  />
                </figure>
                <div className='flex flex-grow flex-col truncate px-3'>
                  <p className='truncate text-lg font-semibold'>
                    {setPokeName(item.pokeName)}
                  </p>
                  <p className='truncate text-xs tracking-wider text-zinc-500'>
                    <span className='block truncate font-semibold'>
                      {item.name}
                    </span>
                    <span className='block truncate'>{item.description}</span>
                  </p>
                </div>
              </div>
              <button
                className='absolute right-4 top-3 text-xs tracking-wider text-red-600 underline'
                onClick={() => deletePokemon(item.name)}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BagPage
