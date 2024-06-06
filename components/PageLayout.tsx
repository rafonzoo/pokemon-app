'use client'

import { FC, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { usePokeBag } from '@/tools/hook'

const PageLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const bag = usePokeBag()

  return (
    <main>
      <nav className='mx-auto flex max-w-[720px] justify-between px-2 py-3'>
        <button
          aria-label='Back'
          title='Back'
          className='inline-flex h-8 w-8 items-center justify-center'
          onClick={() => router.back()}
        >
          <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 512 512'
            height='24px'
            width='24px'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M427 234.625H167.296l119.702-119.702L256 85 85 256l171 171 29.922-29.924-118.626-119.701H427v-42.75z'></path>
          </svg>
        </button>
        <button
          aria-label='View bag'
          title='View bag'
          className='relative inline-flex h-8 w-8 items-center justify-center'
          onClick={() => router.push('/bag')}
        >
          <span
            id='poke-bag-counter'
            className='absolute -right-0.5 -top-0.5 flex h-5 w-5 scale-75 items-center justify-center rounded-full bg-red-600 text-xs tracking-wider text-white'
          >
            {bag?.length ?? 0}
          </span>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9.17 13H3a1 1 0 0 1-1-1C2 6.477 6.477 2 12 2c4.128 0 7.786 2.524 9.29 6.294a1 1 0 1 1-1.857.741A8.002 8.002 0 0 0 4.062 11H9.17a3.001 3.001 0 0 1 5.658 0h6.173a1 1 0 0 1 1 1c0 5.523-4.477 10-10 10a10.002 10.002 0 0 1-9.29-6.294 1 1 0 0 1 1.857-.741A8.002 8.002 0 0 0 19.939 13h-5.11a3.001 3.001 0 0 1-5.658 0zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'
              fill='currentColor'
              fillRule='nonzero'
            />
          </svg>
        </button>
      </nav>
      <div>{children}</div>
    </main>
  )
}

export default PageLayout
