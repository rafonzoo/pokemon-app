'use client'

import { Pokemon } from '@/tools/types'
import { FC, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import PokemonOther from '@/app/[name]/_partials/PokemonOther'
import PokemonStats from '@/app/[name]/_partials/PokemonStats'
import SegmentedButton from '@/components/SegmentedButton'

const details = ['stats', 'moves', 'abilities'] as const

const PokemonDetail: FC<Pokemon> = ({ stats, ...pokemon }) => {
  const [segment, setSegment] = useState<(typeof details)[number]>('stats')
  const [collapsed, setCollapsed] = useState(true)
  const pillListRef = useRef<HTMLUListElement | null>(null)
  const collapseRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const ul = pillListRef.current

    if (segment === 'moves' && ul) {
      const scrollHeight = ul.scrollHeight
      const parentHeight = ul.parentElement?.clientHeight

      if (!parentHeight) {
        return collapseRef.current?.classList.add(
          ...clsx('invisible pointer-events-none').split(' ')
        )
      }

      setCollapsed(scrollHeight !== parentHeight)
    }
  }, [segment])

  return (
    <div className='mx-auto mb-[120px] w-[87.5%] max-w-[572px]'>
      <SegmentedButton
        items={details}
        value={segment}
        onValueChange={setSegment}
      />
      <div
        className={clsx('mt-4 overflow-hidden', collapsed && 'max-h-[176px]')}
      >
        {segment === 'stats' ? (
          <PokemonStats {...{ stats }} />
        ) : (
          <PokemonOther
            ref={pillListRef}
            items={pokemon[segment]}
            currentSegment={segment === 'abilities' ? 'ability' : 'move'}
          />
        )}
      </div>
      {segment === 'moves' && (
        <button
          ref={collapseRef}
          className='mb-4 ml-2 mt-3 block text-center text-sm tracking-wide text-blue-600 hover:underline'
          onClick={() => setCollapsed((prev) => !prev)}
        >
          Show {!collapsed ? 'less' : 'all'}
        </button>
      )}
    </div>
  )
}

export default PokemonDetail
