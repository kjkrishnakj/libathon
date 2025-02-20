import img from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Book from "../models/Book";
import mongoose from "mongoose";
import Link from "next/link";
import { useState } from "react";
import React, { useEffect } from 'react';
import "aos/dist/aos.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import AOS from "aos";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({books}) {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>


<Carousel
        responsive={{
          superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
          desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
          tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
          mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
        }}
        autoPlay={true}
        autoPlaySpeed={2000}
        infinite={true}
        className="custom-carousel shadow-lg"
        containerClass="carousel-container"
        itemClass="carousel-item"
        arrows={false}
      >
        <div className="h-[30vh] sm:h-[55vh] mt-20 ">
          <Link href="/product/OnePlus115g">
            <img
              src="/vitclib.jpg"
              alt="image 1"
              className="h-full w-full object-fill"
            />
          </Link>
        </div>
        


      </Carousel>

<div className="flex flex-wrap -m-4  justify-center" id="catalog"  >
            {Object.keys(books).map((item) => {
    // console.log("phones",books[item].img);  


    return <Link passHref={true} key={books[item]._id} href={`${process.env.NEXT_PUBLIC_HOST}/book/${books[item].slug}`}>
                <div className=" lg:w-1/2 py-10  md:w-1/2 p-2" style={{ width: "8cm", margin: "0.5cm" }}>
                <img src={books[item].img} data-aos="zoom-in" alt="" className="w-full h-full rounded overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 object-contain" style={{ height: "16rem", width: "16rem" }} />
              
                    <h3 className="text-gray-500 text-s  tracking-widest title-font mb-1">{books[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{books[item].title}</h2>
                  <div className="mt-4" data-aos="fade-right">
                    <p className="mt-1 ml-8 text-gray-900 ">-{books[item].author}</p>
                  </div>
                </div>
              </Link>
            })
            }
          </div>




 
    </>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }


  let books = await Book.find()
  // console.log("books",books);
  let phones = {}

  
  return {
    props: { books: JSON.parse(JSON.stringify(books)) }
  }
}