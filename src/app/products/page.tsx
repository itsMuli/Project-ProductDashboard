'use client'

import { useProducts } from '@/hooks/useProducts'
import ProductGrid from '@/components/ProductGrid'
import CategoryDropdown from '@/components/CategoryDropdown'
import { useState, useEffect } from 'react'
import { useSearch } from '@/context/SearchContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function ProductsPage() {
  const { data, isLoading, error } = useProducts()
  const { searchQuery } = useSearch()
  const [selectedCategory, setSelectedCategory] = useState('')

  // Show toast on error
  useEffect(() => {
    if (error) {
      toast.error('Failed to load products')
    }
  }, [error])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 ">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-lg h-60" />
        ))}
      </div>
    )
  }

  if (error) return <div className="p-4 text-red-500">Something went wrong.</div>

  const products = data?.products || []
  const categories = Array.from(new Set(products.map((p) => p.category)))

  const filtered = products.filter((product) => {
    const matchesTitle = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true
    return matchesTitle && matchesCategory
  })

  return (
    <motion.main
      className="container py-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold">All Products</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <CategoryDropdown
          value={selectedCategory}
          options={categories}
          onChange={setSelectedCategory}
        />
      </div>

      {filtered.length > 0 ? (
        <ProductGrid products={filtered} />
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No products match your search.
        </div>
      )}
    </motion.main>
  )
}
