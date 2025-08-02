// "use client";
// import { useState, useEffect } from "react";
// import Head from "next/head";

// const ReturnBook = () => {
//     const [name, setName] = useState("");
//     const [regNo, setRegNo] = useState("");
//     const [bookId, setBookId] = useState("");
//     const [message, setMessage] = useState("");
//     const [penalty, setPenalty] = useState(null);

//     useEffect(() => {
//         setName(localStorage.getItem("sname") || "");
//         setRegNo(localStorage.getItem("rno") || "");
//     }, []);

//     const handleReturn = async () => {
//         if (!bookId) {
//             setMessage("Please enter a Book ID!");
//             return;
//         }

//         try {
//             const res = await fetch("/api/return", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ bid: bookId, sid: regNo }),
//             });

//             const data = await res.json();
//             if (res.ok) {
//                 setMessage("Book returned successfully!");
//                 setPenalty(data.penalty);
//             } else {
//                 setMessage(data.error);
//             }
//         } catch (error) {
//             setMessage("Error returning book!");
//         }
//     };

//     return (
//         <>
//     <Head><title>BookHive | Return</title></Head>
    
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//                 <h2 className="text-2xl font-bold mb-4">Return Book</h2>

//                 <label className="block mb-2 text-gray-600">Name</label>
//                 <input
//                     type="text"
//                     value={name}
//                     disabled
//                     className="w-full p-2 mb-4 border rounded bg-gray-200"
//                 />

//                 <label className="block mb-2 text-gray-600">Reg No</label>
//                 <input
//                     type="text"
//                     value={regNo}
//                     disabled
//                     className="w-full p-2 mb-4 border rounded bg-gray-200"
//                 />

//                 <label className="block mb-2 text-gray-600">Book ID</label>
//                 <input
//                     type="text"
//                     value={bookId}
//                     onChange={(e) => setBookId(e.target.value)}
//                     className="w-full p-2 mb-4 border rounded"
//                     placeholder="Enter Book ID"
//                 />

//                 <button
//                     onClick={handleReturn}
//                     className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//                 >
//                     Return Book
//                 </button>

//                 {message && <p className="mt-4 text-center text-red-600">{message}</p>}
//                 {penalty !== null && <p className="mt-2 text-center font-bold">Penalty: ₹{penalty}</p>}
//             </div>
//         </div></>
//     );
// };

// export default ReturnBook;

"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RotateCcw, User, Hash, AlertCircle, CheckCircle, DollarSign, BookOpen } from "lucide-react"

const ReturnBook = () => {
  const [name, setName] = useState("")
  const [regNo, setRegNo] = useState("")
  const [bookId, setBookId] = useState("")
  const [message, setMessage] = useState("")
  const [penalty, setPenalty] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setName(localStorage.getItem("sname") || "")
    setRegNo(localStorage.getItem("rno") || "")
  }, [])

  const handleReturn = async () => {
    if (!bookId) {
      setMessage("Please enter a Book ID!")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bid: bookId, sid: regNo }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage("Book returned successfully!")
        setPenalty(data.penalty)
      } else {
        setMessage(data.error)
      }
    } catch (error) {
      setMessage("Error returning book!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>BookHive | Return</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl mb-6 shadow-lg">
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent mb-4">
              Return Book
            </h1>
            <p className="text-xl text-gray-600">Complete your book return process quickly and easily</p>
          </div>

          {/* Main Form Card */}
          <Card className="bg-white/80 border-gray-200 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-2xl font-semibold">Book Return Form</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* User Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 text-blue-600" />
                    Student Name
                  </label>
                  <Input
                    type="text"
                    value={name}
                    disabled
                    className="bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Hash className="w-4 h-4 text-blue-600" />
                    Registration Number
                  </label>
                  <Input
                    type="text"
                    value={regNo}
                    disabled
                    className="bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Book ID Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Book ID <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                  className="h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                  placeholder="Enter the Book ID to return"
                />
                <p className="text-sm text-gray-500">
                  You can find the Book ID on your borrowing receipt or library card
                </p>
              </div>

              {/* Return Button */}
              <Button
                onClick={handleReturn}
                disabled={isLoading || !bookId}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Return...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-5 h-5" />
                    Return Book
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

              {/* Penalty Display */}
              {penalty !== null && (
                <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Penalty Information</h3>
                        <p className="text-2xl font-bold text-yellow-700">₹{penalty}</p>
                        <p className="text-sm text-gray-600">
                          {penalty > 0 ? "Please pay the penalty at the library counter" : "No penalty applicable"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="mt-8 bg-blue-50/50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Need Help?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Can't find your Book ID?</p>
                  <p>Check your borrowing receipt or contact the library staff</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Having technical issues?</p>
                  <p>Contact support at hello@bookhive.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default ReturnBook
