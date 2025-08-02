// import Navbar from "@/components/Navbar";
// import { Outfit } from "next/font/google";
// import "@/styles/globals.css";
// import { useState } from "react";
// import Footer from "@/components/Footer";

// // const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// export default function App({ Component, pageProps }) {
//   const [rnum, setRnum] = useState('');  

//   const buyNow = (itemCode, qty, price, name) => {
//     qty = qty - 1;
//     // router.push(`/`);
//   };

//   return (
//     <div >
    
//       <Navbar />
//       <Component rnum={rnum} {...pageProps} /> 
//       <Footer />
//     </div>
//   );
// }

"use client"

import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PageLoader from "@/components/PageLoader"
import CustomPageLoader from "@/components/CustomPageLoader"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "@/styles/globals.css"
import "@/styles/nprogress-custom.css"

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  }, [router])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Page transition loaders */}
      <PageLoader />
      <CustomPageLoader />

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}
