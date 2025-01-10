import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to CoderBlog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Example blog post cards */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Getting Started with Next.js</h2>
            <p>Learn how to build modern web applications with Next.js...</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Read More</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">TypeScript Best Practices</h2>
            <p>Discover the best practices for writing TypeScript code...</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Read More</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Web Development Tips</h2>
            <p>Essential tips and tricks for modern web development...</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
