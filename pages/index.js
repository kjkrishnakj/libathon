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
import Spotlight from "@/components/Spotlight";
import LeaderBoards from "@/components/LeaderBoards";
import Head from "next/head";


export default function Home({ books }) {
  useEffect(() => {
    AOS.init();

    // Stop camera if token is present
    const token = localStorage.getItem("token");
    if (token) {
      stopCamera();
    }
  }, []);

  const stopCamera = () => {
    const video = document.getElementById("videoElement");
    if (video && video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all camera tracks
      video.srcObject = null;
      console.log("Camera stopped due to token presence.");
    }
  };





  const [searchText, setSearchText] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [foundbook, setFoundbook] = useState('');
  

  const handleSearchSubmit = async (e) => {
    setSearchText(e.target.value);
    e.preventDefault();
    // console.log(searchText);

    const data = { searchText }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getbook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    if (response.success) {
      setFoundbook(response.book);
      // console.log(response);

      // console.log("foundbook", response.book.title);
      if (searchText.length <= 1) {

        setDropdown(false);
      }
      else {
        setDropdown(true);

      }


    }
    else {
      console.log("err");

    }
  };



  return (
    <>
    <Head><title>BookHive | Home</title></Head>
      <Carousel
        responsive={{
          superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
          desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
          tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
          mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
        }}
        autoPlay={false}
        autoPlaySpeed={2000}
        infinite={true}
        className="custom-carousel shadow-lg"
        containerClass="carousel-container"
        itemClass="carousel-item"
        arrows={false}
      >
        <div className="h-[30vh] sm:h-[55vh] mt-0 ">
          <img
            src="/vitclib.jpg"
            alt="image 1"
            className="h-full w-full object-fill"
          />
        </div>



      </Carousel>


      <div className="flex w-full">
      <div className="flex w-full">
  <div className="w-1/2 mx-4  flex-1" >
    <Spotlight />
  </div>
  <div className="w-1/2 m-2 h-full flex-1">
    <LeaderBoards />
  </div>
</div>
 
</div>

      <div className="relative flex flex-col pt-12 sm:pt-6 items-center justify-center w-full">
        <div className="relative w-[12cm] mb-4">
          <form className="flex items-center">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-[#0095B3] dark:text-[#0095B3]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input value={searchText} onChange={handleSearchSubmit} type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter title" />
            <button type="submit" onClick={handleSearchSubmit} className="ml-2 p-2 text-sm text-white bg-[#0095B3] rounded-lg hover:bg-005A6E focus:ring-2 focus:ring-005A6E focus:ring-opacity-50">
              Search
            </button>
          </form>
        </div>
        {dropdown && (
          <div className=" rounded-md px-5 w-[16rem] bg-white mt-4">
            <Link passHref={true} href={`/book/${foundbook.slug}`}>
              <img src={foundbook.img} alt="" className="w-full h-full rounded overflow-hidden object-fill" style={{ height: "16rem", width: "16rem" }} />
            </Link>
            <div className="flex justify-between">
              <p className="text-center">{foundbook.title}</p>
              <p className="text-center font-bold">Row: {foundbook.row}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-center">{foundbook.author}</p>
              <p className="text-center font-bold">Class: {foundbook.cnum}</p>
            </div>

          </div>
        )}
      </div>


      <div className="flex flex-wrap -m-4  justify-center" id="catalog"  >
        {Object.keys(books).map((item) => {


          return <Link passHref={true} key={books[item]._id} href={`${process.env.NEXT_PUBLIC_HOST}/book/${books[item].slug}`}>
            <div className=" lg:w-1/2 py-10  md:w-1/2 p-2 transform transition-transform duration-300 ease-in-out hover:scale-110" style={{ width: "8cm", margin: "0.5cm" }}>
              <img src={books[item].img} data-aos="zoom-in" alt="" className="w-full h-full rounded overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 object-fill" style={{ height: "18rem", width: "14rem" }} />
              <h3 className="text-gray-500 text-s  tracking-widest title-font my-1">{books[item].category}</h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">{books[item].title}</h2>

            
                <p className="  text-gray-900 ">-{books[item].author}</p>
          
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