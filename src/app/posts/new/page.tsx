'use client'

import { useState } from 'react'
import { QuillEditor } from '@/app/components/quill-editor'

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <QuillEditor
      content={content}
      onChange={setContent}
      title={title}
      onTitleChange={setTitle}
    />
  )
}