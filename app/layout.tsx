import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import ProviderQuery from '@/app/provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Pokemon',
  description: 'Catch your pokemon!',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={clsx('text-base', inter.className)}>
        <ProviderQuery>{children}</ProviderQuery>
      </body>
    </html>
  )
}

export { metadata }

export default RootLayout
