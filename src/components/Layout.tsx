'use client'

import { ReactNode } from 'react'
import Navbar from './Navbar'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className=" bg-white dark:bg-secondary text-black dark:text-white transition-all duration-30 min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
