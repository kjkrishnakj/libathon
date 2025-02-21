import Navbar from "@/components/Navbar";
import { Outfit } from "next/font/google";
import "@/styles/globals.css";
import { useState } from "react";
import Footer from "@/components/Footer";

// const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function App({ Component, pageProps }) {
  const [rnum, setRnum] = useState('');

  const buyNow = (itemCode, qty, price, name) => {
    qty = qty - 1;
    // router.push(`/`);
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Component rnum={rnum} {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
