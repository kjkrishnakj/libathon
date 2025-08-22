// import { useRouter } from 'next/router'
// import React, { useEffect, useState } from 'react'
// import Image from 'next/image';
// import mongoose from "mongoose";

// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import Error from 'next/error'
// import Book from "../../models/Book";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Head from 'next/head';
// import "aos/dist/aos.css";
// import AOS from "aos";

// import Link from 'next/link';

// const Post = ({ error, book, cat, author }) => {
//     useEffect(() => {
//         AOS.init();
//     }, []);
//     const router = useRouter();
//     const { slug } = router.query


//     const [authe, setAuthe] = useState(false);

//     const enableCat = () => {

//         setAuthe(false);
//     }

//     const enableAuth = () => {

//         setAuthe(true);
//     }

//     const buyNow = async (slug, availableQty, title, id, img) => {
//         //     if (availableQty <= 0) return;

//         //     try {
//         //       const res = await fetch("/api/updateQty", {
//         //         method: "POST",
//         //         headers: { "Content-Type": "application/json" },
//         //         body: JSON.stringify({ slug }),
//         //       });

//         //       const data = await res.json();
//         //       if (data.success) {
//         //         console.log("Updated Quantity:", data.availableQty);
//         //     }
//         // } catch (error) {
//         //     console.error("Error updating quantity:", error);
//         // }
//         // console.log("id:", id);



//         router.push(`${process.env.NEXT_PUBLIC_HOST}/issue?bookId=${id}&img=${img}&title=${title}&slug=${slug}`);


//     };

//     return <>

//         <Head><title> BookHive | {book.title}</title></Head>
//         <section className="text-gray-600 body-font overflow-hidden">
//             {/* <div className="w-full ">
//       <img src="/img/iqoo logo.jpg" alt="Full Width Image" className="w-full object-co" style={{ height: "10cm" }} />
//     </div> */}

//             <ToastContainer />
//             <div className="container px-5 py-24 mx-auto">
//                 <div className="lg:w-4/5 mx-auto flex flex-wrap">

//                     {/* <img data-aos="fade-right" src={book.img} alt="" style={{ height: "28rem", width: "23rem", margin: "3rem 0rem" }}></img> */}
//                     <div style={{ position: "relative", display: "inline-block" }}>
//   <img
//     data-aos="fade-right"
//     src={book.img}
//     alt=""
//     style={{
//       height: "28rem",
//       width: "23rem",
//       margin: "3rem 0rem",
//     }}
//   />
//   {book.availableQty <= 0 && (
//     <div
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         backgroundColor: "rgba(255, 255, 255, 0.6)", // Translucent white
//             color: "black",
//         // backgroundColor: "rgba(0, 0, 0, 0.0)",
//         pointerEvents: "none",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <span
//       className='text-center'
//         style={{
//             backgroundColor: "gray", // Translucent white
//             color: "white", // Adjust text color for contrast
//           width:"10cm",
//           padding: "1rem 1rem",
//           fontSize: "1.5rem",
//           fontWeight: "bold",
//         //   borderRadius: "5px",
//         }}
//       >
//         Out of Stock
//       </span>
//     </div>
//   )}
// </div>



//                     <div data-aos="fade-left" className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
//                         <h2 className="text-sm title-font text-gray-500 tracking-widest"> </h2>
//                         <h1 className="text-gray-500 text-xl title-font font-medium mb-1"> {book.category}</h1>
//                         <h1 className="text-gray-900 text-3xl title-font font-medium mb-1"> {book.title}</h1>

//                         <p className="leading-relaxed">{book.descr}</p>

//                         <div className="flex text-right">

//                             <span className="title-font font-medium text-l text-gray-600" style={{ paddingLeft: "10cm" }}>- {book.author}</span>

