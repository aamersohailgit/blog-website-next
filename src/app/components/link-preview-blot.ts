'use client'

import Quill from 'quill'

class LinkPreviewBlot extends Quill.import('blots/block/embed') {
  static blotName = 'link-preview'
  static tagName = 'div'
  static className = 'link-preview-block'

  static create(value: { url: string; title?: string; description?: string; image?: string }) {
    const node = super.create()

    // Create link wrapper
    const link = document.createElement('a')
    link.href = value.url
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.className = 'link-preview-wrapper'

    // Create preview container
    const container = document.createElement('div')
    container.className = 'link-preview'

    // Create image container if image exists
    if (value.image) {
      const imageContainer = document.createElement('div')
      imageContainer.className = 'link-preview-image'
      const img = document.createElement('img')
      img.src = value.image
      img.alt = value.title || ''
      imageContainer.appendChild(img)
      container.appendChild(imageContainer)
    }

    // Create content container
    const content = document.createElement('div')
    content.className = 'link-preview-content'

    // Add domain name
    const domain = document.createElement('div')
    domain.className = 'link-preview-domain'
    try {
      const url = new URL(value.url)
      domain.textContent = url.hostname.replace('www.', '')
    } catch {
      domain.textContent = value.url
    }
    content.appendChild(domain)

    // Add title
    const title = document.createElement('h4')
    title.className = 'link-preview-title'
    title.textContent = value.title || ''
    content.appendChild(title)

    // Add description if available
    if (value.description) {
      const desc = document.createElement('p')
      desc.className = 'link-preview-description'
      desc.textContent = value.description
      content.appendChild(desc)
    }

    container.appendChild(content)
    link.appendChild(container)
    node.appendChild(link)
    return node
  }

  static value(node: HTMLElement) {
    const link = node.querySelector('a')
    return {
      url: link?.href || '',
      title: node.querySelector('.link-preview-title')?.textContent || '',
      description: node.querySelector('.link-preview-description')?.textContent || '',
      image: node.querySelector('img')?.src
    }
  }
}

export default LinkPreviewBlot