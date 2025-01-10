export default function Home() {
  const blogPosts = [
    {
      title: "Getting Started with React Hooks",
      author: "Jane Doe",
      description: "Learn how to use React Hooks to manage state and side effects in your functional components.",
      tags: ["React", "JavaScript", "Hooks"]
    },
    {
      title: "Python for Data Science: A Beginner's Guide",
      author: "John Smith",
      description: "Discover how to use Python for data analysis, visualization, and machine learning.",
      tags: ["Python", "Data Science", "Machine Learning"]
    },
    {
      title: "Building RESTful APIs with Node.js and Express",
      author: "Alice Johnson",
      description: "A comprehensive guide to creating scalable and efficient RESTful APIs using Node.js and Express.",
      tags: ["Node.js", "Express", "API"]
    }
  ];

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

      <div className="space-y-6">
        {blogPosts.map((post, index) => (
          <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <h2 className="card-title text-2xl">{post.title}</h2>
              <p className="text-sm text-gray-500">By {post.author}</p>
              <p className="mt-2">{post.description}</p>
              <div className="card-actions mt-4">
                {post.tags.map((tag, tagIndex) => (
                  <div key={tagIndex} className="badge badge-outline">{tag}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
