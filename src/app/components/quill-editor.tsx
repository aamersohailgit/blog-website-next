'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import type Quill from 'quill'
import 'quill/dist/quill.snow.css'
import LinkPreviewBlot from './link-preview-blot'

interface QuillEditorProps {
  content: string
  onChange: (content: string) => void
  onTitleChange: (title: string) => void
  title: string
}

export function QuillEditor({ content, onChange, onTitleChange, title }: QuillEditorProps) {
  const editorRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('quill').then((Quill) => {
        // Register custom formats
        Quill.default.register('formats/link-preview', LinkPreviewBlot)

        if (containerRef.current && !editorRef.current) {
          const editor = new Quill.default(containerRef.current, {
            modules: {
              toolbar: {
                container: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'color': [] }, { 'background': [] }],
                  [{ 'align': [] }],
                  ['blockquote', 'code-block'],
                  ['link', 'image', 'video'],
                  ['clean']
                ],
                handlers: {
                  link: async function(value: boolean) {
                    if (value) {
                      const url = prompt('Enter URL:')
                      if (url) {
                        await handleLinkInsertion(editor, url)
                      }
                    } else {
                      editor.format('link', false)
                    }
                  }
                }
              },
              clipboard: {
                matchVisual: false,
                matchers: [
                  ['text', async function(node: HTMLElement, delta: any) {
                    const text = node.textContent || ''
                    // URL regex pattern
                    const urlPattern = /^(https?:\/\/[^\s]+)$/

                    if (urlPattern.test(text)) {
                      // If the pasted text is a URL, convert it to a preview
                      await handleLinkInsertion(editor, text)
                      return new Delta() // Return empty delta to prevent default paste
                    }
                    return delta
                  }]
                ]
              }
            },
            placeholder: 'Write your story...',
            theme: 'snow'
          })

          editor.on('text-change', () => {
            onChange(editor.root.innerHTML)
          })

          // Handle paste event for URLs
          editor.root.addEventListener('paste', async (e: ClipboardEvent) => {
            const text = e.clipboardData?.getData('text')
            if (text) {
              const urlPattern = /^(https?:\/\/[^\s]+)$/
              if (urlPattern.test(text)) {
                e.preventDefault()
                await handleLinkInsertion(editor, text)
              }
            }
          })

          if (content) {
            editor.root.innerHTML = content
          }

          editorRef.current = editor
        }
      })
    }
  }, [onChange, content])

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Title"
        className="w-full text-5xl font-bold mb-8 bg-transparent border-none outline-none placeholder:text-gray-400 focus:ring-0"
      />

      {/* Quill Editor Container */}
      <div className="bg-base-100 rounded-lg shadow-lg">
        <div ref={containerRef} className="min-h-[300px]" />
      </div>

      {/* Custom styles for Quill */}
      <style jsx global>{`
        /* Remove borders and add smooth transitions */
        .ql-toolbar.ql-snow,
        .ql-container.ql-snow {
          border: none !important;
        }

        .ql-toolbar {
          padding: 1.5rem !important;
          background: hsl(var(--b2));
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid hsl(var(--b3)) !important;
        }

        .ql-container {
          font-family: inherit;
          font-size: 1.125rem;
          line-height: 1.75;
        }

        .ql-editor {
          min-height: 500px;
          padding: 2rem;
        }

        /* Placeholder styling */
        .ql-editor.ql-blank::before {
          color: hsl(var(--bc) / 0.5);
          font-style: normal;
          font-size: 1.125rem;
        }

        /* Theme-aware icons with smooth transitions */
        .ql-snow.ql-toolbar button,
        .ql-snow .ql-toolbar button {
          color: hsl(var(--bc));
          transition: all 0.2s ease;
        }

        .ql-snow.ql-toolbar button:hover,
        .ql-snow .ql-toolbar button:hover,
        .ql-snow.ql-toolbar button.ql-active,
        .ql-snow .ql-toolbar button.ql-active {
          color: hsl(var(--p));
        }

        .ql-snow.ql-toolbar button:hover .ql-stroke,
        .ql-snow .ql-toolbar button:hover .ql-stroke,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke,
        .ql-snow .ql-toolbar button.ql-active .ql-stroke {
          stroke: hsl(var(--p));
        }

        .ql-snow.ql-toolbar button:hover .ql-fill,
        .ql-snow .ql-toolbar button:hover .ql-fill,
        .ql-snow.ql-toolbar button.ql-active .ql-fill,
        .ql-snow .ql-toolbar button.ql-active .ql-fill {
          fill: hsl(var(--p));
        }

        /* Media content styling */
        .ql-editor img {
          max-width: 100%;
          height: auto;
          margin: 2rem auto;
          display: block;
          border-radius: 0.5rem;
        }

        .ql-editor iframe {
          max-width: 100%;
          margin: 2rem auto;
          display: block;
          border-radius: 0.5rem;
          aspect-ratio: 16/9;
        }

        .ql-editor p {
          margin-bottom: 1.5rem;
        }

        .ql-editor blockquote {
          border-left: 4px solid hsl(var(--p));
          padding-left: 1rem;
          margin: 2rem 0;
          color: hsl(var(--bc) / 0.8);
        }

        .ql-editor pre.ql-syntax {
          background: hsl(var(--b1));
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin: 2rem 0;
          font-family: monospace;
        }

        /* Dropdown menus */
        .ql-snow .ql-picker {
          color: hsl(var(--bc));
        }

        .ql-snow .ql-picker-options {
          background: hsl(var(--b1));
          border: 1px solid hsl(var(--b3));
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        /* Color picker */
        .ql-snow .ql-color-picker .ql-picker-options {
          padding: 0.5rem;
        }

        /* Links */
        .ql-editor a {
          color: hsl(var(--p));
          text-decoration: underline;
          transition: color 0.2s ease;
        }

        .ql-editor a:hover {
          color: hsl(var(--pf));
        }

        /* Enhanced media styling */
        .ql-editor .link-preview-block {
          display: block;
          text-decoration: none;
          margin: 2rem 0;
          border-radius: 0.5rem;
          overflow: hidden;
          border: 1px solid hsl(var(--b3));
          transition: all 0.2s ease;
        }

        .ql-editor .link-preview {
          display: flex;
          gap: 1rem;
          padding: 1rem;
        }

        .ql-editor .link-preview img {
          width: 200px;
          height: 134px;
          object-fit: cover;
          margin: 0;
          border-radius: 0.25rem;
        }

        .ql-editor .link-preview-content {
          flex: 1;
          min-width: 0;
        }

        .ql-editor .link-preview h4 {
          margin: 0 0 0.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: hsl(var(--bc));
        }

        .ql-editor .link-preview p {
          margin: 0;
          color: hsl(var(--bc) / 0.8);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .ql-editor iframe {
          width: 100%;
          aspect-ratio: 16/9;
          margin: 2rem auto;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .ql-editor img {
          max-width: 100%;
          height: auto;
          margin: 2rem auto;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        /* Enhanced Link Preview Styling */
        .ql-editor .link-preview-block {
          margin: 2rem 0;
          cursor: pointer;
        }

        .ql-editor .link-preview-wrapper {
          display: block;
          text-decoration: none;
          color: inherit;
          border: 1px solid hsl(var(--b3));
          border-radius: 0.75rem;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .ql-editor .link-preview-wrapper:hover {
          border-color: hsl(var(--p));
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .ql-editor .link-preview {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem;
        }

        .ql-editor .link-preview-image {
          flex-shrink: 0;
          width: 200px;
          height: 134px;
          border-radius: 0.5rem;
          overflow: hidden;
          background: hsl(var(--b2));
        }

        .ql-editor .link-preview-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          margin: 0;
        }

        .ql-editor .link-preview-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .ql-editor .link-preview-domain {
          font-size: 0.875rem;
          color: hsl(var(--bc) / 0.7);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .ql-editor .link-preview-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: hsl(var(--bc));
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ql-editor .link-preview-description {
          margin: 0;
          font-size: 0.95rem;
          color: hsl(var(--bc) / 0.8);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* YouTube Embed Styling */
        .ql-editor iframe.ql-video {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 0.75rem;
          margin: 2rem 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Mobile Responsive */
        @media (max-width: 640px) {
          .ql-editor .link-preview {
            flex-direction: column;
            gap: 1rem;
          }

          .ql-editor .link-preview-image {
            width: 100%;
            height: 200px;
          }
        }
      `}</style>
    </div>
  )
}

