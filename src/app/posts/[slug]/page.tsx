'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  content: string
  slug: string
  created_at: string
}

export default function PostPage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (slug) {
      fetchPost(slug)
    }
  }, [slug])

  async function fetchPost(postSlug: string) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', postSlug)
        .single()

      if (error) throw error
      setPost(data)
    } catch (error) {
      console.error('Error fetching post:', error)
      router.push('/posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!post || !confirm('Are you sure you want to delete this post?')) return

    try {
      console.log('Deleting post:', post.id)

      const { error } = await supabase
        .from('posts')
        .delete()
        .match({ id: post.id })

      if (error) {
        console.error('Delete error:', error)
        throw error
      }

      console.log('Post deleted successfully')
      router.push('/posts')
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post. Please try again.')
    }
  }

  if (loading) {
    return <div className="flex justify-center p-12">Loading...</div>
  }

  if (!post) {
    return <div className="flex justify-center p-12">Post not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="/posts" className="btn btn-ghost btn-sm">
          ← Back to Posts
        </Link>
        <div className="flex gap-2">
          <Link href={`/posts/${post.slug}/edit`} className="btn btn-primary btn-sm">
            Edit Post
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-error btn-sm"
          >
            Delete
          </button>
        </div>
      </div>

      <article className="prose lg:prose-xl mx-auto">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  )
}