'use client'

import { PokemonListItem } from '@/tools/types'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { setPokeName } from '@/tools/helpers'
import Link from 'next/link'

const MAX_ITEMS_PER_PAGE = 50

const PokemonQuery: FC<{ list: PokemonListItem[] }> = ({ list }) => {
  const [pokemonName, setPokemonName] = useState('')
  const [queriedList, setQueriedList] = useState(list)
  const [isFetching, setIsFetching] = useState(false)
  const [page, setPage] = useState(1)
  const ulRef = useRef<HTMLUListElement | null>(null)
  const filteredQuery = queriedList
    .filter((item) =>
      item.name.toLowerCase().includes(pokemonName.toLowerCase())
    )
    .slice(0, page * MAX_ITEMS_PER_PAGE)

  useEffect(() => {
    const ul = ulRef.current

    // Do not create observer if queried list is already same with the filtered result.
    if (!ul || filteredQuery.length === queriedList.length) {
      return
    }

    const lastList = Array.from(ul.childNodes)[
      filteredQuery.length - 1
    ] as HTMLElement | null

    // Infinite scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsFetching(true)
          setTimeout(() => {
            setPage((prev) => prev + 1)
            setIsFetching(false)
          }, 1_000)
        }
      })
    })

    if (lastList) {
      observer.observe(lastList)

      // Cleanup observer
      return () => {
        observer.unobserve(lastList)
      }
    }
  }, [queriedList, filteredQuery])

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value

    setQueriedList(
      list
        .filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, !value ? MAX_ITEMS_PER_PAGE : void 0)
    )

    setPokemonName(value)
    setPage(1)
    setIsFetching(false)
  }

  return (
    <>
      <div className='pb-4'>
        <input
          type='text'
          autoComplete='name'
          className='h-12.5 rounded-2.5xl inline-flex w-full appearance-none items-center bg-zinc-100 px-5 text-base'
          placeholder='Search Pokemon'
          onChange={onChange}
        />
      </div>
      {!filteredQuery?.length && <p>No pokemon found</p>}
      {pokemonName && !!filteredQuery?.length && (
        <ul
          ref={ulRef}
          className='rounded-2.5xl max-h-[518px] overflow-y-auto overflow-x-hidden border py-2 shadow'
        >
          {filteredQuery?.map((poke, index) => (
            <li key={index}>
              <Link
                prefetch={false}
                href={`/${poke.name}`}
                className='block px-6 py-4 hover:bg-zinc-100'
              >
                {setPokeName(poke.name)}
              </Link>
            </li>
          ))}
          {isFetching && (
            <li className='block px-6 py-4 text-zinc-500'>Please wait...</li>
          )}
        </ul>
      )}
    </>
  )
}

export default PokemonQuery
