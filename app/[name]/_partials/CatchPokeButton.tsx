'use client'

import { FC, MouseEvent, useRef, useState } from 'react'
import CatchPokeDialog from '@/app/[name]/_partials/CatchPokeDialog'

type CatchPokeButtonProps = {
  name: string
  imageUrl: string | null
}

const CatchPokeButton: FC<CatchPokeButtonProps> = ({ name, imageUrl }) => {
  const [isCatching, setIsCatching] = useState(false)
  const [isCatched, setIsCatched] = useState(false)
  const [isShowSheet, setIsShowSheet] = useState(false)
  const lastFocusElement = useRef<HTMLButtonElement | null>(null)

  async function catchPokemon(e: MouseEvent<HTMLButtonElement>) {
    lastFocusElement.current = e.currentTarget

    setIsCatching(true)
    setTimeout(() => {
      setIsCatched(true)
      setIsCatching(false)
      setIsShowSheet(true)
    }, 3_00)
  }

  return (
    <>
      <button
        className='mx-auto flex h-14 w-[87.5%] max-w-[572px] items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition-colors hover:bg-blue-900 disabled:pointer-events-none disabled:opacity-50'
        disabled={isCatching || isCatched}
        tabIndex={isCatching || isCatched ? -1 : 0}
        onClick={catchPokemon}
      >
        {isCatching ? 'Catching...' : isCatched ? 'Catched!' : `Catch ${name}`}
      </button>
      {isShowSheet && (
        <CatchPokeDialog
          {...{ name, imageUrl }}
          onClose={() => {
            setIsShowSheet(false)
            setIsCatched(false)
            setTimeout(() => lastFocusElement.current?.focus(), 200)
          }}
        />
      )}
    </>
  )
}

export default CatchPokeButton
