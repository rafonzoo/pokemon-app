import { Pokemon } from '@/tools/types'
import { ForwardedRef, forwardRef } from 'react'

type PokemonOtherProps = {
  items: Pokemon['moves'] | Pokemon['abilities']
  currentSegment: 'move' | 'ability'
}

const PokemonOther = forwardRef(function PokemonOtherRef(
  { items, currentSegment }: PokemonOtherProps,
  ref: ForwardedRef<HTMLUListElement>
) {
  return (
    <ul ref={ref} className='flex flex-wrap text-sm tracking-wide'>
      {items.map((item, index) => (
        <li key={index} className='p-1'>
          <div className='cursor-default rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-500 transition-colors hover:bg-blue-100'>
            {
              // @ts-expect-error
              item[currentSegment].name
            }
          </div>
        </li>
      ))}
    </ul>
  )
})

export default PokemonOther
