'use client'

import { PokeBagItem } from '@/tools/types'
import { useQueryClient } from '@tanstack/react-query'
import { FC, useRef, useEffect, KeyboardEvent, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { usePokeBag } from '@/tools/hook'
import clsx from 'clsx'

type CatchPokeDialogProps = {
  name: string
  imageUrl: string | null
  onClose?: () => void
}

const CatchPokeDialog: FC<CatchPokeDialogProps> = ({
  name,
  imageUrl,
  onClose,
}) => {
  const overlayButtonRef = useRef<HTMLButtonElement | null>(null)
  const cancelRef = useRef<HTMLButtonElement | null>(null)
  const queryClient = useQueryClient()
  const router = useRouter()
  const previousBag = usePokeBag()
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm<PokeBagItem>({
    defaultValues: {
      name: '',
      pokeName: name,
      description: '',
      imageUrl: imageUrl ?? '',
    },
  })

  const addToBag: SubmitHandler<PokeBagItem> = (values) => {
    if (!previousBag) return

    if (previousBag.some((item) => item.name === values.name)) {
      return setError('Nickname already exist')
    }

    if (!values.name.trim()) {
      return setError('Please fill this input')
    }

    const data = queryClient.setQueryData<PokeBagItem[]>(
      ['@@poke/bag'],
      (prev) => (!prev ? prev : [values, ...prev])
    )

    if (data) {
      localStorage.setItem('x-poke', JSON.stringify(data))
      router.push('/bag')
    }
  }

  // Trap focus for the first time
  useEffect(() => overlayButtonRef.current?.focus(), [])

  function focusToOverlay(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Tab' && !e.shiftKey) {
      overlayButtonRef.current?.focus()
      e.preventDefault()
    }
  }

  function focusToCancel(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Tab' && e.shiftKey) {
      cancelRef.current?.focus()
      e.preventDefault()
    }
  }

  return (
    <div className='fixed bottom-0 left-0 flex h-screen w-screen items-center justify-center'>
      <button
        ref={overlayButtonRef}
        className='absolute bottom-0 left-0 right-0 top-0 bg-black/50 focus-within:shadow-[0_0_0_2px_#93c5fd_inset]'
        aria-label='Close sheet'
        title='Close sheet'
        onClick={onClose}
        onKeyDown={focusToCancel}
      />
      <div className='relative z-[1] mx-auto w-[87.5%] max-w-[572px]'>
        <div className='w-full rounded-xl bg-white p-4'>
          <h2 className='text-center text-xl font-bold'>Catched!</h2>
          <form onSubmit={handleSubmit(addToBag)} className='space-y-3'>
            <input type='hidden' {...register('imageUrl')} />
            <input type='hidden' {...register('pokeName')} />
            <div>
              {error && (
                <p className='mx-auto mb-2 block text-sm tracking-wide text-red-600'>
                  {error}
                </p>
              )}
              <input
                type='text'
                {...register('name')}
                placeholder='Give a nickname...'
                className={clsx(
                  'border-1 inline-flex h-11 w-full appearance-none items-center rounded-lg border px-4 outline-offset-0 focus:border-blue-600 focus:outline focus:outline-[3px] focus:outline-blue-300',
                  error && '!border-red-600 outline outline-[3px] !outline-red-300' // prettier-ignore
                )}
              />
            </div>
            <div>
              <textarea
                {...register('description')}
                placeholder='Optional description...'
                className='min-h-[14rem] w-full appearance-none items-center rounded-lg border px-4 py-4 outline-offset-0 focus:border-blue-600 focus:outline focus:outline-[3px] focus:outline-blue-300'
              />
            </div>
            <div>
              <button
                type='submit'
                className='flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition-colors hover:bg-blue-900 disabled:pointer-events-none disabled:opacity-50'
              >
                Save
              </button>
              <button
                className='mx-auto mt-2 block text-sm tracking-wide text-red-600 underline'
                onClick={onClose}
                ref={cancelRef}
                onKeyDown={focusToOverlay}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CatchPokeDialog
