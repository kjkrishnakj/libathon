// import React, { useEffect } from 'react' 
// import Image from 'next/image'
// import Link from 'next/link'
// import { useState } from 'react'
// import "aos/dist/aos.css";
// import AOS from "aos";

// import Head from "next/head";
 
// import { useRouter } from 'next/router'
// const Issue= (rnum) => {
//     const router = useRouter()
//     const { bookId,title, img } = router.query;
//     useEffect(() => {
//         AOS.init();
//         const storedRno = localStorage.getItem("rno");
//         setSid(storedRno)
//         console.log(sid);
//     }, [])
//     const [sname, setSname] = useState('');
//     const [rno, setRno] = useState("");
//     const [sid, setSid] = useState('');
//     const [issueid, setIssueid] = useState('');
//     // console.log("sid",sid);
    
//     const [bid, setBid] = useState(bookId); 
//     const [penalty, setPenalty] = useState(0);
//     const [rs, setRs] = useState(false);
//     const [idate, setIdate] = useState(new Date().toISOString().split('T')[0]);


//     const today = new Date();
//     today.setDate(today.getDate() + 10);
//     const [rdate, setRdate] = useState(today.toISOString().split('T')[0]);
//     const handleChange = (e) => {
//         if (e.target.name == 'sname') {
//             setSname(e.target.value);
            
//         }
//         // else if (e.target.name == 'title') {
//         //     setTitle(e.target.value);
//         //     console.log(title);
//         // }
        
//     }

//     const handleSubmit = async (e) => {

//         e.preventDefault()
//         const storedRno = localStorage.getItem("rno");
//         setSid(storedRno)
//         console.log(sid);
        
//         const data = { sname,sid,bid:bookId,title,idate,rdate,rs,penalty }

//         let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addIssue`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data),
//         });
    
//         let response = await res.json();
    
//         if (response.issueId) {
//             console.log("Issue ID:", response.issueId);
//             setIssueid(response.issueId); // Store issueId in state if needed
//         }
//     };

//     return (
//         <div>
//             {/* <ToastContainer /> */}
//             <Head><title>Lib | issue</title></Head>
//             <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
//                 <div className="mt-16  sm:mx-auto sm:w-full sm:max-w-sm">
//                     <img className='mx-auto' src={img} alt="" style={{ height: "18rem", width: "16rem" }}/>
//                     <h2 data-aos="zoom-in" className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Details of your </h2>
//                 </div>

//                 <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" data-aos="zoom-in">
//                     <form  className="space-y-6" action="#" method="POST">
//                         <div>
//                             <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
//                             <div className="mt-2">
//                                 <input value={sname} onChange={handleChange} id="name" name="sname" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  p-3 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
//                             <div className="mt-2">
//                                 <input value={title}  id="name" name="sname" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Reg no.</label>
//                             <div className="mt-2">
//                                 <input value={sid}  onChange={handleChange}   id="name" name="sname" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Issue Date</label>
//                             <div className="mt-2">
//                                 <input
//                                     value={idate}
                                    
//                                     id="date"
//                                     name="date"
//                                     type="date"
//                                     required
//                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Return Date</label>
//                             <div className="mt-2">
//                                 <input
//                                     value={rdate}
//                                     id="date"
//                                     name="date"
//                                     type="date"
//                                     required
//                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>


//                         <div>
//                             <button onClick={handleSubmit} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">issue</button>
//                         </div>
//                     </form>
//                     <Link href={`/receipt?id=${issueid}`} className="bg-green-500 text-white p-2 rounded">
//     Generate Receipt
// </Link>

                    
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Issue

import AdminBookRequests from "@/components/AdminBookRequests";
import AdminSpotlight from "@/components/AdminSpotlight";
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
      <AdminSpotlight />
      <AdminBookRequests />
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
