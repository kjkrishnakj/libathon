// import Link from "next/link"
// import { useRouter } from "next/router";
// import { useState } from "react";
// // import "icofont/css/icofont.css";
// import Image, { img } from 'next/image';

// const Navbar = () => {
//   const router = useRouter();


//   return (
//     <header className="text-white body-font bg-cyan-500">
//       <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center py-2" style={{textAlign:"center", height:"2.5cm"}}>
//         <Link href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 rounded-full" viewBox="0 0 24 24" style={{background:"#37AFE1"}}>
//             <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
//           </svg>
//           <span className="ml-3 text-xl">BookHive</span>
//         </Link>
//         <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
//           <Link href="/login" className="hover:text-gray-900 mx-3 lg:text-xl">
//             <i className="icofont-home" style={{ marginRight: '5px' }}></i>Login
//           </Link>
//           <Link href="/return" className="hover:text-gray-900 mx-3 lg:text-xl">
//             <i className="icofont-home" style={{ marginRight: '5px' }}></i>Return
//           </Link>
//           {/* <Link href="/ai" className="hover:text-gray-900 mx-3 lg:text-xl">
//             <i className="icofont-home" style={{ marginRight: '5px' }}></i>Lib-AI
//           </Link> */}
//           <Link href="/ebooks" className="hover:text-gray-900 mx-3 lg:text-xl">
//             <i className="icofont-home" style={{ marginRight: '5px' }}></i>Ebook
//           </Link>
//           <Link href="/requestbook" className="hover:text-gray-900 mx-3 lg:text-xl">
//             <i className="icofont-home" style={{ marginRight: '5px' }}></i>Request
//           </Link>
//           <Link href="/donate" className="hover:text-gray-900 mx-3 lg:text-xl">
//             <i className="icofont-home" style={{ marginRight: '5px' }}></i>Donate
//           </Link>
//           {/* <Link href ="/login"className="mr-5 hover:text-gray-900">Second</Link>
//         <Link className="mr-5 hover:text-gray-900">Third</Link>
//         <Link className="mr-5 hover:text-gray-900">Fourth</Link> */}
//         </nav>
//         {/* <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
//         <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
//           <path d="M5 12h14M12 5l7 7-7 7"></path>
//         </svg>
//       </button> */}
//         <button  onClick={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/admin`)}  className="cursor-pointer inline-flex items-center mr-3 bg-gray-100 border-0 py-3 px-3 focus:outline-none hover:bg-gray-200 rounded-full text-base my-2 md:mt-0">
         
//          <Image src="/about.png" alt="icon" width={24} height={24} /> 
//         {/* <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     stroke="currentColor"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     strokeWidth="2"
//     className="w-9 h-10 text-gray-700 p-2 bg-gray-300 rounded-full"
//     viewBox="0 0 24 24"
//   >
//     <circle cx="12" cy="8" r="4" />
//     <path d="M2 22a10 10 0 0 1 20 0H2z" />
//   </svg> */}
 

//         </button>
//       </div>
//     </header>)
// };

// export default Navbar;


"use client"

import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, LogIn, RotateCcw, Smartphone, MessageSquare, Heart, User, Menu, X } from "lucide-react"

const Navbar = () => {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { href: "/login", label: "Login", icon: LogIn },
    { href: "/return", label: "Return", icon: RotateCcw },
    { href: "/ebooks", label: "Ebook", icon: Smartphone },
    { href: "/requestbook", label: "Request", icon: MessageSquare },
    { href: "/donate", label: "Donate", icon: Heart },
  ]

  return (
    <header className="bg-gradient-to-r from-white via-gray-50 to-gray-100 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent">
                BookHive
              </h1>
              <p className="text-xs text-gray-600 -mt-1">Digital Library</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon
              const isActive = router.pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`
                      relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg
                      ${
                        isActive
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }
                    `}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {item.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                    )}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Admin Button - No Box */}
            <Button
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/admin`)}
              variant="ghost"
              className="hidden sm:flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-3 py-2 transition-all duration-200"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Admin</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-900 hover:bg-gray-100 p-2"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <Card className="bg-white/90 border-gray-200 backdrop-blur-sm shadow-lg">
              <div className="p-4 space-y-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon
                  const isActive = router.pathname === item.href

                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant="ghost"
                        className={`
                          w-full justify-start px-4 py-3 text-left transition-all duration-200 rounded-lg
                          ${
                            isActive
                              ? "bg-blue-100 text-blue-700 border border-blue-200"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                          }
                        `}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent className="w-5 h-5 mr-3" />
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700 border-blue-200">
                            Active
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  )
                })}

                {/* Mobile Admin Button */}
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <Button
                    onClick={() => {
                      router.push(`${process.env.NEXT_PUBLIC_HOST}/admin`)
                      setIsMobileMenuOpen(false)
                    }}
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-4 py-3 transition-all duration-200"
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span className="font-medium">Admin Panel</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
