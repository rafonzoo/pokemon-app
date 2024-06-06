import { PokeBagItem } from '@/tools/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export const usePokeBag = () => {
  const queryClient = useQueryClient()
  const { data: bag } = useQuery<PokeBagItem[]>({
    queryKey: ['@@poke/bag'],
    initialData: [],
  })

  useEffect(() => {
    const storagePoke = localStorage.getItem('x-poke')

    if (!bag.length && !!storagePoke) {
      queryClient.setQueryData(['@@poke/bag'], JSON.parse(storagePoke))
    }
  }, [bag, queryClient])

  return bag
}
