'use client'

interface AddContentButtonProps {
  onClick: () => void
  className?: string
}

export function AddContentButton({ onClick, className = '' }: AddContentButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute -left-12 group hover:bg-base-300 rounded-full p-2 transition-colors ${className}`}
    >
      <i className="fas fa-plus text-lg group-hover:text-primary" />
    </button>
  )
}