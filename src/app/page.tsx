import { supabase } from '@/lib/supabase'
import { PostsList } from './components/posts-list'

export default async function Page() {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (error) {
      throw error
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <PostsList initialPosts={posts} />
      </main>
    )
  } catch (error) {
    console.error('Error:', error)
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error loading posts. Please try again later.</span>
        </div>
      </main>
    )
  }
}
