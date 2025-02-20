import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [rnum, setRnum] = useState('');  

  const buyNow = (itemCode, qty, price, name) => {
    qty = qty - 1;
    // router.push(`/`);
  };

  return (
    <>
      <Navbar />
      <Component rnum={rnum} {...pageProps} /> 
    </>
  );
}
