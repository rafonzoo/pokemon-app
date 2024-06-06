'use client'

import { PokeBagItem } from '@/tools/types'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { usePokeBag } from '@/tools/hook'
import { setPokeName } from '@/tools/helpers'
import { useRouter } from 'next/navigation'
import PageTitle from '@/components/PageTitle'

const BagPage = () => {
  const [hydrated, setHydrated] = useState(false)
  const queryClient = useQueryClient()
  const bag = usePokeBag()
  const router = useRouter()

  // This page is fully depending on localStorage which only available in browser.
  // But hydration can't tolerant with it, especially in turbo. So this component
  // should return nothing while server hydration, then render after window is available.
  useEffect(() => {
    setHydrated(true)

    return () => {
      setHydrated(false)
    }
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

  // If you remove this line, its okay in production just console error.
  // But in the dev, you will see beautiful error on the screen due to
  // client and server mismatch. Work around: Turn this component to fully client component.
  if (!hydrated || !bag) {
    return null
  }

  return (
    <div className='flex h-[calc(100vh_-_56px)] min-h-[568px] flex-col'>
      <PageTitle>Poke bag</PageTitle>
      <div className='mx-auto w-[87.5%] max-w-[720px]'>
        {!bag.length && (
          <p className='text-center'>No pokemon in your bag yet.</p>
        )}
        <ul className='flex flex-wrap'>
          {bag.map((item, index) => (
            <li
              key={index}
              className='relative w-full overflow-hidden p-1 md:w-1/2'
            >
              <div className='flex w-full items-center rounded-lg bg-zinc-100'>
                <figure className='max-w-[96px] overflow-hidden rounded-3xl bg-zinc-100'>
                  {
                    // Im not recommending using next image for remote image, but
                    // Im suggesting to use SVG or image storage like AWS/imagekit/etc
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      width={96}
                      height={96}
                      src={item.imageUrl}
                      alt='Pokemon avatar'
                    />
                  }
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
                aria-label={`Visit ${item.pokeName} page`}
                title={`Visit ${item.pokeName} page`}
                onClick={() => router.push(`/${item.pokeName}`)}
                className='absolute bottom-1 left-1 right-1 top-1 rounded-lg focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[3px] focus-visible:outline-blue-300'
              />
              <button
                className='absolute right-0 top-0 z-[1] px-3.5 py-2.5 text-xs tracking-wider text-red-600 underline'
                onClick={() => deletePokemon(item.name)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BagPage
