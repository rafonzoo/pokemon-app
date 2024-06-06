'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, ReactNode, useState } from 'react'

const ProviderQuery: FC<{ children?: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            enabled: false, // We go manually
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ProviderQuery