//                         </div>
//                         <h1 className="text-xl mt-8 text-gray-700  font-bold  mb-2">Details:</h1>
//                         <li className=' mt-2 text-gray-900  pl-10'><span className='font-bold'>Author: </span>{book.author}</li>
//                         <li className=' mt-2 text-gray-900  pl-10'><span className='font-bold'>Category: </span>{book.category}</li>
//                         <li className=' mt-2 text-gray-900  pl-10'><span className='font-bold'>Floor: </span>{book.floor}</li>
//                         <li className=' mt-2 text-gray-900  pl-10'><span className='font-bold'>Row: </span>{book.row}</li>
//                         <li className=' mt-2 text-gray-900  pl-10'><span className='font-bold'>Class number: </span>{book.cnum} </li>
//                         <li className=' mt-2 text-gray-900  pl-10'><span className='font-bold'> Quantity: </span>{book.availableQty} </li>
//                         {/* <button onClick={() => { buyNow(slug, book.availableQty, book.title, book._id, book.img) }} disabled={book.availableQty <= 0 ? true : false} className="text-xl px-5 ml-10 my-10 disabled:bg-indigo-500 text-white  bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-700 rounded">Issue</button> */}

//                         <button
//                             onClick={() => { buyNow(slug, book.availableQty, book.title, book._id, book.img) }}
//                             disabled={book.availableQty <= 0}
//                             className="text-xl px-5 ml-10 my-10 disabled:bg-red-500 text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-700 rounded"
//                         >
//                             {book.availableQty <= 0 ? "Out of Stock" : "Issue"}
//                         </button>


//                     </div>

//                 </div>
//             </div>

//         </section >
//         <section className="text-[#0095B3]  body-font">

//             <div className="container px-5 py-12 mx-auto">

//                 <h1 className="text-2xl font-bold mt mb-2">
//                     More from this
//                     <button
//                         onClick={enableCat}
//                         className="px-4 text ml-2 py-1    bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
//                     >
//                         Category
//                     </button>

//                     <button
//                         onClick={enableAuth}
//                         className="ml-2 px-4 py-1 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition"
//                     >
//                         Author
//                     </button>

//                 </h1>


//                 {!authe ? (
//                     <Carousel responsive={{
//                         superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 3 },
//                         desktop: { breakpoint: { max: 1200, min: 1024 }, items: 3 },
//                         tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
//                         mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
//                     }}

//                         autoPlay={true}
//                         autoPlaySpeed={2000}
//                         infinite={true}>
//                         {Object.keys(cat).map((item) => (
//                             <Link passHref={true} key={cat[item]._id} href={`/book/${cat[item].slug}`}>
//                                 <div className="lg:w-1/2 md:w-1/2 p-2" style={{ width: "6cm", margin: "0.5cm 2cm" }}>
//                                     <img src={cat[item].img} alt="" className="w-full h-full object-fill" style={{ height: "14rem", width: "11rem", margin: "auto" }} />
//                                     <div className="mt-4">
//                                         <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{cat[item].title}</h3>
//                                         <h2 className="text-gray-900 title-font text-lg font-medium">{cat[item].author}</h2>
//                                     </div>
//                                 </div>
//                             </Link>
//                         ))}
//                     </Carousel>
//                 ) : (
//                     <Carousel responsive={{
//                         superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 4 },
//                         desktop: { breakpoint: { max: 1200, min: 1024 }, items: 4 },
//                         tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
//                         mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
//                     }}

//                         autoPlay={true}
//                         autoPlaySpeed={2000}
//                         infinite={true}>
//                         {Object.keys(author).map((item) => (
//                             <Link passHref={true} key={author[item]._id} href={`/product/${author[item].slug}`}>
//                                 <div className="lg:w-1/2 md:w-1/2 p-2" style={{ width: "6cm", margin: "0.5cm 2cm" }}>
//                                     <img src={author[item].img} alt="" className="w-full h-full object-fill" style={{ height: "14rem", width: "11rem", margin: "auto" }} />
//                                     <div className="mt-4">
//                                         <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{author[item].title}</h3>
//                                         <h2 className="text-gray-900 title-font text-lg font-medium">{author[item].author}</h2>
//                                     </div>
//                                 </div>
//                             </Link>
//                         ))}
//                     </Carousel>
//                 )}




//             </div>
//         </section>



//     </>
// }

// export default Post


// export async function getServerSideProps(context) {
//     if (!mongoose.connections[0].readyState) {
//         await mongoose.connect(process.env.MONGO_URI)
//     }




