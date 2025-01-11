'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import { lowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'Write your story...',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full mx-auto my-4',
        },
      }),
      Highlight,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px]',
      },
    },
  })

  const addImage = () => {
    const url = window.prompt('Enter image URL')
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const url = window.prompt('Enter URL')
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-base-100 border-b border-base-300 mb-4">
        <div className="flex flex-wrap gap-2 p-2">
          <div className="btn-group">
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`btn btn-sm ${editor.isActive('heading', { level: 1 }) ? 'btn-primary' : ''}`}
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`btn btn-sm ${editor.isActive('heading', { level: 2 }) ? 'btn-primary' : ''}`}
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`btn btn-sm ${editor.isActive('heading', { level: 3 }) ? 'btn-primary' : ''}`}
            >
              H3
            </button>
          </div>

          <div className="btn-group">
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
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`btn btn-sm ${editor.isActive('strike') ? 'btn-primary' : ''}`}
            >
              <i className="fas fa-strikethrough" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={`btn btn-sm ${editor.isActive('highlight') ? 'btn-primary' : ''}`}
            >
              <i className="fas fa-highlighter" />
            </button>
          </div>

          <div className="btn-group">
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`btn btn-sm ${editor.isActive('blockquote') ? 'btn-primary' : ''}`}
            >
              <i className="fas fa-quote-right" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`btn btn-sm ${editor.isActive('codeBlock') ? 'btn-primary' : ''}`}
            >
              <i className="fas fa-code" />
            </button>
          </div>

          <div className="btn-group">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`btn btn-sm ${editor.isActive('bulletList') ? 'btn-primary' : ''}`}
            >
              <i className="fas fa-list-ul" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`btn btn-sm ${editor.isActive('orderedList') ? 'btn-primary' : ''}`}
            >
              <i className="fas fa-list-ol" />
            </button>
          </div>

          <div className="btn-group">
            <button onClick={setLink} className={`btn btn-sm ${editor.isActive('link') ? 'btn-primary' : ''}`}>
              <i className="fas fa-link" />
            </button>
            <button onClick={addImage} className="btn btn-sm">
              <i className="fas fa-image" />
            </button>
          </div>
        </div>
      </div>

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-base-200 rounded-lg shadow-lg p-2 flex gap-1">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`btn btn-xs ${editor.isActive('bold') ? 'btn-primary' : ''}`}
            >
              B
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`btn btn-xs ${editor.isActive('italic') ? 'btn-primary' : ''}`}
            >
              I
            </button>
            <button onClick={setLink} className={`btn btn-xs ${editor.isActive('link') ? 'btn-primary' : ''}`}>
              <i className="fas fa-link" />
            </button>
          </div>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} className="min-h-[300px] p-4" />
    </div>
  )
}