// 'use client';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useState } from 'react';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();

//   const isActive = (path: string) => {
//     return pathname === path ? 'text-primary' : '';
//   };

//   return (
//     <div className="navbar bg-base-200 border-b border-base-300">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </div>
//           {isMenuOpen && (
//             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
//               <li><Link href="/" className={isActive('/')}>Home</Link></li>
//               <li><Link href="/about" className={isActive('/about')}>About</Link></li>
//               <li><Link href="/contact" className={isActive('/contact')}>Contact</Link></li>
//             </ul>
//           )}
//         </div>
//         <Link href="/" className="text-xl font-semibold">
//           <span className="text-primary">&lt;&gt;</span> CoderBlog
//         </Link>
//       </div>
//       <div className="navbar-end hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           <li><Link href="/" className={isActive('/')}>Home</Link></li>
//           <li><Link href="/about" className={isActive('/about')}>About</Link></li>
//           <li><Link href="/contact" className={isActive('/contact')}>Contact</Link></li>
//         </ul>
//       </div>
//     </div>
//   );
// }