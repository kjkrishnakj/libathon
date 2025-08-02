// import Head from "next/head";
// import { useState } from "react";

// const RequestBook = () => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       const response = await fetch("/api/bookrequests", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, author }),
//       });

//       if (!response.ok) throw new Error("Failed to submit request");

//       setMessage("Book request submitted successfully!");
//       setTitle("");
//       setAuthor("");
//     } catch (error) {
//       setMessage(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//     <Head><title>BookHive | Request</title></Head>
    
//     <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md shadow-md">
//       <h2 className="text-lg font-bold text-gray-800">Request a Book</h2>
//       {message && <p className="mt-2 text-green-500">{message}</p>}
//       <form onSubmit={handleSubmit} className="mt-4">
//         <input
//           type="text"
//           className="w-full p-2 border rounded-md"
//           placeholder="Book Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           className="w-full p-2 mt-2 border rounded-md"
//           placeholder="Author Name"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Request Book"}
//         </button>
//       </form>
//     </div>
//     </>
//   );
// };

// export default RequestBook;

"use client"

import Head from "next/head"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquare, BookOpen, User, CheckCircle, AlertCircle, Send } from "lucide-react"

const RequestBook = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/bookrequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author }),
      })
      if (!response.ok) throw new Error("Failed to submit request")
      setMessage("Book request submitted successfully!")
      setTitle("")
      setAuthor("")
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>BookHive | Request</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl mb-6 shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent mb-4">
              Request a Book
            </h1>
            <p className="text-xl text-gray-600">
              Can't find the book you're looking for? Let us know and we'll try to add it to our collection
            </p>
          </div>

          {/* Main Form Card */}
          <Card className="bg-white/80 border-gray-200 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-2xl font-semibold">Book Request Form</span>
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Fill out the details below and we'll consider adding this book to our digital library
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Book Title Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Book Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Enter the complete book title"
                    required
                  />
                </div>

                {/* Author Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 text-blue-600" />
                    Author Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Enter the author's full name"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading || !title.trim() || !author.trim()}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting Request...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Submit Book Request
                    </div>
                  )}
                </Button>

                {/* Message Display */}
                {message && (
                  <div
                    className={`p-4 rounded-lg border ${
                      message.includes("successfully")
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {message.includes("successfully") ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      <p className="font-medium">{message}</p>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-blue-50/50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  What happens next?
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• We'll review your book request</li>
                  <li>• Check availability and licensing</li>
                  <li>• Add it to our acquisition list</li>
                  <li>• Notify you when it's available</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-50/50 border-gray-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-gray-600" />
                  Request Guidelines
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Provide complete and accurate information</li>
                  <li>• Check if the book is already available</li>
                  <li>• Academic and educational books preferred</li>
                  <li>• Processing time: 2-4 weeks</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default RequestBook
