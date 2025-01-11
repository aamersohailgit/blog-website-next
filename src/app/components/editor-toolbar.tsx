'use client'

interface EditorToolbarProps {
  editor: any
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null

  return (
    <div className="sticky top-0 z-50 bg-base-100 border-b border-base-300">
      <div className="flex flex-wrap gap-2 p-2">
        {/* Text Style Controls */}
        <div className="btn-group">
          <select
            className="select select-sm select-bordered"
            onChange={e => {
              if (e.target.value === 'normal') {
                editor.chain().focus().setParagraph().run()
              } else {
                editor.chain().focus().toggleHeading({ level: Number(e.target.value) }).run()
              }
            }}
          >
            <option value="normal">Normal</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>

          <select
            className="select select-sm select-bordered"
            onChange={e => {
              editor.chain().focus().setFontFamily(e.target.value).run()
            }}
          >
            <option value="Inter">Font</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="monospace">Monospace</option>
          </select>
        </div>

        {/* Colors */}
        <div className="btn-group">
          <input
            type="color"
            onChange={e => editor.chain().focus().setColor(e.target.value).run()}
            className="btn btn-sm"
          />
        </div>

        {/* Basic Formatting */}
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
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`btn btn-sm ${editor.isActive('underline') ? 'btn-primary' : ''}`}
          >
            <i className="fas fa-underline" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`btn btn-sm ${editor.isActive('strike') ? 'btn-primary' : ''}`}
          >
            <i className="fas fa-strikethrough" />
          </button>
        </div>

        {/* Alignment */}
        <div className="btn-group">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`btn btn-sm ${editor.isActive({ textAlign: 'left' }) ? 'btn-primary' : ''}`}
          >
            <i className="fas fa-align-left" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`btn btn-sm ${editor.isActive({ textAlign: 'center' }) ? 'btn-primary' : ''}`}
          >
            <i className="fas fa-align-center" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`btn btn-sm ${editor.isActive({ textAlign: 'right' }) ? 'btn-primary' : ''}`}
          >
            <i className="fas fa-align-right" />
          </button>
        </div>

        {/* Lists */}
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
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`btn btn-sm ${editor.isActive('taskList') ? 'btn-primary' : ''}`}
          >
            <i className="fas fa-tasks" />
          </button>
        </div>

        {/* Block Formatting */}
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

        {/* Media */}
        <div className="btn-group">
          <button
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.accept = 'image/*'
              input.onchange = async (e) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                if (file) {
                  const url = URL.createObjectURL(file)
                  editor.chain().focus().setImage({ src: url }).run()
                }
              }
              input.click()
            }}
            className="btn btn-sm"
          >
            <i className="fas fa-image" />
          </button>
          <button
            onClick={() => {
              const url = window.prompt('Enter video URL')
              if (url) {
                const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/)?.[1]
                if (videoId) {
                  editor.chain().focus().setYoutubeVideo({
                    src: `https://www.youtube.com/embed/${videoId}`,
                  }).run()
                }
              }
            }}
            className="btn btn-sm"
          >
            <i className="fas fa-video" />
          </button>
          <button
            onClick={() => {
              const url = window.prompt('Enter link URL')
              if (url) editor.chain().focus().setLink({ href: url }).run()
            }}
            className={`btn btn-sm ${editor.isActive('link') ? 'btn-primary' : ''}`}
          >
            <i className="fas fa-link" />
          </button>
        </div>

        {/* Clear Formatting */}
        <button
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className="btn btn-sm"
        >
          <i className="fas fa-remove-format" />
        </button>
      </div>
    </div>
  )
}