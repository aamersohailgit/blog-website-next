'use client'

import { useState } from 'react'
import type { Database } from '@/lib/database.types'
import { SearchBar } from './search-bar'

type Post = Database['public']['Tables']['posts']['Row']

export function PostsList({ initialPosts }: { initialPosts: Post[] }) {
  const [filteredPosts, setFilteredPosts] = useState(initialPosts)

  return (
    <div className="max-w-5xl mx-auto">
      <SearchBar posts={initialPosts} onSearch={setFilteredPosts} />

      <h1 className="text-4xl font-bold mb-8 text-center">Latest Blog Posts</h1>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No posts found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <h2 className="card-title text-2xl">{post.title}</h2>
                <p className="text-sm opacity-70">
                  By {post.author} • {new Date(post.published_at).toLocaleDateString()}
                </p>
                <p className="mt-2">{post.excerpt}</p>
                <div className="card-actions mt-4">
                  {post.tags?.map((tag: string, tagIndex: number) => (
                    <div key={tagIndex} className="badge badge-primary badge-outline">{tag}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}