'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { QuillEditor } from '@/app/components/quill-editor'
import { supabase } from '@/lib/supabase'

interface Post {
  id: number
  title: string
  content: string
  slug: string
}

export default function EditPostPage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (slug) {
      console.log('Fetching post for editing:', slug)
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
      if (data) {
        console.log('Post fetched successfully:', data.title)
        setPost(data)
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      alert('Failed to load post for editing')
      router.push('/posts')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center p-12">Loading...</div>
  }

  if (!post) {
    return <div className="flex justify-center p-12">Post not found</div>
  }

  return (
    <QuillEditor
      key={`editor-${post.id}`}
      content={post.content}
      onChange={(content) => setPost({ ...post, content })}
      title={post.title}
      onTitleChange={(title) => setPost({ ...post, title })}
      isEditing={true}
      postId={post.id}
    />
  )
}