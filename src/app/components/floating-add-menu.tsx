'use client'

interface FloatingAddMenuProps {
  show: boolean
  onAdd: (type: string) => void
  position: { x: number; y: number }
}

export function FloatingAddMenu({ show, onAdd, position }: FloatingAddMenuProps) {
  if (!show) return null

  return (
    <div
      className="fixed z-50 bg-base-200 rounded-lg shadow-xl border border-base-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateX(-50%)',
      }}
    >
      <div className="p-2 flex flex-col gap-1">
        <button
          onClick={() => onAdd('text')}
          className="btn btn-ghost btn-sm justify-start gap-2"
        >
          <i className="fas fa-paragraph" /> Text
        </button>
        <button
          onClick={() => onAdd('heading')}
          className="btn btn-ghost btn-sm justify-start gap-2"
        >
          <i className="fas fa-heading" /> Heading
        </button>
        <button
          onClick={() => onAdd('image')}
          className="btn btn-ghost btn-sm justify-start gap-2"
        >
          <i className="fas fa-image" /> Image
        </button>
        <button
          onClick={() => onAdd('youtube')}
          className="btn btn-ghost btn-sm justify-start gap-2"
        >
          <i className="fas fa-video" /> YouTube
        </button>
        <button
          onClick={() => onAdd('code')}
          className="btn btn-ghost btn-sm justify-start gap-2"
        >
          <i className="fas fa-code" /> Code Block
        </button>
        <button
          onClick={() => onAdd('embed')}
          className="btn btn-ghost btn-sm justify-start gap-2"
        >
          <i className="fas fa-embed" /> Embed
        </button>
        <div className="divider my-1"></div>
        <button
          onClick={() => onAdd('divider')}
          className="btn btn-ghost btn-sm justify-start gap-2"
        >
          <i className="fas fa-ellipsis-h" /> Divider
        </button>
      </div>
    </div>
  )
}