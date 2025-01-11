'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QuillEditor } from '@/app/components/quill-editor'
import { supabase } from '@/lib/supabase'

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const { error } = await supabase.from('posts').insert({
        title,
        content,
        excerpt: content.substring(0, 160).replace(/<[^>]*>/g, ''),
        slug,
        author: 'Your Name',
        is_published: true,
      })

      if (error) throw error

      router.push('/')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error creating post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => router.back()}
          className="btn btn-ghost"
        >
          <i className="fas fa-arrow-left mr-2" /> Back
        </button>
        <div className="flex gap-2">
          <button className="btn btn-ghost">Save Draft</button>
          <button
            onClick={handleSubmit}
            className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      <QuillEditor
        content={content}
        onChange={setContent}
        title={title}
        onTitleChange={setTitle}
      />
    </main>
  )
}