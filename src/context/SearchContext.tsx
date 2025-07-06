'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type SearchContextType = {
  searchQuery: string
  setSearchQuery: (value: string) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) throw new Error('useSearch must be used inside <SearchProvider>')
  return context
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  )
}
