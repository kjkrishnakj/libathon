import { useState } from "react";

export default function Admin({ books }) {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.availableQty) {
      alert("Title, Author, and Quantity are required.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  const handleUpdate = async (id, qty) => {
    if (qty < 0) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/book`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, availableQty: qty }),
      });

      if (!response.ok) {
        throw new Error(`Update error: ${response.status}`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/book`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Delete error: ${response.status}`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-black">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Add Book Form */}
      <form className="grid gap-4 bg-gray-100 p-4 rounded" onSubmit={handleSubmit}>
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Book</button>
      </form>

      {/* Book List */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Book List</h2>
        {books.map((book) => (
          <div key={book._id} className="p-4 my-2 bg-gray-200 rounded flex justify-between items-center">
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
              <button className="bg-green-500 text-white p-2 rounded" onClick={() => handleUpdate(book._id, book.availableQty + 1)}>+1</button>
              <button className="bg-red-500 text-white p-2 rounded" onClick={() => handleDelete(book._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
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
