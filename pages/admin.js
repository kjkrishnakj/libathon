// import AdminBookRequests from "@/components/AdminBookRequests";
// import AdminDonations from "@/components/AdminDonations";
// import AdminEbookManager from "@/components/AdminEbook";
// import Link from "next/link"
// import AdminIssuedBooks from "@/components/AdminIssue";
// import AdminSpotlight from "@/components/AdminSpotlight";
// import "aos/dist/aos.css";
// import AOS from "aos";
// import { useEffect, useState } from "react";
// import Stats from "@/components/Stats";
// import Head from "next/head";

// export default function Admin({ books }) {
//   useEffect(() => {
//     AOS.init();

//   }, [])
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     category: "",
//     slug: "",
//     descr: "",
//     img: "",
//     availableQty: "",
//     row: "",
//     cnum: "",
//     floor: "",
//   });

//   const [showAddBook, setShowAddBook] = useState(true);
//   const [showSpotlight, setShowSpotlight] = useState(false);
//   const [showBookreq, setShowBookreq] = useState(false);
//   const [showManageEbook, setShowManageEbook] = useState(false);
//   const [showIssuedBook, setShowIssuedBook] = useState(false);
//   const [showDonatedBook, setShowDonatedBook] = useState(false);
//   const [showBooks, setShowBooks] = useState(false);
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch(`/api/book`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });
//     if (response.ok) {
//       window.location.reload();
//     }
//   };

//   const handleUpdate = async (id, qty) => {
//     const response = await fetch(`/api/book`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id, availableQty: qty }),
//     });
//     if (response.ok) {
//       window.location.reload();
//     }
//   };

//   const handleDelete = async (id) => {
//     const response = await fetch(`/api/book`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     if (response.ok) {
//       window.location.reload();
//     }
//   };

//   return (


//     <>


// <Head><title>BookHive | Admin</title></Head>


//       <header className="text-gray-600 body-font">
//         <div className="container mx-auto bg-gray-200 flex flex-wrap p-3 flex-col md:flex-row items-center">
//         <nav className="md:ml-auto md:mr-auto flex  flex-wrap items-center text-base justify-center">
//   <button
//     onClick={() => {
//       setShowAddBook(true);
//       setShowBooks(false);
//       setShowSpotlight(false);
//       setShowBookreq(false);
//       setShowManageEbook(false);
//       setShowIssuedBook(false);
//       setShowDonatedBook(false);
//     }}
//     className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
//       showAddBook ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
//     }`}
     
//   >
//     <i className="icofont-home" style={{ marginRight: "5px" }}></i>Add Book
//   </button>

//   <button
//     onClick={() => {
//       setShowAddBook(false);
//       setShowBooks(true);
//       setShowSpotlight(false);
//       setShowBookreq(false);
//       setShowManageEbook(false);
//       setShowIssuedBook(false);
//       setShowDonatedBook(false);
//     }}
//     className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
//       showBooks ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
//     }`}
     
//   >
//     <i className="icofont-home" style={{ marginRight: "5px" }}></i>Book List
//   </button>

//   <button
//     onClick={() => {
//       setShowAddBook(false);
//       setShowBooks(false);
//       setShowSpotlight(true);
//       setShowBookreq(false);
//       setShowManageEbook(false);
//       setShowIssuedBook(false);
//       setShowDonatedBook(false);
//     }}
//     className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
//       showSpotlight ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
//     }`}
     
//   >
//     <i className="icofont-home" style={{ marginRight: "5px" }}></i>Spotlight
//   </button>

//   <button
//     onClick={() => {
//       setShowAddBook(false);
//       setShowBooks(false);
//       setShowSpotlight(false);
//       setShowBookreq(true);
//       setShowManageEbook(false);
//       setShowIssuedBook(false);
//       setShowDonatedBook(false);
//     }}
//     className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
//       showBookreq ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
//     }`}
     
//   >
//     <i className="icofont-home" style={{ marginRight: "5px" }}></i>Book Request
//   </button>

//   <button
//     onClick={() => {
//       setShowAddBook(false);
//       setShowBooks(false);
//       setShowSpotlight(false);
//       setShowBookreq(false);
//       setShowManageEbook(true);
//       setShowIssuedBook(false);
//       setShowDonatedBook(false);
//     }}
//     className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
//       showManageEbook ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
//     }`}
     
//   >
//     <i className="icofont-home" style={{ marginRight: "5px" }}></i>E-Book
//   </button>

//   <button
//     onClick={() => {
//       setShowAddBook(false);
//       setShowBooks(false);
//       setShowSpotlight(false);
//       setShowBookreq(false);
//       setShowManageEbook(false);
//       setShowIssuedBook(true);
//       setShowDonatedBook(false);
//     }}
//     className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
//       showIssuedBook ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
//     }`}
     
