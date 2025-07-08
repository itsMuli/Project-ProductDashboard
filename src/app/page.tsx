'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <motion.main
      className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 text-center bg-white dark:bg-secondary text-black dark:text-white transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-700 dark:text-green-400">
        Welcome to the Product Dashboard
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-6">
        Discover a wide variety of high-quality products across categories. Browse, filter, and find exactly what you need.
      </p>

      <Link href="/products">
        <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg rounded-full shadow-lg hover:scale-105 transition-transform">
          Explore Products
        </Button>
      </Link>
    </motion.main>
  )
}
