// import React, { useState, useEffect } from 'react';
// import "aos/dist/aos.css";
// import AOS from "aos";
// const AdminEbookManager = () => {
//     const [ebooks, setEbooks] = useState([]);
//     const [name, setName] = useState('');
//     const [link, setLink] = useState('');
//     useEffect(() => {
//         AOS.init();
         
//     }, [])
//     useEffect(() => {
//         fetch('/api/ebooks')
//             .then(res => res.json())
//             .then(data => setEbooks(data))
//             .catch(err => console.error('Error fetching ebooks:', err));
//     }, []);

//     const addEbook = async () => {
//         if (!name || !link) return alert("Both fields are required");

//         const res = await fetch('/api/ebooks', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name, link })
//         });

//         const data = await res.json();
//         if (res.ok) {
//             setEbooks([...ebooks, { _id: data._id, name, link }]);
//             setName('');
//             setLink('');
//         } else {
//             alert(data.error);
//         }
//     };

//     const removeEbook = async (id) => {
//         const res = await fetch('/api/ebooks', {
//             method: 'DELETE',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ id })
//         });

//         if (res.ok) {
//             setEbooks(ebooks.filter(ebook => ebook._id !== id));
//         } else {
//             alert("Failed to delete ebook");
//         }
//     };

//     return (
//         <div data-aos="zoom-in" className="p-6 border rounded-lg shadow-lg bg-white">
//             <h2 className="text-xl font-bold mb-4">📖 Manage Ebooks</h2>

//             {/* Add Ebook Form */}
//             <div className="mb-6">
//                 <input type="text" placeholder="Ebook Name" className="w-full p-2 border rounded mb-2" value={name} onChange={(e) => setName(e.target.value)} />
//                 <input type="text" placeholder="Ebook Link" className="w-full p-2 border rounded mb-2" value={link} onChange={(e) => setLink(e.target.value)} />
//                 <button onClick={addEbook} className="w-full bg-green-500 text-white p-2 rounded">Add Ebook</button>
//             </div>

//             {/* List of Ebooks */}
//             <div>
//                 <h3 className="text-lg font-semibold mb-3">📚 Existing Ebooks</h3>
//                 {ebooks.length === 0 ? (
//                     <p className="text-gray-500">No ebooks available.</p>
//                 ) : (
//                     ebooks.map((ebook) => (
//                         <div key={ebook._id} className="flex justify-between items-center p-3 border rounded-lg shadow-md mb-2">
//                             <span>{ebook.name}</span>
//                             <button onClick={() => removeEbook(ebook._id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminEbookManager;

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Plus, Trash2, ExternalLink, BookOpen } from "lucide-react"
import "aos/dist/aos.css"
import AOS from "aos"

const AdminEbookManager = () => {
  const [ebooks, setEbooks] = useState([])
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    AOS.init()
  }, [])

  useEffect(() => {
    fetch("/api/ebooks")
      .then((res) => res.json())
      .then((data) => setEbooks(data))
      .catch((err) => console.error("Error fetching ebooks:", err))
  }, [])

  const addEbook = async () => {
    if (!name || !link) {
      alert("Both fields are required")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/ebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, link }),
      })
      const data = await res.json()
      if (res.ok) {
        setEbooks([...ebooks, { _id: data._id, name, link }])
        setName("")
        setLink("")
      } else {
        alert(data.error)
      }
    } catch (error) {
      alert("Failed to add ebook")
    } finally {
      setIsLoading(false)
    }
  }

  const removeEbook = async (id) => {
    if (!window.confirm("Are you sure you want to remove this ebook?")) return

    try {
      const res = await fetch("/api/ebooks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setEbooks(ebooks.filter((ebook) => ebook._id !== id))
      } else {
        alert("Failed to delete ebook")
      }
    } catch (error) {
      alert("Failed to delete ebook")
    }
  }

  return (
    <Card data-aos="zoom-in" className="bg-white border-gray-200 shadow-lg">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-gray-900">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Smartphone className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-2xl font-semibold">E-Books Management</span>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
            {ebooks.length} E-Books
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Add Ebook Form */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Plus className="w-5 h-5 text-purple-600" />
              Add New E-Book
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">E-Book Name</label>
              <Input
                type="text"
                placeholder="Enter e-book name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Download Link</label>
              <Input
                type="url"
                placeholder="Enter download link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <Button
              onClick={addEbook}
              disabled={isLoading || !name.trim() || !link.trim()}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding E-Book...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add E-Book
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* List of Ebooks */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Existing E-Books
          </h3>
          {ebooks.length === 0 ? (
            <div className="text-center py-12">
              <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No E-Books Available</h3>
              <p className="text-gray-600">Add your first e-book using the form above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {ebooks.map((ebook) => (
                <Card
                  key={ebook._id}
                  className="bg-gray-50 border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{ebook.name}</h4>
                          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                            <ExternalLink className="w-3 h-3" />
                            <span className="truncate max-w-xs">{ebook.link}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => window.open(ebook.link, "_blank")}
                          size="sm"
                          variant="outline"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          onClick={() => removeEbook(ebook._id)}
                          size="sm"
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminEbookManager
