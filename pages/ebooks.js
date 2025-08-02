// import React, { useEffect, useState } from 'react';
// import Head from "next/head";

// const Ebooks = () => {
//     const [ebooks, setEbooks] = useState([]);

//     useEffect(() => {
//         fetch('/api/ebooks')
//             .then(res => res.json())
//             .then(data => setEbooks(data))
//             .catch(err => console.error('Error fetching ebooks:', err));
//     }, []);

//     return (
//         <>
//         <Head><title>BookHive | Ebooks</title></Head>

//         <div className="min-h-screen p-6">
//             <h1 className="text-3xl font-bold text-center my-6">📚 Available Ebooks</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {ebooks.map((ebook) => (
//                     <div key={ebook._id} className="p-4 border rounded-lg shadow-lg">
//                         <h2 className="text-xl font-semibold">{ebook.name}</h2>
//                         <a href={ebook.link} target="_blank" className="text-blue-500 underline">
//                             Download
//                         </a>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     </>
//     );
// };

// export default Ebooks;

"use client"

import { useEffect, useState } from "react"
import Head from "next/head"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Download, BookOpen, ExternalLink, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

const Ebooks = () => {
  const [ebooks, setEbooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetch("/api/ebooks")
      .then((res) => res.json())
      .then((data) => {
        setEbooks(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching ebooks:", err)
        setLoading(false)
      })
  }, [])

  const filteredEbooks = ebooks.filter((ebook) => ebook.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <Head>
        <title>BookHive | Ebooks</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl mb-6 shadow-lg">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent mb-4">
              Digital E-Books
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access our collection of digital books anytime, anywhere. Download and read on your favorite device.
            </p>
          </div>

          {/* Search Section */}
          <Card className="bg-white/80 border-gray-200 backdrop-blur-sm shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 text-lg"
                    placeholder="Search e-books by title..."
                  />
                </div>
                <Button
                  variant="outline"
                  className="h-12 px-6 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{ebooks.length}</h3>
                <p className="text-gray-600">Available E-Books</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                <p className="text-gray-600">Download Cost</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
                <p className="text-gray-600">Access Available</p>
              </CardContent>
            </Card>
          </div>

          {/* E-Books Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading e-books...</p>
              </div>
            </div>
          ) : filteredEbooks.length === 0 ? (
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm ? "No e-books found" : "No e-books available"}
                </h3>
                <p className="text-gray-600">
                  {searchTerm
                    ? "Try adjusting your search terms or browse all available e-books"
                    : "Check back later for new additions to our digital collection"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredEbooks.length} of {ebooks.length} e-books
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>

              {/* E-Books Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEbooks.map((ebook) => (
                  <Card
                    key={ebook._id}
                    className="bg-white border-gray-300 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                            {ebook.name}
                          </CardTitle>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 ml-2">
                          E-Book
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Book Info */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <BookOpen className="w-4 h-4" />
                          <span>Digital Format</span>
                        </div>

                        {/* Download Button */}
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold shadow-lg group-hover:scale-105 transition-transform duration-200"
                        >
                          <a
                            href={ebook.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <Download className="w-5 h-5" />
                            Download E-Book
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>

                        {/* Additional Info */}
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Free Download</span>
                            <span>Available 24/7</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Ebooks
