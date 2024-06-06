import { Pokemon } from '@/tools/types'
import { FC } from 'react'
import { setPokeName } from '@/tools/helpers'
import clsx from 'clsx'

const PokemonStats: FC<{ stats: Pokemon['stats'] }> = ({ stats }) => {
  return (
    <ul>
      {stats.map(({ stat, base_stat }, index) => (
        <li
          key={index}
          className='row flex flex-nowrap items-center space-x-2 p-1 text-sm tracking-wide'
        >
          <p className='w-[130px] text-right'>
            {`${setPokeName(stat.name)} (${base_stat})`}
          </p>
          <div className='relative flex flex-grow items-center overflow-hidden rounded-full'>
            <span className='block h-3 w-full bg-zinc-100' />
            <span
              style={{ width: `${base_stat}%` }}
              className={clsx(
                'absolute left-0 top-0 block h-3 w-full rounded-full transition-transform',
                stat.name === 'hp' && 'bg-red-500',
                stat.name === 'attack' && 'bg-yellow-300',
                stat.name === 'defense' && 'bg-blue-500',
                stat.name === 'special-attack' && 'bg-orange-500',
                stat.name === 'special-defense' && 'bg-teal-500',
                stat.name === 'speed' && 'bg-purple-500'
              )}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default PokemonStats
