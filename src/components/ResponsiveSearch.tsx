'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useSearch } from '@/context/SearchContext'
import { useProducts } from '@/hooks/useProducts'
import { motion, AnimatePresence } from 'framer-motion'

export default function ResponsiveSearch() {
  const [showInput, setShowInput] = useState(false)
  const { searchQuery, setSearchQuery } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { data } = useProducts()
  const allProducts = data?.products || []

  // Filtered preview results (top 5)
  const previewResults = allProducts
    .filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5)

  // Close on ESC or clicking outside
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === 'Enter') {
        setShowInput(false)
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowInput(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      {/* Desktop search bar */}
      <div className="bg-white dark:bg-black text-black dark:text-white transition-all duration-30 hidden lg:flex items-center border rounded-full px-4 py-2 bg-white shadow-sm w-[300px]">
        <Search className="text-gray-400 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 outline-none text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-gray-400"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Mobile search icon */}
      <button
        onClick={() => setShowInput(true)}
        className="bg-white dark:bg-popover text-black dark:text-white transition-all duration-30 p-2 text-gray-600 hover:text-black lg:hidden cursor-pointer"
        aria-label='Open search'
      >
        <Search size={20} />
      </button>

      {/* Animate mobile input */}
      <AnimatePresence>
        {showInput && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Animated input wrapper */}
            <motion.div
              ref={wrapperRef}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white  text-black dark:text-popover transition-all duration-30 flex items-center bg-white border rounded-full shadow px-4 py-2">
                <Search size={18} className="text-gray-400 mr-2" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Result Preview */}
              {searchQuery && previewResults.length > 0 && (
                <ul className="bg-white text-black dark:text-black transition-all duration-30 bg-white border mt-2 rounded-lg shadow text-sm divide-y">
                  {previewResults.map((p) => (
                    <li key={p.id}>
                      <a
                        href={`/products/${p.id}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowInput(false)}
                      >
                        {p.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
