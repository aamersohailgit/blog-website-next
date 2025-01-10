import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
import { ThemeToggle } from './components/theme-toggle'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CoderBlog',
  description: 'A blog for coders and programmers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="night">
      <body className="transition-colors duration-300">
        <ThemeProvider>
          <nav className="navbar bg-base-200 border-b border-base-300">
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost text-xl">
                <span className="text-primary">&lt;&gt;</span> CoderBlog
              </Link>
            </div>
            <div className="flex-none gap-4">
              <ul className="menu menu-horizontal px-1">
                <li><Link href="/" className="btn btn-ghost">Home</Link></li>
                <li><Link href="/about" className="btn btn-ghost">About</Link></li>
                <li><Link href="/contact" className="btn btn-ghost">Contact</Link></li>
              </ul>
              <ThemeToggle />
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User avatar" />
                    </div>
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge badge-primary badge-sm">New</span>
                    </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li><a>Logout</a></li>
                </ul>
              </div>
            </div>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}