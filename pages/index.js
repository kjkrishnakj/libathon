// "use client"
// import Book from "../models/Book"
// import mongoose from "mongoose"
// import Link from "next/link"
// import { useState } from "react"
// import { useEffect } from "react"
// import "aos/dist/aos.css"
// import AOS from "aos"
// import Spotlight from "@/components/Spotlight"
// import LeaderBoards from "@/components/LeaderBoards"
// import Head from "next/head"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Search, BookOpen, Star, TrendingUp, Clock, Eye } from "lucide-react"

// export default function Home({ books }) {
//   useEffect(() => {
//     AOS.init()
//     // Stop camera if token is present
//     const token = localStorage.getItem("token")
//     if (token) {
//       stopCamera()
//     }
//   }, [])

//   const stopCamera = () => {
//     const video = document.getElementById("videoElement")
//     if (video && video.srcObject) {
//       const tracks = video.srcObject.getTracks()
//       tracks.forEach((track) => track.stop()) // Stop all camera tracks
//       video.srcObject = null
//       console.log("Camera stopped due to token presence.")
//     }
//   }

//   const [searchText, setSearchText] = useState("")
//   const [dropdown, setDropdown] = useState(false)
//   const [foundbook, setFoundbook] = useState("")

//   const handleSearchSubmit = async (e) => {
//     setSearchText(e.target.value)
//     e.preventDefault()
//     const data = { searchText }
//     const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getbook`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//     const response = await res.json()
//     if (response.success) {
//       setFoundbook(response.book)
//       if (searchText.length <= 1) {
//         setDropdown(false)
//       } else {
//         setDropdown(true)
//       }
//     } else {
//       console.log("err")
//     }
//   }

//   return (
//     <>
//       <Head>
//         <title>BookHive | Home</title>
//       </Head>

//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
//         {/* Hero Section */}
//         <div className="relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white/80 to-gray-50/50"></div>
//           <div className="absolute inset-0">
//             <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
//             <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl"></div>
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
//           </div>

//           <div className="relative z-10 py-24 px-4">
//             <div className="max-w-4xl mx-auto text-center">
//               <div className="mb-8">
//                 <BookOpen className="w-16 h-16 mx-auto mb-6 text-blue-600" />
//                 <h1 className="text-6xl sm:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent">
//                   BookHive
//                 </h1>
//                 <p className="text-xl sm:text-2xl text-gray-600 mb-8">Your Digital Library Ecosystem</p>
//                 <div className="flex items-center justify-center gap-6 text-gray-500">
//                   <div className="flex items-center gap-2">
//                     <Star className="w-5 h-5 text-blue-600" />
//                     <span>Premium Collection</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <TrendingUp className="w-5 h-5 text-gray-500" />
//                     <span>Always Updated</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Spotlight and Leaderboards Section */}
//         <div className="py-16 px-4">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <Spotlight />
//               <LeaderBoards />
//             </div>
//           </div>
//         </div>

//         {/* Search Section */}
//         <div className="py-16 px-4 bg-gray-50/50">
//           <div className="max-w-2xl mx-auto">
//             <div className="text-center mb-12">
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-gray-700 bg-clip-text text-transparent mb-4">
//                 Discover Books
//               </h2>
//               <p className="text-xl text-gray-600">Search through our curated collection</p>
//             </div>

//             <Card className="bg-white/80 border-gray-200 backdrop-blur-sm shadow-lg">
//               <CardContent className="p-8">
//                 <form className="flex gap-4">
//                   <div className="relative flex-1">
//                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <Input
//                       value={searchText}
//                       onChange={handleSearchSubmit}
//                       type="text"
//                       className="pl-12 h-14 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 text-lg"
//                       placeholder="Enter book title..."
//                     />
//                   </div>
//                   <Button
//                     type="submit"
//                     onClick={handleSearchSubmit}
//                     className="h-14 px-8 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold text-lg"
//                   >
//                     Search
//                   </Button>
//                 </form>

//                 {dropdown && (
//                   <div className="mt-8">
//                     <Card className="bg-white/90 border-gray-200 backdrop-blur-sm shadow-lg">
//                       <CardContent className="p-6">
//                         <Link passHref={true} href={`/book/${foundbook.slug}`}>
//                           <div className="group cursor-pointer">
//                             <div className="flex gap-6">
//                               <div className="relative overflow-hidden rounded-xl flex-shrink-0">
//                                 <img
//                                   src={foundbook.img || "/placeholder.svg"}
//                                   alt=""
//                                   className="w-32 h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                               </div>
//                               <div className="flex-1 space-y-4">
//                                 <div>
//                                   <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
//                                     {foundbook.title}
//                                   </h3>
//                                   <p className="text-lg text-gray-600 mt-2">by {foundbook.author}</p>
//                                 </div>
//                                 <div className="flex gap-3">
//                                   <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
//                                     Row: {foundbook.row}
//                                   </Badge>
//                                   <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
//                                     Class: {foundbook.cnum}
//                                   </Badge>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Books Catalog Section */}
//         <div className="py-16 px-4">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent mb-6">
//                 Our Collection
//               </h2>
//               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//                 Explore thousands of carefully curated books across all genres and subjects
//               </p>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6" id="catalog">
//               {Object.keys(books).map((item) => {
//                 return (
//                   <Link
//                     passHref={true}
//                     key={books[item]._id}
//                     href={`${process.env.NEXT_PUBLIC_HOST}/book/${books[item].slug}`}
//                   >
//                     <div className="group cursor-pointer bg-white border border-gray-300 hover:border-blue-400 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
//                       {/* Book Cover */}
//                       <div className="relative">
//                         <div className="aspect-[3/4] relative">
//                           <img
//                             src={books[item].img || "/placeholder.svg"}
//                             data-aos="zoom-in"
//                             alt=""
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                           />

//                           {/* Overlay */}
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                           {/* Status Indicator */}
//                           <div className="absolute top-2 right-2">
//                             <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-lg animate-pulse"></div>
//                           </div>

//                           {/* Bottom Info Overlay */}
//                           <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                             <div className="flex items-center justify-between text-white text-xs">
//                               <div className="flex items-center gap-1">
//                                 <BookOpen className="w-3 h-3" />
//                                 <span>Available</span>
//                               </div>
//                               <div className="flex items-center gap-1">
//                                 <Eye className="w-3 h-3" />
//                                 <span>View</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Content Section */}
//                       <div className="p-4">
//                         {/* Category Badge */}
//                         <div className="mb-3">
//                           <Badge
//                             variant="outline"
//                             className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-300 text-xs px-3 py-1 font-semibold uppercase tracking-wide"
//                           >
//                             {books[item].category}
//                           </Badge>
//                         </div>

//                         {/* Book Info */}
//                         <div className="space-y-2">
//                           <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 min-h-[2rem]">
//                             {books[item].title}
//                           </h3>
//                           <p className="text-gray-600 text-xs font-medium">by {books[item].author}</p>

//                           {/* Action Row */}
//                           <div className="flex items-center justify-between pt-2">
//                             <div className="flex items-center gap-1 text-gray-500 text-xs">
//                               <Clock className="w-3 h-3" />
//                               <span>Quick read</span>
//                             </div>
//                             <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg opacity-0 group-hover:opacity-100">
//                               <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                               </svg>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI)
//   }
//   const books = await Book.find()
//   return {
//     props: { books: JSON.parse(JSON.stringify(books)) },
//   }
// }

"use client"
import Book from "../models/Book"
import mongoose from "mongoose"
import Link from "next/link"
import { useState } from "react"
import { useEffect } from "react"
import "aos/dist/aos.css"
import AOS from "aos"
import Spotlight from "@/components/Spotlight"
import LeaderBoards from "@/components/LeaderBoards"
import Head from "next/head"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Star, TrendingUp, Clock, Eye } from "lucide-react"
import SkeletonLoader from "@/components/SkeletonLoader"

export default function Home({ books }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AOS.init()

    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    // Stop camera if token is present
    const token = localStorage.getItem("token")
    if (token) {
      stopCamera()
    }

    return () => clearTimeout(timer)
  }, [])

  const stopCamera = () => {
    const video = document.getElementById("videoElement")
    if (video && video.srcObject) {
      const tracks = video.srcObject.getTracks()
      tracks.forEach((track) => track.stop())
      video.srcObject = null
      console.log("Camera stopped due to token presence.")
    }
  }

  const [searchText, setSearchText] = useState("")
  const [dropdown, setDropdown] = useState(false)
  const [foundbook, setFoundbook] = useState("")

  const handleSearchSubmit = async (e) => {
    setSearchText(e.target.value)
    e.preventDefault()
    const data = { searchText }
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getbook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const response = await res.json()
    if (response.success) {
      setFoundbook(response.book)
      if (searchText.length <= 1) {
        setDropdown(false)
      } else {
        setDropdown(true)
      }
    } else {
      console.log("err")
    }
  }

  // Show skeleton loader while loading
  if (loading) {
    return <SkeletonLoader type="bookGrid" />
  }

  return (
    <>
      <Head>
        <title>BookHive | Home</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white/80 to-gray-50/50"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 py-24 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <BookOpen className="w-16 h-16 mx-auto mb-6 text-blue-600" />
                <h1 className="text-6xl sm:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent">
                  BookHive
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 mb-8">Your Digital Library Ecosystem</p>
                <div className="flex items-center justify-center gap-6 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-blue-600" />
                    <span>Premium Collection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-gray-500" />
                    <span>Always Updated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spotlight and Leaderboards Section */}
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Spotlight />
              <LeaderBoards />
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="py-16 px-4 bg-gray-50/50">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-gray-700 bg-clip-text text-transparent mb-4">
                Discover Books
              </h2>
              <p className="text-xl text-gray-600">Search through our curated collection</p>
            </div>

            <Card className="bg-white/80 border-gray-200 backdrop-blur-sm shadow-lg">
              <CardContent className="p-8">
                <form className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      value={searchText}
                      onChange={handleSearchSubmit}
                      type="text"
                      className="pl-12 h-14 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 text-lg"
                      placeholder="Enter book title..."
                    />
                  </div>
                  <Button
                    type="submit"
                    onClick={handleSearchSubmit}
                    className="h-14 px-8 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold text-lg"
                  >
                    Search
                  </Button>
                </form>

                {dropdown && (
                  <div className="mt-8">
                    <Card className="bg-white/90 border-gray-200 backdrop-blur-sm shadow-lg">
                      <CardContent className="p-6">
                        <Link passHref={true} href={`/book/${foundbook.slug}`}>
                          <div className="group cursor-pointer">
                            <div className="flex gap-6">
                              <div className="relative overflow-hidden rounded-xl flex-shrink-0">
                                <img
                                  src={foundbook.img || "/placeholder.svg"}
                                  alt=""
                                  className="w-32 h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                              <div className="flex-1 space-y-4">
                                <div>
                                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                    {foundbook.title}
                                  </h3>
                                  <p className="text-lg text-gray-600 mt-2">by {foundbook.author}</p>
                                </div>
                                <div className="flex gap-3">
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                                    Row: {foundbook.row}
                                  </Badge>
                                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
                                    Class: {foundbook.cnum}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Books Catalog Section */}
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent mb-6">
                Our Collection
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore thousands of carefully curated books across all genres and subjects
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6" id="catalog">
              {Object.keys(books).map((item) => {
                return (
                  <Link
                    passHref={true}
                    key={books[item]._id}
                    href={`${process.env.NEXT_PUBLIC_HOST}/book/${books[item].slug}`}
                  >
                    <div className="group cursor-pointer bg-white border border-gray-300 hover:border-blue-400 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                      {/* Book Cover */}
                      <div className="relative">
                        <div className="aspect-[3/4] relative">
                          <img
                            src={books[item].img || "/placeholder.svg"}
                            data-aos="zoom-in"
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Status Indicator */}
                          <div className="absolute top-2 right-2">
                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-lg animate-pulse"></div>
                          </div>

                          {/* Bottom Info Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center justify-between text-white text-xs">
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                <span>Available</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>View</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4">
                        {/* Category Badge */}
                        <div className="mb-3">
                          <Badge
                            variant="outline"
                            className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-300 text-xs px-3 py-1 font-semibold uppercase tracking-wide"
                          >
                            {books[item].category}
                          </Badge>
                        </div>

                        {/* Book Info */}
                        <div className="space-y-2">
                          <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 min-h-[2rem]">
                            {books[item].title}
                          </h3>
                          <p className="text-gray-600 text-xs font-medium">by {books[item].author}</p>

                          {/* Action Row */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                              <Clock className="w-3 h-3" />
                              <span>Quick read</span>
                            </div>
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg opacity-0 group-hover:opacity-100">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  const books = await Book.find().limit(15)
  return {
    props: { books: JSON.parse(JSON.stringify(books)) },
  }
}