// Helper function to handle link insertion
async function handleLinkInsertion(editor: any, url: string) {
  try {
    // Show loading state
    const range = editor.getSelection()
    const index = range?.index || 0
    editor.insertText(index, 'Loading preview...')

    // Check if it's a YouTube URL
    const youtubeMatch = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    )

    if (youtubeMatch) {
      // Remove loading text
      editor.deleteText(index, 'Loading preview...'.length)
      // Insert YouTube embed
      const videoId = youtubeMatch[1]
      editor.insertEmbed(
        index,
        'video',
        `https://www.youtube.com/embed/${videoId}`
      )
    } else {
      try {
        // Fetch link preview
        const preview = await fetchLinkPreview(url)
        // Remove loading text
        editor.deleteText(index, 'Loading preview...'.length)
        // Insert link preview
        editor.insertEmbed(index, 'link-preview', {
          url,
          title: preview.title,
          description: preview.description,
          image: preview.image
        })
      } catch (error) {
        console.error('Error fetching preview:', error)
        // Remove loading text and fallback to regular link
        editor.deleteText(index, 'Loading preview...'.length)
        editor.insertText(index, url, { link: url })
      }
    }
  } catch (error) {
    console.error('Error handling link:', error)
    const range = editor.getSelection()
    editor.deleteText(range?.index || 0, 'Loading preview...'.length)
    editor.insertText(range?.index || 0, url, { link: url })
  }
}

// Helper function to fetch link previews
async function fetchLinkPreview(url: string) {
  const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`)
  if (!response.ok) {
    throw new Error('Failed to fetch preview')
  }
  return response.json()
}