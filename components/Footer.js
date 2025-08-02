// import Link from 'next/link'
// import React from 'react'

// const Footer = () => {
//     return (
//         <div>
//             <div className='text-white flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-customGreen py-5 items-center bottom-0 left-0 w-full h-[20vh]' style={{background:"#37AFE1"}}>
//                 <Link href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
//                         <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
//                     </svg>
//                     <span className="ml-3 text-xl">BookHive</span>
//                 </Link>
//                 <p className='text-sm text-customBlue-200'>All rights reserved. Copyright @book-hive</p>

//                 <div className='flex'>
//                     <div className="footer-content-right text-customBlue-200">
//                         <h2>Get in touch</h2>
//                         <ul>
//                             <li>99XXXXXXXX</li>
//                             <li>libathon.vercel.app</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Footer

"use client"

import Link from "next/link"
import { BookOpen, Github, Twitter, Facebook, Heart, ArrowUp } from "lucide-react"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-gradient-to-r from-gray-50 via-white to-gray-100 text-gray-900 border-t border-gray-200">
      {/* Main Footer Content - Horizontal Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          {/* Brand Section */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent">
                  BookHive
                </h1>
                <p className="text-xs text-gray-600 -mt-1">Digital Library</p>
              </div>
            </Link>

            {/* Social Icons */}
            <div className="flex space-x-2 ml-4">
              <a
                href="#"
                className="w-8 h-8 bg-white border border-gray-300 hover:bg-blue-600 hover:border-blue-600 rounded-md flex items-center justify-center transition-all duration-200 group shadow-sm"
              >
                <Facebook className="w-4 h-4 text-gray-600 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white border border-gray-300 hover:bg-blue-400 hover:border-blue-400 rounded-md flex items-center justify-center transition-all duration-200 group shadow-sm"
              >
                <Twitter className="w-4 h-4 text-gray-600 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white border border-gray-300 hover:bg-gray-700 hover:border-gray-700 rounded-md flex items-center justify-center transition-all duration-200 group shadow-sm"
              >
                <Github className="w-4 h-4 text-gray-600 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Legal Links - Horizontal */}
          <div className="flex items-center space-x-6 text-sm">
            <p className="text-gray-600">© 2024 BookHive. All rights reserved.</p>
            <span className="text-gray-400">•</span>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Privacy Policy
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Terms of Service
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <p className="text-gray-500 text-sm flex items-center">
              Made with <Heart className="w-3 h-3 text-red-500 mx-1" /> for book lovers
            </p>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center justify-center transition-colors duration-200 group shadow-md"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
