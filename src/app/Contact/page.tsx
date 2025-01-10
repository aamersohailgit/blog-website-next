export default function Contact() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <div className="max-w-md">
        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" placeholder="Your name" className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="your.email@example.com" className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea className="textarea textarea-bordered h-32" placeholder="Your message"></textarea>
          </div>

          <button className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </main>
  )
}