//     let book = await Book.findOne({ slug: context.query.slug })
//     let genre = book.category;
//     let cat = await Book.find({ category: genre });
//     let auth = book.author;
//     let author = await Book.find({ author: auth });
//     let variants = await Book.find({ title: book.title })

//     let error = null;
//     if (book == null) {
//         return {
//             props: { error: 404 }
//         }
//     }



//     return {
//         props: { error: error, book: JSON.parse(JSON.stringify(book)), cat: JSON.parse(JSON.stringify(cat)), author: JSON.parse(JSON.stringify(author)) }
//     }
// }

"use client"

import { useRouter } from "next/router"
import { useState } from "react"
import mongoose from "mongoose"
import Head from "next/head"
import Link from "next/link"
import Book from "../../models/Book"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, User, MapPin, Hash, Package, AlertCircle, CheckCircle, ArrowRight } from "lucide-react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Post = ({ error, book, cat, author }) => {
  const router = useRouter()
  const { slug } = router.query
  const [showCategory, setShowCategory] = useState(true)

  const buyNow = async (slug, availableQty, title, id, img) => {
    
    const token = localStorage.getItem("token"); // or any auth key you use
  if (!token) {
    router.push("/login"); // redirect to login if not logged in
    return;
  }
    router.push(`${process.env.NEXT_PUBLIC_HOST}/issue?bookId=${id}&img=${img}&title=${title}&slug=${slug}`)
  }

  if (error === 404) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h1>
            <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
            <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>BookHive | {book.title}</title>
      </Head>

      <ToastContainer />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Book Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Book Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <img
                    src={book.img || "/placeholder.svg"}
                    alt={book.title}
                    className="w-80 h-96 object-cover rounded-xl shadow-lg"
                  />
                  {book.availableQty <= 0 && (
                    <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
                      <div className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg">
                        Out of Stock
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 mb-4">
                  {book.category}
                </Badge>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-6">by {book.author}</p>
                <p className="text-gray-700 leading-relaxed text-lg">{book.descr}</p>
              </div>

              {/* Book Details Card */}
              <Card className="bg-white/80 border-gray-200 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Book Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Author:</span>
                      <span className="font-medium text-gray-900">{book.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Floor:</span>
                      <span className="font-medium text-gray-900">{book.floor}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Hash className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Row:</span>
                      <span className="font-medium text-gray-900">{book.row}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Hash className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Class Number:</span>
                      <span className="font-medium text-gray-900">{book.cnum}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Available Quantity:</span>
                      <Badge
                        variant={book.availableQty > 0 ? "default" : "destructive"}
                        className={book.availableQty > 0 ? "bg-green-100 text-green-700 border-green-200" : ""}
                      >
                        {book.availableQty} {book.availableQty === 1 ? "copy" : "copies"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Issue Button */}
              <Button
                onClick={() => buyNow(slug, book.availableQty, book.title, book._id, book.img)}
                disabled={book.availableQty <= 0}
                className="w-full h-14 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 disabled:from-red-500 disabled:to-red-600 disabled:cursor-not-allowed shadow-lg"
              >
                {book.availableQty <= 0 ? (
                  <div className="flex items-center gap-2 text-white">
                    <AlertCircle className="w-5 h-5" />
                    Out of Stock
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle className="w-5 h-5" />
                    Issue Book
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Related Books Section */}
          <div className="bg-white/50 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">More from this</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCategory(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    showCategory
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Category
                </button>
                <button
                  onClick={() => setShowCategory(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    !showCategory
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Author
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {(showCategory ? cat : author).slice(0, 10).map((item) => (
                <Link key={item._id} href={`/book/${item.slug}`}>
                  <div className="group cursor-pointer bg-white border border-gray-300 hover:border-blue-400 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[3/4] relative">
                      <img
                        src={item.img || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-xs">{item.author}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  const book = await Book.findOne({ slug: context.query.slug })
  const error = null

  if (book == null) {
    return {
      props: { error: 404 },
    }
  }

  const genre = book.category
  const cat = await Book.find({ category: genre })
  const auth = book.author
  const author = await Book.find({ author: auth })

  return {
    props: {
      error: error,
      book: JSON.parse(JSON.stringify(book)),
      cat: JSON.parse(JSON.stringify(cat)),
      author: JSON.parse(JSON.stringify(author)),
    },
  }
}
