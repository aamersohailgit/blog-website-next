import { NextResponse } from 'next/server'
import { parse } from 'url'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    // Using unfetch for server-side fetching
    const response = await fetch(url)
    const html = await response.text()

    // Basic metadata extraction
    const title = html.match(/<title>(.*?)<\/title>/i)?.[1] || url
    const description = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i)?.[1] || ''
    const image = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i)?.[1] || ''

    return NextResponse.json({
      title,
      description,
      image,
      url
    })
  } catch (error) {
    console.error('Error fetching preview:', error)
    return NextResponse.json({ error: 'Failed to fetch preview' }, { status: 500 })
  }
}