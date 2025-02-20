import AdminBookRequests from "@/components/AdminBookRequests";
import AdminDonations from "@/components/AdminDonations";
import AdminEbookManager from "@/components/AdminEbook";
import Link from "next/link"
import AdminIssuedBooks from "@/components/AdminIssue";
import AdminSpotlight from "@/components/AdminSpotlight";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect, useState } from "react";
import Stats from "@/components/Stats";

export default function Admin({ books }) {
  useEffect(() => {
    AOS.init();

  }, [])
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    slug: "",
    descr: "",
    img: "",
    availableQty: "",
    row: "",
    cnum: "",
    floor: "",
  });

  const [showAddBook, setShowAddBook] = useState(true);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showBookreq, setShowBookreq] = useState(false);
  const [showManageEbook, setShowManageEbook] = useState(false);
  const [showIssuedBook, setShowIssuedBook] = useState(false);
  const [showDonatedBook, setShowDonatedBook] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      window.location.reload();
    }
  };

  const handleUpdate = async (id, qty) => {
    const response = await fetch(`/api/book`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, availableQty: qty }),
    });
    if (response.ok) {
      window.location.reload();
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/book`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      window.location.reload();
    }
  };

  return (


    <>




      <header class="text-gray-600 body-font">
        <div class="container mx-auto bg-gray-200 flex flex-wrap p-3 flex-col md:flex-row items-center">
        <nav className="md:ml-auto md:mr-auto flex  flex-wrap items-center text-base justify-center">
  <button
    onClick={() => {
      setShowAddBook(true);
      setShowBooks(false);
      setShowSpotlight(false);
      setShowBookreq(false);
      setShowManageEbook(false);
      setShowIssuedBook(false);
      setShowDonatedBook(false);
    }}
    className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
      showAddBook ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
    }`}
     
  >
    <i className="icofont-home" style={{ marginRight: "5px" }}></i>Add Book
  </button>

  <button
    onClick={() => {
      setShowAddBook(false);
      setShowBooks(true);
      setShowSpotlight(false);
      setShowBookreq(false);
      setShowManageEbook(false);
      setShowIssuedBook(false);
      setShowDonatedBook(false);
    }}
    className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
      showBooks ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
    }`}
     
  >
    <i className="icofont-home" style={{ marginRight: "5px" }}></i>Book List
  </button>

  <button
    onClick={() => {
      setShowAddBook(false);
      setShowBooks(false);
      setShowSpotlight(true);
      setShowBookreq(false);
      setShowManageEbook(false);
      setShowIssuedBook(false);
      setShowDonatedBook(false);
    }}
    className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
      showSpotlight ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
    }`}
     
  >
    <i className="icofont-home" style={{ marginRight: "5px" }}></i>Spotlight
  </button>

  <button
    onClick={() => {
      setShowAddBook(false);
      setShowBooks(false);
      setShowSpotlight(false);
      setShowBookreq(true);
      setShowManageEbook(false);
      setShowIssuedBook(false);
      setShowDonatedBook(false);
    }}
    className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
      showBookreq ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
    }`}
     
  >
    <i className="icofont-home" style={{ marginRight: "5px" }}></i>Book Request
  </button>

  <button
    onClick={() => {
      setShowAddBook(false);
      setShowBooks(false);
      setShowSpotlight(false);
      setShowBookreq(false);
      setShowManageEbook(true);
      setShowIssuedBook(false);
      setShowDonatedBook(false);
    }}
    className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
      showManageEbook ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
    }`}
     
  >
    <i className="icofont-home" style={{ marginRight: "5px" }}></i>E-Book
  </button>

  <button
    onClick={() => {
      setShowAddBook(false);
      setShowBooks(false);
      setShowSpotlight(false);
      setShowBookreq(false);
      setShowManageEbook(false);
      setShowIssuedBook(true);
      setShowDonatedBook(false);
    }}
    className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
      showIssuedBook ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
    }`}
     
  >
    <i className="icofont-home" style={{ marginRight: "5px" }}></i>Issued History
  </button>

  <button
    onClick={() => {
      setShowAddBook(false);
      setShowBooks(false);
      setShowSpotlight(false);
      setShowBookreq(false);
      setShowManageEbook(false);
      setShowIssuedBook(false);
      setShowDonatedBook(true);
    }}
    className={`mx-2 px-4 py-2 transition-all duration-300 rounded-lg ${
      showDonatedBook ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:text-gray-900"
    }`}
     
  >
    <i className="icofont-home" style={{ marginRight: "5px" }}></i>Donation History
  </button>
</nav>



        </div>
      </header>







      <div className="p-6 max-w-4xl mx-auto text-black">
        <h1  data-aos="zoom-in" className="text-2xl text-center font-bold mb-4">Admin Panel</h1>
<Stats/>
        {showAddBook && (
          <>
            <h1 data-aos="zoom-in" className="text-xl font-bold my-4">Add a book</h1>

            {/* Add Book Form */}
            <form data-aos="zoom-in"  className="grid gap-4 bg-gray-300 c-black p-4 rounded" onSubmit={handleSubmit}>
              {Object.keys(formData).map((key) => (
                <input
                  key={key}
                  type={key === "availableQty" ? "number" : "text"}
                  name={key}
                  placeholder={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
              ))}

              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add Book
              </button>
            </form>
          </>
        )}

        {/* Book List */}
        {showBooks && <div className="mt-6">
          <h2 data-aos="zoom-in" className="text-xl font-bold">Book List</h2>
          {books.map((book) => (
            <div data-aos="zoom-in" key={book._id} className="p-4 my-2 bg-gray-200 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{book.title}</p>
                <p>Author: {book.author}</p>
                <p>Category: {book.category}</p>
                <p>Available: {book.availableQty}</p>
                <p>Floor: {book.floor}</p>
                <p>Row: {book.row}</p>
                <p>Cnum: {book.cnum}</p>
              </div>
              <div className="space-x-2">
                <button
                  className="bg-green-500 text-white p-2 rounded"
                  onClick={() => handleUpdate(book._id, book.availableQty + 1)}
                >
                  +1
                </button>
                <button className="bg-red-500 text-white p-2 rounded" onClick={() => handleDelete(book._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>}

        {showSpotlight && <AdminSpotlight />}
        {showBookreq && <AdminBookRequests />}
        {showManageEbook && <AdminEbookManager />}
        {showIssuedBook && <AdminIssuedBooks />}
        {showDonatedBook && <AdminDonations />}
      </div>

    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/book`);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    const books = await res.json();
    return { props: { books } };
  } catch (error) {
    console.error("Error fetching books:", error);
    return { props: { books: [] } };
  }
}
