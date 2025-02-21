import Navbar from "@/components/Navbar";
import { Outfit } from "next/font/google";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from "next/router";

// const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function App({ Component, pageProps }) {
  const [rnum, setRnum] = useState('');
  const [progress, setProgress] = useState(0)

  const buyNow = (itemCode, qty, price, name) => {
    qty = qty - 1;
    // router.push(`/`);
  };
  const router = useRouter()
  useEffect(() => {
    const handleRouteChangeStart = () => setProgress(40);
    const handleRouteChangeComplete = () => setProgress(100);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);
  return (
    <>
    <LoadingBar
   color="#1E293B" 

    progress={progress}
    waitingTime={200}
    onLoaderFinished={() => setProgress(0)}
    />
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Component rnum={rnum} {...pageProps} />
      </main>
      <Footer />
    </div>
    </>
  );
}
