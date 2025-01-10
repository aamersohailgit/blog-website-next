import { supabase } from '@/lib/supabase'

export default async function Home() {
  try {
    // Fetch posts from Supabase
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
        <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search blog posts..."
            className="input input-bordered w-full max-w-xl"
          />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">No posts found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body">
                  <h2 className="card-title text-2xl">{post.title}</h2>
                  <p className="text-sm opacity-70">
                    By {post.author} • {new Date(post.published_at).toLocaleDateString()}
                  </p>
                  <p className="mt-2">{post.excerpt}</p>
                  <div className="card-actions mt-4">
                    {post.tags?.map((tag, tagIndex) => (
                      <div key={tagIndex} className="badge badge-primary badge-outline">{tag}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