//   >
//     <i className="icofont-home" style={{ marginRight: "5px" }}></i>Issued History
//   </button>

//   <button
//     onClick={() => {
//       setShowAddBook(false);
//       setShowBooks(false);
//       setShowSpotlight(false);
//       setShowBookreq(false);
//       setShowManageEbook(false);
//       setShowIssuedBook(false);
//       setShowDonatedBook(true);
//     }}
//     className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
//       showDonatedBook ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
//     }`}
     
//   >
//     <i className="icofont-home" style={{ marginRight: "5px" }}></i>Donation History
//   </button>
// </nav>



//         </div>
//       </header>







//       <div className="p-6 max-w-4xl mx-auto text-black">
//         <h1  data-aos="zoom-in" className="text-2xl text-center font-bold mb-4">Admin Panel</h1>
// <Stats/>
//         {showAddBook && (
//           <>
//             <h1 data-aos="zoom-in" className="text-xl font-bold my-4">Add a book</h1>

//             {/* Add Book Form */}
//             <form data-aos="zoom-in"  className="grid gap-4 bg-gray-300 c-black p-4 rounded" onSubmit={handleSubmit}>
//               {Object.keys(formData).map((key) => (
//                 <input
//                   key={key}
//                   type={key === "availableQty" ? "number" : "text"}
//                   name={key}
//                   placeholder={key}
//                   value={formData[key]}
//                   onChange={handleChange}
//                   className="p-2 border rounded"
//                 />
//               ))}

//               <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//                 Add Book
//               </button>
//             </form>
//           </>
//         )}

//         {/* Book List */}
//         {showBooks && <div className="mt-6">
//           <h2 data-aos="zoom-in" className="text-xl font-bold">Book List</h2>
//           {books.map((book) => (
//             <div data-aos="zoom-in" key={book._id} className="p-4 my-2 bg-gray-200 rounded flex justify-between items-center">
//               <div>
//                 <p className="font-bold">{book.title}</p>
//                 <p>Author: {book.author}</p>
//                 <p>Category: {book.category}</p>
//                 <p>Available: {book.availableQty}</p>
//                 <p>Floor: {book.floor}</p>
//                 <p>Row: {book.row}</p>
//                 <p>Cnum: {book.cnum}</p>
//               </div>
//               <div className="space-x-2">
//                 <button
//                   className="bg-green-500 text-white p-2 rounded"
//                   onClick={() => handleUpdate(book._id, book.availableQty + 1)}
//                 >
//                   +1
//                 </button>
//                 <button className="bg-red-500 text-white p-2 rounded" onClick={() => handleDelete(book._id)}>
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>}

//         {showSpotlight && <AdminSpotlight />}
//         {showBookreq && <AdminBookRequests />}
//         {showManageEbook && <AdminEbookManager />}
//         {showIssuedBook && <AdminIssuedBooks />}
//         {showDonatedBook && <AdminDonations />}
//       </div>

//     </>
//   );
// }

// export async function getServerSideProps() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/book`);
//     if (!res.ok) {
//       throw new Error(`API request failed with status ${res.status}`);
//     }
//     const books = await res.json();
//     return { props: { books } };
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     return { props: { books: [] } };
//   }
// }

"use client"

import AdminBookRequests from "@/components/AdminBookRequests"
import AdminDonations from "@/components/AdminDonations"
import AdminEbookManager from "@/components/AdminEbook"
import AdminIssuedBooks from "@/components/AdminIssue"
import AdminSpotlight from "@/components/AdminSpotlight"
import "aos/dist/aos.css"
import AOS from "aos"
import { useEffect, useState } from "react"
import Stats from "@/components/Stats"
import Head from "next/head"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Plus, List, Zap, MessageSquare, Smartphone, History, Heart, Settings, Trash2 } from "lucide-react"

