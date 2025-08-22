"use client"

import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, LogIn, RotateCcw, Smartphone, MessageSquare, Heart, User, Menu, X, Brain, LogOut } from "lucide-react"

const Navbar = () => {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  const navItems = [
    { href: "/login", label: "Login", icon: LogIn },
    { href: "/return", label: "Return", icon: RotateCcw },
    { href: "/ebooks", label: "Ebook", icon: Smartphone },
    { href: "/requestbook", label: "Request", icon: MessageSquare },
    { href: "/donate", label: "Donate", icon: Heart },
    { href: "/ai", label: "AI Assistant", icon: Brain },
  ]

  return (
    <header className="bg-gradient-to-r from-white via-gray-50 to-gray-100 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon
              const isActive = router.pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`relative px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md h-8
                      ${isActive
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }
                      ${item.href === "/ai" ? "bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100" : ""}`}
                  >
                    <IconComponent className={`w-4 h-4 mr-2 ${item.href === "/ai" ? "text-purple-600" : ""}`} />
                    {item.label}
                    {item.href === "/ai" && (
                      <Badge
                        variant="secondary"
                        className="ml-2 bg-purple-100 text-purple-700 border-purple-200 text-xs"
                      >
                        New
                      </Badge>
                    )}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                    )}
                  </Button>
                </Link>
              )
            })}

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-1.5 transition-all duration-200 h-8"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </Button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Admin Button */}
            <Button
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/admin`)}
              variant="ghost"
              className="hidden sm:flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-1.5 transition-all duration-200 h-8"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Admin</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-900 hover:bg-gray-100 p-1.5 h-8 w-8"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <Card className="bg-white/90 border-gray-200 backdrop-blur-sm shadow-lg">
              <div className="p-3 space-y-1">
                {navItems.map((item) => {
                  const IconComponent = item.icon
                  const isActive = router.pathname === item.href
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start px-3 py-2 text-left transition-all duration-200 rounded-md h-8
                          ${isActive
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                          }
                          ${item.href === "/ai" ? "bg-gradient-to-r from-purple-50 to-blue-50" : ""}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent className={`w-4 h-4 mr-3 ${item.href === "/ai" ? "text-purple-600" : ""}`} />
                        <span className="font-medium text-sm">{item.label}</span>
                        {item.href === "/ai" && (
                          <Badge
                            variant="secondary"
                            className="ml-auto bg-purple-100 text-purple-700 border-purple-200 text-xs"
                          >
                            New
                          </Badge>
                        )}
                        {isActive && (
                          <Badge
                            variant="secondary"
                            className="ml-auto bg-blue-100 text-blue-700 border-blue-200 text-xs"
                          >
                            Active
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  )
                })}

                {/* Mobile Logout Button */}
                <div className="pt-3 border-t border-gray-200 mt-3">
                  <Button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2 transition-all duration-200 h-8"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    <span className="font-medium text-sm">Logout</span>
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
