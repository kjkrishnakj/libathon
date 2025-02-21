import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react";
// import "icofont/css/icofont.css";
import Image, { img } from 'next/image';

const Navbar = () => {
  const router = useRouter();


  return (
    <header className="text-white body-font bg-cyan-500">
      <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center py-2" style={{textAlign:"center", height:"2.5cm"}}>
        <Link href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 rounded-full" viewBox="0 0 24 24" style={{background:"#37AFE1"}}>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">BookHive</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/login" className="hover:text-gray-900 mx-3 lg:text-xl">
            <i className="icofont-home" style={{ marginRight: '5px' }}></i>Login
          </Link>
          <Link href="/return" className="hover:text-gray-900 mx-3 lg:text-xl">
            <i className="icofont-home" style={{ marginRight: '5px' }}></i>Return
          </Link>
          <Link href="/ai" className="hover:text-gray-900 mx-3 lg:text-xl">
            <i className="icofont-home" style={{ marginRight: '5px' }}></i>Lib-AI
          </Link>
          <Link href="/ebooks" className="hover:text-gray-900 mx-3 lg:text-xl">
            <i className="icofont-home" style={{ marginRight: '5px' }}></i>Ebook
          </Link>
          <Link href="/requestbook" className="hover:text-gray-900 mx-3 lg:text-xl">
            <i className="icofont-home" style={{ marginRight: '5px' }}></i>Request
          </Link>
          <Link href="/donate" className="hover:text-gray-900 mx-3 lg:text-xl">
            <i className="icofont-home" style={{ marginRight: '5px' }}></i>Donate
          </Link>
          {/* <Link href ="/login"className="mr-5 hover:text-gray-900">Second</Link>
        <Link className="mr-5 hover:text-gray-900">Third</Link>
        <Link className="mr-5 hover:text-gray-900">Fourth</Link> */}
        </nav>
        {/* <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button> */}
        <button  onClick={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/admin`)}  className="cursor-pointer inline-flex items-center mr-3 bg-gray-100 border-0 py-3 px-3 focus:outline-none hover:bg-gray-200 rounded-full text-base my-2 md:mt-0">
         
         <Image src="/about.png" alt="icon" width={24} height={24} /> 
        {/* <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="w-9 h-10 text-gray-700 p-2 bg-gray-300 rounded-full"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M2 22a10 10 0 0 1 20 0H2z" />
  </svg> */}
 

        </button>
      </div>
    </header>)
};

export default Navbar;
