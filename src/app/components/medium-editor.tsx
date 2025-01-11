'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import { common, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import DropCursor from '@tiptap/extension-dropcursor'
import { useState, useCallback } from 'react'
import { FloatingAddMenu } from './floating-add-menu'
import { AddContentButton } from './add-content-button'
import { EditorToolbar } from './editor-toolbar'

const lowlight = createLowlight(common)

interface MediumEditorProps {
  content: string
  onChange: (content: string) => void
  onTitleChange: (title: string) => void
  title: string
}

export function MediumEditor({ content, onChange, onTitleChange, title }: MediumEditorProps) {
  const [showAddButton, setShowAddButton] = useState(false)
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [addMenuPosition, setAddMenuPosition] = useState({ x: 0, y: 0 })

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false,
      }),
      Document,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return "What's the title?"
          }
          return 'Press + to add content'
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full mx-auto my-4',
        },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: 'w-full aspect-video my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      FontFamily,
      Color,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      DropCursor,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] relative',
      },
      handleDOMEvents: {
        mouseenter: (view, event) => {
          const target = event.target as HTMLElement
          const paragraph = target.closest('p')
          if (paragraph) {
            const rect = paragraph.getBoundingClientRect()
            setAddMenuPosition({
              x: rect.left - 48,
              y: rect.top + rect.height / 2,
            })
            setShowAddButton(true)
          }
          return false
        },
        mouseleave: () => {
          setShowAddButton(false)
          return false
        },
      },
    },
  })

  const handleAddClick = useCallback(() => {
    setShowAddMenu(true)
  }, [])

  const handleAddContent = useCallback((type: string) => {
    if (!editor) return

    switch (type) {
      case 'text':
        editor.chain().focus().setParagraph().run()
        break
      case 'heading':
        editor.chain().focus().toggleHeading({ level: 2 }).run()
        break
      case 'image': {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0]
          if (file) {
            // Here you would typically upload to your server/storage
            // For demo, we'll use a local URL
            const url = URL.createObjectURL(file)
            editor.chain().focus().setImage({ src: url }).run()
          }
        }
        input.click()
        break
      }
      case 'youtube': {
        const url = window.prompt('Enter YouTube URL')
        if (url) {
          const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/)?.[1]
          if (videoId) {
            editor.chain().focus().setYoutubeVideo({
              src: `https://www.youtube.com/embed/${videoId}`,
            }).run()
          }
        }
        break
      }
      case 'code':
        editor.chain().focus().toggleCodeBlock().run()
        break
      case 'embed': {
        const url = window.prompt('Enter embed URL (Twitter, Instagram, etc.)')
        if (url) {
          editor.chain().focus().setParagraph().insertContent(`
            <div class="embed-container">
              <iframe src="${url}" frameborder="0" allowfullscreen></iframe>
            </div>
          `).run()
        }
        break
      }
      case 'divider':
        editor.chain().focus().setHorizontalRule().run()
        break
    }
    setShowAddMenu(false)
  }, [editor])

  if (!editor) return null

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Title"
        className="w-full text-4xl font-bold mb-8 bg-transparent border-none outline-none placeholder:text-gray-400"
      />

      {/* Editor Toolbar */}
      <EditorToolbar editor={editor} />

      {/* Add Content Button */}
      {showAddButton && (
        <AddContentButton
          onClick={handleAddClick}
          className="fixed transition-opacity"
          style={{
            top: addMenuPosition.y,
            left: addMenuPosition.x,
            transform: 'translateY(-50%)',
          }}
        />
      )}

      {/* Floating Add Menu */}
      <FloatingAddMenu
        show={showAddMenu}
        onAdd={handleAddContent}
        position={addMenuPosition}
      />

      {/* Formatting Menu */}
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="flex gap-1 bg-base-200 rounded-lg shadow-lg p-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`btn btn-sm ${editor.isActive('bold') ? 'btn-primary' : ''}`}
          >
            <i className="fas fa-bold" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`btn btn-sm ${editor.isActive('italic') ? 'btn-primary' : ''}`}
          >
            <i className="fas fa-italic" />
          </button>
          <button
            onClick={() => {
              const url = window.prompt('Enter URL')
              if (url) editor.chain().focus().setLink({ href: url }).run()
            }}
            className={`btn btn-sm ${editor.isActive('link') ? 'btn-primary' : ''}`}
          >
            <i className="fas fa-link" />
          </button>
        </div>
      </BubbleMenu>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Add some basic styling for embeds */}
      <style jsx global>{`
        .embed-container {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          max-width: 100%;
        }
        .embed-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
}