export default function Admin({ books }) {
  useEffect(() => {
    AOS.init()
  }, [])

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    slug: "",
    descr: "",
    img: "",
    availableQty: "",
    row: "",
    cnum: "",
    floor: "",
  })

  const [showAddBook, setShowAddBook] = useState(true)
  const [showSpotlight, setShowSpotlight] = useState(false)
  const [showBookreq, setShowBookreq] = useState(false)
  const [showManageEbook, setShowManageEbook] = useState(false)
  const [showIssuedBook, setShowIssuedBook] = useState(false)
  const [showDonatedBook, setShowDonatedBook] = useState(false)
  const [showBooks, setShowBooks] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    if (response.ok) {
      window.location.reload()
    }
  }

  const handleUpdate = async (id, qty) => {
    const response = await fetch(`/api/book`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, availableQty: qty }),
    })
    if (response.ok) {
      window.location.reload()
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return
    const response = await fetch(`/api/book`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    if (response.ok) {
      window.location.reload()
    }
  }

  const navItems = [
    { key: "addBook", label: "Add Book", icon: Plus, color: "blue" },
    { key: "books", label: "Book List", icon: List, color: "green" },
    { key: "spotlight", label: "Spotlight", icon: Zap, color: "yellow" },
    { key: "bookreq", label: "Book Requests", icon: MessageSquare, color: "purple" },
    { key: "manageEbook", label: "E-Books", icon: Smartphone, color: "indigo" },
    { key: "issuedBook", label: "Issue History", icon: History, color: "teal" },
    { key: "donatedBook", label: "Donations", icon: Heart, color: "red" },
  ]

  const setActiveTab = (tab) => {
    setShowAddBook(tab === "addBook")
    setShowBooks(tab === "books")
    setShowSpotlight(tab === "spotlight")
    setShowBookreq(tab === "bookreq")
    setShowManageEbook(tab === "manageEbook")
    setShowIssuedBook(tab === "issuedBook")
    setShowDonatedBook(tab === "donatedBook")
  }

  const getActiveTab = () => {
    if (showAddBook) return "addBook"
    if (showBooks) return "books"
    if (showSpotlight) return "spotlight"
    if (showBookreq) return "bookreq"
    if (showManageEbook) return "manageEbook"
    if (showIssuedBook) return "issuedBook"
    if (showDonatedBook) return "donatedBook"
    return "addBook"
  }

  return (
    <>
      <Head>
        <title>BookHive | Admin</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl mb-4 shadow-lg">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h1
                data-aos="zoom-in"
                className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent mb-2"
              >
                Admin Dashboard
              </h1>
              <p className="text-xl text-gray-600">Manage your BookHive digital library</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center py-4">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon
                  const isActive = getActiveTab() === item.key
                  return (
                    <Button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      variant="ghost"
                      className={`
                        px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg h-10
                        ${
                          isActive
                            ? `bg-${item.color}-100 text-${item.color}-700 border border-${item.color}-200 shadow-md scale-105`
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        }
                      `}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Stats />

          {showAddBook && (
            <Card data-aos="zoom-in" className="bg-white border-gray-200 shadow-lg mt-8">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-gray-900">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Plus className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-2xl font-semibold">Add New Book</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.keys(formData).map((key) => (
                    <div key={key} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 capitalize">
                        {key === "availableQty" ? "Available Quantity" : key.replace(/([A-Z])/g, " $1")}
                      </label>
                      <Input
                        type={key === "availableQty" ? "number" : "text"}
                        name={key}
                        placeholder={`Enter ${key === "availableQty" ? "available quantity" : key}`}
                        value={formData[key]}
                        onChange={handleChange}
                        className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 text-gray-400"
                        required
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold text-lg"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Book to Library
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {showBooks && (
            <Card data-aos="zoom-in" className="bg-white border-gray-200 shadow-lg mt-8">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-gray-900">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <List className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-2xl font-semibold">Book Library</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    {books.length} Books
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {books.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Books Available</h3>
                    <p className="text-gray-600">Add your first book using the Add Book form.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {books.map((book) => (
                      <Card
                        key={book._id}
                        className="bg-gray-50 border-gray-200 hover:shadow-md transition-shadow duration-200"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-3">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{book.title}</h3>
                                <p className="text-gray-600">by {book.author}</p>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Category:</span>
                                  <p className="font-medium text-gray-900">{book.category}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Available:</span>
                                  <p className="font-medium text-gray-900">{book.availableQty}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Floor:</span>
                                  <p className="font-medium text-gray-900">{book.floor}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Row:</span>
                                  <p className="font-medium text-gray-900">{book.row}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Button
                                onClick={() => handleUpdate(book._id, book.availableQty + 1)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                +1
                              </Button>
                              <Button
                                onClick={() => handleDelete(book._id)}
                                size="sm"
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {showSpotlight && (
            <div className="mt-8">
              <AdminSpotlight />
            </div>
          )}
          {showBookreq && (
            <div className="mt-8">
              <AdminBookRequests />
            </div>
          )}
          {showManageEbook && (
            <div className="mt-8">
              <AdminEbookManager />
            </div>
          )}
          {showIssuedBook && (
            <div className="mt-8">
              <AdminIssuedBooks />
            </div>
          )}
          {showDonatedBook && (
            <div className="mt-8">
              <AdminDonations />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/book`)
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`)
    }
    const books = await res.json()
    return { props: { books } }
  } catch (error) {
    console.error("Error fetching books:", error)
    return { props: { books: [] } }
  }
}
