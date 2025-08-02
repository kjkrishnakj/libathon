// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import "aos/dist/aos.css";
// import AOS from "aos";
// import Head from "next/head";
// import { useRouter } from 'next/router';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const Issue = () => {
//     const router = useRouter();
//     const { bookId, title, img } = router.query;

//     const [sname, setSname] = useState('');
//     const [sid, setSid] = useState('');
//     const [issueid, setIssueid] = useState('');
//     const [penalty, setPenalty] = useState(0);
//     const [rs, setRs] = useState(false);
//     const [idate, setIdate] = useState(new Date().toISOString().split('T')[0]);

//     const today = new Date();
//     today.setDate(today.getDate() + 10);
//     const [rdate, setRdate] = useState(today.toISOString().split('T')[0]);

//     useEffect(() => {
//         AOS.init();
//         const storedRno = localStorage.getItem("rno");
//         if (storedRno) {
//             setSid(storedRno);
//         }
//         const user = localStorage.getItem("sname");
//         setSname(user);
//     }, []);

//     const handleChange = (e) => {
//         // const { name, value } = e.target;
//         // if (name === 'sname') {
//         //     setSname(value);
//         // }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const storedRno = localStorage.getItem("rno");
//         if (storedRno) {
//             setSid(storedRno);
//         }

//         const data = { sname, sid, bid: bookId, title, idate, rdate, rs, penalty };

//         try {
//             let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addIssue`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(data),
//             });

//             let response = await res.json();

//             if (response.issueId) {
//                 toast.success("Book issues successfully ✅", { autoClose: 2000 })

//                 console.log("Issue ID:", response.issueId);
//                 setIssueid(response.issueId);
           
//             const issueButton = document.getElementById("issueButton");
//             if (issueButton) {
//                 issueButton.disabled = true;
//                 issueButton.textContent = "Thank you";
//                 issueButton.style.backgroundColor = "#d1d5db"; // Light gray
//                 issueButton.style.cursor = "not-allowed";
//             } }
//         } catch (error) {
//             console.error("Error submitting issue:", error);
//         }
//     };

//     return (
//         <div>
//             <ToastContainer />
//             <Head>
//                 <title>BookHive | Issue</title>
//             </Head>
//             <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
//                 <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-sm">
//                     {img && (
//                         <img className='mx-auto' src={img} alt="Book Cover" style={{ height: "18rem", width: "16rem" }} />
//                     )}
//                     <h2 data-aos="zoom-in" className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//                         Details of your Book
//                     </h2>
//                 </div>

//                 <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" data-aos="zoom-in">
//                     <form className="space-y-6" onSubmit={handleSubmit}>
//                         <div>
//                             <label htmlFor="sname" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
//                             <div className="mt-2">
//                                 <input value={sname} onChange={handleChange} id="sname" name="sname" type="text" required
//                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset p-3 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
//                             <div className="mt-2">
//                                 <input value={title || ''} id="title" name="title" type="text" readOnly
//                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="sid" className="block text-sm font-medium leading-6 text-gray-900">Reg No.</label>
//                             <div className="mt-2">
//                                 <input value={sid} id="sid" name="sid" type="text" readOnly
//                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="idate" className="block text-sm font-medium leading-6 text-gray-900">Issue Date</label>
//                             <div className="mt-2">
//                                 <input value={idate} id="idate" name="idate" type="date" readOnly
//                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="rdate" className="block text-sm font-medium leading-6 text-gray-900">Return Date</label>
//                             <div className="mt-2">
//                                 <input value={rdate} id="rdate" name="rdate" type="date" readOnly
//                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//                             </div>
//                         </div>

//                         <div>
//                             <button type="submit" id='issueButton'
//                                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
//                                 Issue
                                
//                             </button>
//                         </div>
//                     </form>

//                     {issueid && (
//                         <Link href={`/receipt?id=${issueid}`} className="block text-center bg-green-500 text-white p-2 mt-4 rounded">
//                             Generate Receipt
//                         </Link>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Issue;

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BookOpen, User, Hash, Calendar, CheckCircle, AlertCircle, Receipt } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Issue = () => {
  const router = useRouter()
  const { bookId, title, img } = router.query
  const [sname, setSname] = useState("")
  const [sid, setSid] = useState("")
  const [issueid, setIssueid] = useState("")
  const [penalty, setPenalty] = useState(0)
  const [rs, setRs] = useState(false)
  const [idate, setIdate] = useState(new Date().toISOString().split("T")[0])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const today = new Date()
  today.setDate(today.getDate() + 10)
  const [rdate, setRdate] = useState(today.toISOString().split("T")[0])

  useEffect(() => {
    const storedRno = localStorage.getItem("rno")
    if (storedRno) {
      setSid(storedRno)
    }
    const user = localStorage.getItem("sname")
    setSname(user)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const storedRno = localStorage.getItem("rno")
    if (storedRno) {
      setSid(storedRno)
    }

    const data = { sname, sid, bid: bookId, title, idate, rdate, rs, penalty }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addIssue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const response = await res.json()

      if (response.issueId) {
        toast.success("Book issued successfully ✅", { autoClose: 2000 })
        console.log("Issue ID:", response.issueId)
        setIssueid(response.issueId)
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting issue:", error)
      toast.error("Error issuing book. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>BookHive | Issue</title>
      </Head>

      <ToastContainer />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl mb-6 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent mb-4">
              Issue Book
            </h1>
            <p className="text-xl text-gray-600">Complete your book borrowing process</p>
          </div>

          {/* Book Preview Card */}
          {img && (
            <Card className="bg-white/80 border-gray-200 backdrop-blur-sm shadow-lg mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <img
                    src={img || "/placeholder.svg"}
                    alt="Book Cover"
                    className="w-24 h-32 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600">You're about to borrow this book</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Issue Form */}
          <Card className="bg-white/80 border-gray-200 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Receipt className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-2xl font-semibold">Book Issue Details</span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 text-blue-600" />
                    Student Name
                  </label>
                  <Input
                    value={sname}
                    onChange={(e) => setSname(e.target.value)}
                    className="h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>

                {/* Book Title */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Book Title
                  </label>
                  <Input
                    value={title || ""}
                    readOnly
                    className="h-12 text-lg bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Registration Number */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Hash className="w-4 h-4 text-blue-600" />
                    Registration Number
                  </label>
                  <Input
                    value={sid}
                    readOnly
                    className="h-12 text-lg bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Issue Date */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Issue Date
                  </label>
                  <Input
                    value={idate}
                    type="date"
                    readOnly
                    className="h-12 text-lg bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Return Date */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Expected Return Date
                  </label>
                  <Input
                    value={rdate}
                    type="date"
                    readOnly
                    className="h-12 text-lg bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-sm text-gray-500">Please return the book by this date to avoid penalties</p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Issue...
                    </div>
                  ) : isSubmitted ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Thank You
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Issue Book
                    </div>
                  )}
                </Button>

                {/* Receipt Link */}
                {issueid && (
                  <div className="pt-4 border-t border-gray-200">
                    <Link href={`/receipt?id=${issueid}`}>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
                        <Receipt className="w-5 h-5 mr-2" />
                        Generate Receipt
                      </Button>
                    </Link>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card className="mt-8 bg-blue-50/50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Important Information
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Please return the book by the expected return date</li>
                <li>• Late returns may incur penalty charges</li>
                <li>• Keep your receipt safe for future reference</li>
                <li>• Contact library staff if you need to extend the borrowing period</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Issue
