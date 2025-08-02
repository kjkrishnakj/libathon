// import Head from "next/head";
// import { useEffect, useState } from "react";

// export default function Donate() {
//   const [bookTitle, setBookTitle] = useState("");
//   const [regNo, setRegNo] = useState("");

//   useEffect(() => {
//     const storedRegNo = localStorage.getItem("regNo");
//     if (storedRegNo) setRegNo(storedRegNo);
//   }, []);

//   const handleDonate = async () => {
//     if (!bookTitle.trim()) {
//       alert("Please enter a book title.");
//       return;
//     }

//     const response = await fetch("/api/donate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ bookTitle, regNo }),
//     });

//     const data = await response.json();
//     if (data.success) {
//       alert("Thank you for your donation!");
//       setBookTitle("");
//     } else {
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <>    <Head><title>BookHive | Donate</title></Head>

//     <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold text-center mb-4">Donate a Book, Change a Life</h2>
//       <p className="text-gray-600 text-center mb-4">
//         Your book donation can light up someone's world. Help spread knowledge and support education!
//       </p>

//       <input
//         type="text"
//         placeholder="Enter Book Title"
//         value={bookTitle}
//         onChange={(e) => setBookTitle(e.target.value)}
//         className="w-full p-2 border rounded-md mb-2"
//       />

//       <input
//         type="text"
//         placeholder="Enter Registration Number"
//         value={regNo}
//         onChange={(e) => setRegNo(e.target.value)}
//         className="w-full p-2 border rounded-md mb-4"
        
//       />

//       <button onClick={handleDonate} className="w-full bg-blue-600 text-white py-2 rounded-md">
//         Donate Now
//       </button>
//     </div>
//     </>
//   );
// }

"use client"

import Head from "next/head"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Heart, BookOpen, User, Gift, CheckCircle, AlertCircle } from "lucide-react"

export default function Donate() {
  const [bookTitle, setBookTitle] = useState("")
  const [regNo, setRegNo] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  useEffect(() => {
    const storedRegNo = localStorage.getItem("regNo")
    if (storedRegNo) setRegNo(storedRegNo)
  }, [])

  const handleDonate = async () => {
    if (!bookTitle.trim()) {
      setMessage("Please enter a book title.")
      setMessageType("error")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookTitle, regNo }),
      })
      const data = await response.json()

      if (data.success) {
        setMessage("Thank you for your generous donation! Your contribution helps build our community library.")
        setMessageType("success")
        setBookTitle("")
      } else {
        setMessage("Something went wrong. Please try again or contact support.")
        setMessageType("error")
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.")
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>BookHive | Donate</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl mb-6 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent mb-4">
              Donate a Book
            </h1>
            <p className="text-xl text-gray-600">Share knowledge, spread joy, and help build our community library</p>
          </div>

          {/* Impact Section */}
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 mb-8">
            <CardContent className="p-8 text-center">
              <Gift className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Donate a Book, Change a Life</h2>
              <p className="text-gray-700 leading-relaxed">
                Your book donation can light up someone's world. Help spread knowledge, support education, and make
                learning accessible to everyone in our community. Every book matters!
              </p>
            </CardContent>
          </Card>

          {/* Main Donation Form */}
          <Card className="bg-white/80 border-gray-200 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-2xl font-semibold">Book Donation Form</span>
              </CardTitle>
              <p className="text-gray-600 mt-2">Fill out the details below to donate a book to our digital library</p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Book Title Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Book Title <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                  placeholder="Enter the title of the book you want to donate"
                />
              </div>

              {/* Registration Number Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 text-blue-600" />
                  Registration Number
                </label>
                <Input
                  type="text"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  className="h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                  placeholder="Enter your registration number"
                />
                <p className="text-sm text-gray-500">This helps us track donations and send you updates</p>
              </div>

              {/* Donate Button */}
              <Button
                onClick={handleDonate}
                disabled={loading || !bookTitle.trim()}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Donation...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Donate Now
                  </div>
                )}
              </Button>

              {/* Message Display */}
              {message && (
                <div
                  className={`p-4 rounded-lg border ${
                    messageType === "success"
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {messageType === "success" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <p className="font-medium">{message}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-blue-600" />
                  Why Donate?
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Help students access quality educational content</li>
                  <li>• Support community learning initiatives</li>
                  <li>• Make knowledge freely available to all</li>
                  <li>• Build a stronger academic community</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  What We Accept
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Academic textbooks and references</li>
                  <li>• Fiction and non-fiction literature</li>
                  <li>• Professional development books</li>
                  <li>• Digital copies and e-books</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
