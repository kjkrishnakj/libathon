import Head from "next/head";
import { useEffect, useState } from "react";

export default function Donate() {
  const [bookTitle, setBookTitle] = useState("");
  const [regNo, setRegNo] = useState("");

  useEffect(() => {
    const storedRegNo = localStorage.getItem("regNo");
    if (storedRegNo) setRegNo(storedRegNo);
  }, []);

  const handleDonate = async () => {
    if (!bookTitle.trim()) {
      alert("Please enter a book title.");
      return;
    }

    const response = await fetch("/api/donate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookTitle, regNo }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Thank you for your donation!");
      setBookTitle("");
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>    <Head><title>BookHive | Donate</title></Head>

    <div className="p-6 max-w-lg bg-cyan-600 bg-opacity-40 backdrop-blur-xl my-12 p-6 rounded-lg shadow-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Donate a Book, Change a Life</h2>
      <p className="text-gray-800 text-center mb-4">
        Your book donation can light up someone's world. Help spread knowledge and support education!
      </p>

      <input
        type="text"
        placeholder="Enter Book Title"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        className="w-full p-2 border rounded-md mb-2"
      />

      <input
        type="text"
        placeholder="Enter Registration Number"
        value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
        
      />

      <button onClick={handleDonate} className="w-full bg-cyan-600  text-white py-2 rounded-md">
        Donate Now
      </button>
    </div>
    </>
  );
}
