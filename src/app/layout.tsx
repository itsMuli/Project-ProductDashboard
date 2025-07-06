import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Layout from '@/components/Layout'
import { SearchProvider } from '@/context/SearchContext'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Product Dashboard',
  description: 'Explore and search products easily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className='light'>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <Providers>
          <SearchProvider>
            <Layout>{children}</Layout>
          </SearchProvider>
        </Providers>
      </body>
    </html>
  )
}