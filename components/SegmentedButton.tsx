'use client'

import { capitalize } from '@/tools/utils'
import clsx from 'clsx'

type SegmentedButtonProps<T extends readonly any[]> = {
  items: T
  value: T[number]
  onValueChange?: (value: T[number]) => void
}

const SegmentedButton = <T extends readonly any[]>({
  items,
  value,
  onValueChange,
}: SegmentedButtonProps<T>) => {
  return (
    <ul className='grid grid-cols-3 place-items-center gap-2 rounded-full bg-zinc-100 p-1 font-medium text-zinc-500'>
      {items.map((item, index) => (
        <li key={index} className='w-full'>
          <button
            onClick={() => onValueChange?.(item)}
            className={clsx(
              'block w-full rounded-full p-2 text-sm tracking-wide transition-colors',
              item === value
                ? 'cursor-not-allowed bg-blue-600 text-white'
                : 'hover:bg-zinc-200 hover:text-zinc-700'
            )}
          >
            {capitalize(item)}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default SegmentedButton
