export default function AboutPage() {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About CoderBlog</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg opacity-90">
                CoderBlog is a platform dedicated to sharing knowledge and experiences in the world of programming.
                We believe in making technical content accessible, engaging, and valuable for developers at all levels.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="card-title">Technical Tutorials</h3>
                    <p>In-depth guides and tutorials on various programming languages, frameworks, and tools.</p>
                  </div>
                </div>
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="card-title">Best Practices</h3>
                    <p>Industry standards and best practices for writing clean, efficient, and maintainable code.</p>
                  </div>
                </div>
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="card-title">Community Insights</h3>
                    <p>Real-world experiences and insights shared by developers from around the world.</p>
                  </div>
                </div>
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="card-title">Latest Tech News</h3>
                    <p>Stay updated with the latest trends and developments in the tech industry.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Tech Stack</h2>
              <div className="flex flex-wrap gap-4">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'DaisyUI', 'Supabase'].map((tech) => (
                  <div key={tech} className="badge badge-lg badge-primary">{tech}</div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <div className="card bg-base-200">
                <div className="card-body">
                  <p className="mb-4">
                    Have questions or suggestions? We'd love to hear from you!
                    You can reach us through any of the following channels:
                  </p>
                  <div className="flex flex-col gap-2">
                    <a href="https://github.com/aamersohailgit" className="link link-primary">
                      GitHub
                    </a>
                    <a href="https://www.youtube.com/@prograamer" className="link link-primary">
                      YouTube Channel
                    </a>
                    <a href="mailto:contact@coderblog.com" className="link link-primary">
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    )
  }