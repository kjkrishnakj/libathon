import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import mongoose from "mongoose";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Error from 'next/error'
import Book from "../../models/Book";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import "aos/dist/aos.css";
import AOS from "aos";

import Link from 'next/link';

const Post = ({ error, book, cat, author }) => {
    useEffect(() => {
        AOS.init();
    }, []);
    const router = useRouter();
    const { slug } = router.query


    const [authe, setAuthe] = useState(false);

    const enableCat = () => {

        setAuthe(false);
    }

    const enableAuth = () => {

        setAuthe(true);
    }

    const buyNow = async (slug, availableQty, title, id, img) => {
        //     if (availableQty <= 0) return;

        //     try {
        //       const res = await fetch("/api/updateQty", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ slug }),
        //       });

        //       const data = await res.json();
        //       if (data.success) {
        //         console.log("Updated Quantity:", data.availableQty);
        //     }
        // } catch (error) {
        //     console.error("Error updating quantity:", error);
        // }
        // console.log("id:", id);



        router.push(`${process.env.NEXT_PUBLIC_HOST}/issue?bookId=${id}&img=${img}&title=${title}&slug=${slug}`);


    };

    return <>

        <Head><title> BookHive | {book.title}</title></Head>
        <section className="text-gray-600 body-font overflow-hidden">
            {/* <div className="w-full ">
      <img src="/img/iqoo logo.jpg" alt="Full Width Image" className="w-full object-co" style={{ height: "10cm" }} />
    </div> */}

            <ToastContainer />
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">

                    {/* <img data-aos="fade-right" src={book.img} alt="" style={{ height: "28rem", width: "23rem", margin: "3rem 0rem" }}></img> */}
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <img
                            data-aos="fade-right"
                            src={book.img}
                            alt=""
                            style={{
                                height: "28rem",
                                width: "23rem",
                                margin: "3rem 0rem",
                            }}
                        />
                        {book.availableQty <= 0 && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(255, 255, 255, 0.6)", // Translucent white
                                    color: "black",
                                    // backgroundColor: "rgba(0, 0, 0, 0.0)",
                                    pointerEvents: "none",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <span
                                    className='text-center'
                                    style={{
                                        backgroundColor: "gray", // Translucent white
                                        color: "white", // Adjust text color for contrast
                                        width: "10cm",
                                        padding: "1rem 1rem",
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                        //   borderRadius: "5px",
                                    }}
                                >
                                    Out of Stock
                                </span>
                            </div>
                        )}
                    </div>



                    <div data-aos="fade-left" className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest"> </h2>
                        <h1 className="text-gray-500 text-xl title-font font-medium mb-1"> {book.category}</h1>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1"> {book.title}</h1>

                        <p className="leading-relaxed">{book.descr}</p>

                        <div className="flex text-right">

                            <span className="title-font font-medium text-l text-gray-600" style={{ paddingLeft: "10cm" }}>- {book.author}</span>

                        </div>
                        <h1 className="text-xl mt-8 text-gray-700  font-bold  mb-2">Details:</h1>
                        <li className=' mt-2 text-gray-900  pl-10'><span className='font-bold'>Author: </span>{book.author}</li>
                        <li className=' mt-2 text-gray-900  pl-10'><span className='font-bold'>Category: </span>{book.category}</li>
                        <li className=' mt-2 text-gray-900  pl-10'><span className='font-bold'>Floor: </span>{book.floor}</li>
                        <li className=' mt-2 text-gray-900  pl-10'><span className='font-bold'>Row: </span>{book.row}</li>
                        <li className=' mt-2 text-gray-900  pl-10'><span className='font-bold'>Class number: </span>{book.cnum} </li>
                        <li className=' mt-2 text-gray-900  pl-10'><span className='font-bold'> Quantity: </span>{book.availableQty} </li>
                        {/* <button onClick={() => { buyNow(slug, book.availableQty, book.title, book._id, book.img) }} disabled={book.availableQty <= 0 ? true : false} className="text-xl px-5 ml-10 my-10 disabled:bg-indigo-500 text-white  bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-700 rounded">Issue</button> */}

                        <button
                            onClick={() => { buyNow(slug, book.availableQty, book.title, book._id, book.img) }}
                            disabled={book.availableQty <= 0}
                            className="text-xl px-5 ml-10 my-10 disabled:bg-red-500 text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-700 rounded"
                        >
                            {book.availableQty <= 0 ? "Out of Stock" : "Issue"}
                        </button>


                    </div>

                </div>
            </div>

        </section >
        <section className="text-[#0095B3]  body-font">

            <div className="container px-5 py-12 mx-auto">

                <div className="font-bold mt mb-2 flex items-center">
                    <h1 className="text-xl mr-4">More from this : </h1>

                    <button
                        onClick={enableCat} 
                        className="text-white p-2 rounded bg-blue-500 mx-2"
 
                    >
                        Category
                    </button>

                    <button
                        onClick={enableAuth}
                        className="text-white p-2 rounded bg-yellow-500 mx-2"
                    >
                        Author
                    </button>
                </div>



                {!authe ? (

                    <Carousel responsive={{
                        superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 6 }, // Changed to 6
                        desktop: { breakpoint: { max: 1200, min: 1024 }, items: 6 }, // Changed to 6
                        laptop: { breakpoint: { max: 1024, min: 900 }, items: 4 }, // Optional: Adjust if needed
                        tablet: { breakpoint: { max: 900, min: 768 }, items: 2 },
                        mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
                    }}

                        autoPlay={true}
                        autoPlaySpeed={2000}
                        infinite={true}>
                        {Object.keys(cat).map((item) => (
                            <Link passHref={true} key={cat[item]._id} href={`/book/${cat[item].slug}`}>
                                <div className="lg:w-1/2 md:w-1/2 p-2" style={{ width: "6cm", margin: "0.5cm 2cm" }}>
                                    <img src={cat[item].img} alt="" className="w-full h-full object-fill" style={{ height: "14rem", width: "11rem", margin: "auto" }} />
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{cat[item].title}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{cat[item].author}</h2>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                ) : (
                    <Carousel
                        responsive={{
                            superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 6 }, // Changed to 6
                            desktop: { breakpoint: { max: 1200, min: 1024 }, items: 6 }, // Changed to 6
                            laptop: { breakpoint: { max: 1024, min: 900 }, items: 4 }, // Optional: Adjust if needed
                            tablet: { breakpoint: { max: 900, min: 768 }, items: 2 },
                            mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
                        }}



                        autoPlay={true}
                        autoPlaySpeed={2000}
                        infinite={true}>
                        {Object.keys(author).map((item) => (
                            <Link passHref={true} key={author[item]._id} href={`/product/${author[item].slug}`}>
                                <div className="lg:w-1/2 md:w-1/2 p-2" style={{ width: "6cm", margin: "0.5cm 2cm" }}>
                                    <img src={author[item].img} alt="" className="w-full h-full object-fill" style={{ height: "14rem", width: "11rem", margin: "auto" }} />
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{author[item].title}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{author[item].author}</h2>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                )}




            </div>
        </section>



    </>
}

export default Post


export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }




    let book = await Book.findOne({ slug: context.query.slug })
    let genre = book.category;
    let cat = await Book.find({ category: genre });
    let auth = book.author;
    let author = await Book.find({ author: auth });
    let variants = await Book.find({ title: book.title })

    let error = null;
    if (book == null) {
        return {
            props: { error: 404 }
        }
    }



    return {
        props: { error: error, book: JSON.parse(JSON.stringify(book)), cat: JSON.parse(JSON.stringify(cat)), author: JSON.parse(JSON.stringify(author)) }
    }
}
