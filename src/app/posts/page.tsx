'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  excerpt: string
  slug: string
  is_published: boolean
  published_at: string | null
  created_at: string
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  async function deletePost(id: number) {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      console.log('Deleting post:', id)

      // Delete the post
      const { error } = await supabase
        .from('posts')
        .delete()
        .match({ id }) // Use match instead of eq

      if (error) {
        console.error('Delete error:', error)
        throw error
      }

      console.log('Post deleted successfully')
      // Update the local state instead of refetching
      setPosts(posts.filter(post => post.id !== id))

    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post. Please try again.')
    }
  }

  if (loading) {
    return <div className="flex justify-center p-12">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link href="/posts/new" className="btn btn-primary">
          New Post
        </Link>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="card-title">{post.title}</h2>
                  <p className="text-base-content/70 mt-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-base-content/60">
                    <span>
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/posts/${post.slug}/edit`}
                    className="btn btn-sm btn-ghost"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="btn btn-sm btn-ghost btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 text-base-content/60">
            No posts yet. Create your first post!
          </div>
        )}
      </div>
    </div>
  )
}