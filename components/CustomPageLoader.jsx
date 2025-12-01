"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { BookOpen } from "lucide-react"

const CustomPageLoader = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url) => {
      // console.log(`Loading: ${url}`)
      setLoading(true)
    }

    const handleComplete = () => {
      setLoading(false)
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  }, [router])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50/95 via-white/95 to-gray-100/95 backdrop-blur-sm">
      <div className="text-center">
        {/* Animated BookHive Logo */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto shadow-xl animate-pulse">
            <BookOpen className="w-10 h-10 text-white animate-bounce" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-ping"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent mb-2">
          BookHive
        </h2>
        <p className="text-gray-600 mb-8 text-lg">Loading your page...</p>

        {/* Animated Progress Bar */}
        <div className="w-80 h-3 bg-gray-200 rounded-full overflow-hidden mx-auto mb-6">
          <div className="h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full animate-pulse transform origin-left">
            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Spinning Loader */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}

export default CustomPageLoader
