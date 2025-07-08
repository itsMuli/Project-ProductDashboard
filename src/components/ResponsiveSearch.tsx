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
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const { data } = useProducts()
  const allProducts = data?.products || []

  const previewResults = allProducts
    .filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5)

  // Reset highlight index when query changes
  useEffect(() => {
    setHighlightedIndex(0)
  }, [searchQuery])

  // Focus input when mobile search is shown
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showInput])

  // Handle keyboard nav + outside click
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowInput(false)

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, previewResults.length - 1)
        )
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((prev) => Math.max(prev - 1, 0))
      }

      if (e.key === 'Enter' && previewResults[highlightedIndex]) {
        const id = previewResults[highlightedIndex].id
        window.location.href = `/products/${id}`
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
  }, [highlightedIndex, previewResults])

  return (
    <div className="relative">
      {/* Desktop search bar */}
      <div className="hidden lg:flex flex-col relative w-[300px]">
        <div className="bg-white dark:bg-black text-black dark:text-white border rounded-full px-4 py-2 shadow-sm flex items-center">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-sm bg-transparent"
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

        {searchQuery && (
          <ul className="absolute top-full mt-1 w-full z-20 bg-white dark:bg-black text-black dark:text-white border rounded-lg shadow text-sm divide-y">
            {previewResults.length > 0 ? (
              previewResults.map((p, i) => (
                <li
                  key={p.id}
                  className={`px-4 py-2 cursor-pointer transition-colors ${
                    highlightedIndex === i ? 'bg-gray-100 dark:bg-gray-800' : ''
                  }`}
                  onMouseEnter={() => setHighlightedIndex(i)}
                >
                  <a
                    href={`/products/${p.id}`}
                    className="block w-full"
                    onClick={() => setSearchQuery('')}
                  >
                    {p.title}
                  </a>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        )}
      </div>

      {/* Mobile search icon */}
      <button
        onClick={() => setShowInput(true)}
        className="bg-white dark:bg-popover text-black dark:text-white p-2 text-gray-600 hover:text-black lg:hidden"
        aria-label="Open search"
      >
        <Search size={20} />
      </button>

      {/* Mobile animated search */}
      <AnimatePresence>
        {showInput && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              ref={wrapperRef}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white text-black dark:text-popover flex items-center border rounded-full shadow px-4 py-2">
                <Search size={18} className="text-gray-400 mr-2" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 outline-none bg-transparent"
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

              <ul className="bg-white text-black dark:text-black border mt-2 rounded-lg shadow text-sm divide-y">
                {searchQuery && previewResults.length > 0 ? (
                  previewResults.map((p, i) => (
                    <li
                      key={p.id}
                      className={`px-4 py-2 cursor-pointer transition-colors ${
                        highlightedIndex === i ? 'bg-gray-100' : ''
                      }`}
                      onMouseEnter={() => setHighlightedIndex(i)}
                    >
                      <a
                        href={`/products/${p.id}`}
                        className="block w-full"
                        onClick={() => setShowInput(false)}
                      >
                        {p.title}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
