'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type Quill from 'quill'

interface QuillEditorProps {
  content: string
  onChange: (content: string) => void
  onTitleChange: (title: string) => void
  title: string
  isEditing?: boolean
  postId?: number
}

export function QuillEditor({ content, onChange, onTitleChange, title, isEditing, postId }: QuillEditorProps) {
  const editorRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [publishing, setPublishing] = useState(false)

  // Initialize Quill only once
  useEffect(() => {
    const initializeQuill = async () => {
      try {
        console.log('Initializing Quill editor...')
        if (typeof window === 'undefined' || !containerRef.current) return

        // If editor already exists, destroy it first
        if (editorRef.current) {
          console.log('Cleaning up existing editor...')
          editorRef.current = null
          containerRef.current.innerHTML = ''
        }

        // Import Quill and its CSS
        const Quill = (await import('quill')).default
        await import('quill/dist/quill.snow.css')

        console.log('Creating new Quill instance...')
        const editor = new Quill(containerRef.current, {
          modules: {
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'align': [] }],
              ['link', 'image'],
              ['clean']
            ]
          },
          placeholder: 'Write your story...',
          theme: 'snow'
        })

        // Set initial content
        if (content) {
          editor.root.innerHTML = content
        }

        // Set up change handler
        editor.on('text-change', () => {
          onChange(editor.root.innerHTML)
        })

        editorRef.current = editor
        console.log('Quill editor initialized successfully')
      } catch (error) {
        console.error('Error initializing Quill:', error)
      }
    }

    initializeQuill()

    // Cleanup function
    return () => {
      if (editorRef.current) {
        console.log('Cleaning up Quill editor...')
        editorRef.current = null
        if (containerRef.current) {
          containerRef.current.innerHTML = ''
        }
      }
    }
  }, []) // Empty dependency array to initialize only once

  // Auto-save functionality
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const savePost = async () => {
      if (!title || !content) return

      try {
        console.log('Auto-saving post...')
        setSaving(true)
        const slug = title
          .toLowerCase()
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .replace(/\s+/g, '-')

        const excerpt = content
          .replace(/<[^>]*>/g, '')
          .slice(0, 150) + '...'

        const postData = {
          title,
          content,
          excerpt,
          slug,
          is_published: false,
          updated_at: new Date().toISOString(),
        }

        let result;

        if (postId) {
          // Update existing post
          console.log('Updating existing post:', postId)
          result = await supabase
            .from('posts')
            .update(postData)
            .eq('id', postId)
            .select()
        } else {
          // Create new post
          console.log('Creating new post')
          result = await supabase
            .from('posts')
            .insert([postData])
            .select()
        }

        const { error } = result
        if (error) throw error

        setLastSaved(new Date())
        console.log('Post saved successfully')
      } catch (error) {
        console.error('Error saving post:', error)
      } finally {
        setSaving(false)
      }
    }

    if (title && content) {
      timeoutId = setTimeout(savePost, 3000)
    }

    return () => clearTimeout(timeoutId)
  }, [title, content, postId])

  const handlePublish = async () => {
    try {
      console.log('Publishing post...')
      setPublishing(true)
      const slug = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-')

      const excerpt = content
        .replace(/<[^>]*>/g, '')
        .slice(0, 150) + '...'

      const postData = {
        title,
        content,
        excerpt,
        slug,
        is_published: true,
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      let result;

      if (postId) {
        // Update existing post
        console.log('Publishing existing post:', postId)
        result = await supabase
          .from('posts')
          .update(postData)
          .eq('id', postId)
          .select()
      } else {
        // Create new post
        console.log('Publishing new post')
        result = await supabase
          .from('posts')
          .insert([postData])
          .select()
      }

      const { error } = result
      if (error) throw error

      console.log('Post published successfully')
      router.push('/posts')
    } catch (error) {
      console.error('Error publishing post:', error)
      alert('Failed to publish post. Please try again.')
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="sticky top-0 z-50 bg-base-100 border-b border-base-300">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/posts')}
            className="btn btn-ghost btn-sm"
          >
            ← Back to Posts
          </button>
          <div className="flex items-center gap-4">
            {lastSaved && (
              <span className="text-sm text-base-content/60">
                Last saved {lastSaved.toLocaleTimeString()}
              </span>
            )}
            {saving && (
              <span className="text-sm text-base-content/60">Saving...</span>
            )}
            <button
              onClick={handlePublish}
              disabled={publishing || !title || !content}
              className="btn btn-primary btn-sm"
            >
              {publishing ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Title"
          className="w-full text-4xl md:text-5xl font-bold mb-8 bg-transparent border-none outline-none placeholder:text-base-content/40 focus:ring-0"
        />
        <div className="bg-base-100 rounded-xl shadow-xl overflow-hidden">
          <div ref={containerRef} className="min-h-[70vh]" />
        </div>
      </div>

      <style jsx global>{`
        .ql-toolbar {
          border: none !important;
          padding: 1.5rem !important;
          border-bottom: 1px solid hsl(var(--b3)) !important;
          position: sticky;
          top: 0;
          z-index: 30;
          background: hsl(var(--b1));
        }

        .ql-container {
          border: none !important;
          font-family: inherit;
          font-size: 1.125rem;
        }

        .ql-editor {
          padding: 2rem !important;
          min-height: 70vh;
        }

        .ql-editor.ql-blank::before {
          color: hsl(var(--bc) / 0.4);
          font-style: normal;
          left: 2rem;
          font-size: 1.125rem;
        }

        /* Add more of your existing Quill styles here... */
      `}</style>
    </div>
  )
}