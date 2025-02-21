import Head from "next/head";
import { useState } from "react";

const RequestBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/bookrequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author }),
      });

      if (!response.ok) throw new Error("Failed to submit request");

      setMessage("Book request submitted successfully!");
      setTitle("");
      setAuthor("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Head><title>BookHive | Request</title></Head>
    
    <div className="max-w-md bg-cyan-600 bg-opacity-40 backdrop-blur-xl  p-6 rounded-lg shadow-lg my-12 mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg  font-bold text-gray-800">Request a Book</h2>
      {message && <p className="mt-2 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full p-2 mt-2 border rounded-md"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button
          type="submit"
          className=" w-full  mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Request Book"}
        </button>
      </form>
    </div>
    </>
  );
};

export default RequestBook;
