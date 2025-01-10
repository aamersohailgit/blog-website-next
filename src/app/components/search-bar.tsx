'use client'

import { useState } from 'react'
import type { Database } from '@/lib/database.types'

type Post = Database['public']['Tables']['posts']['Row']

interface SearchBarProps {
  posts: Post[]
  onSearch: (filteredPosts: Post[]) => void
}

export function SearchBar({ posts, onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (term: string) => {
    setSearchTerm(term)

    const filtered = posts.filter((post) => {
      const searchLower = term.toLowerCase()
      return (
        post.title?.toLowerCase().includes(searchLower) ||
        post.excerpt?.toLowerCase().includes(searchLower) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      )
    })

    onSearch(filtered)
  }

  return (
    <div className="form-control w-full max-w-4xl mx-auto mb-12 mt-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search posts by title, content, or tags..."
          className="input input-bordered input-lg w-full pr-16 text-lg"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="btn btn-primary btn-lg absolute top-0 right-0 rounded-l-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}