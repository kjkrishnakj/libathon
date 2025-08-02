// import { useEffect, useState } from "react";
// import "aos/dist/aos.css";
// import AOS from "aos";
// export default function AdminBookRequests() {
//   const [requests, setRequests] = useState([]);
//   useEffect(() => {
//     AOS.init();
   
// }, [])
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await fetch("/api/bookrequests");
//         if (!res.ok) throw new Error("Failed to fetch");
//         setRequests(await res.json());
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchRequests();
//   }, []);

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       await fetch("/api/bookrequests", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, status }),
//       });
//       setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
//     } catch (error) {
//       console.error("Update error", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this request?")) return;
//     try {
//       await fetch("/api/bookrequests", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });
//       setRequests((prev) => prev.filter((r) => r._id !== id));
//     } catch (error) {
//       console.error("Delete error", error);
//     }
//   };

//   return (
//     <div data-aos="zoom-in" className="mt-6 p-4 bg-gray-100 rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Book Requests</h2>
//       {requests.length === 0 ? <p>No requests found.</p> : requests.map((req) => (
//         <div key={req._id} className="p-4 bg-white shadow rounded mb-2 flex justify-between">
//           <div>
//             <p className="font-bold">{req.title}</p>
//             <p>Author: {req.author}</p>
//             <p>Status: <span className={req.status === "Pending" ? "text-yellow-500" : req.status === "Approved" ? "text-green-500" : "text-red-500"}>{req.status}</span></p>
//           </div>
//           <div className="space-x-2">
//             {req.status === "Pending" && (
//               <>
//                 <button onClick={() => handleStatusUpdate(req._id, "Approved")} className="bg-green-500 text-white p-2 rounded">Approve</button>
//                 <button onClick={() => handleStatusUpdate(req._id, "Rejected")} className="bg-red-500 text-white p-2 rounded">Reject</button>
//               </>
//             )}
//             <button onClick={() => handleDelete(req._id)} className="bg-gray-500 text-white p-2 rounded">Delete</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, User, CheckCircle, XCircle, Trash2, Clock, AlertCircle } from "lucide-react"
import "aos/dist/aos.css"
import AOS from "aos"

export default function AdminBookRequests() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    AOS.init()
  }, [])

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/bookrequests")
        if (!res.ok) throw new Error("Failed to fetch")
        setRequests(await res.json())
      } catch (error) {
        console.error(error)
      }
    }
    fetchRequests()
  }, [])

  const handleStatusUpdate = async (id, status) => {
    try {
      await fetch("/api/bookrequests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)))
    } catch (error) {
      console.error("Update error", error)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request?")) return
    try {
      await fetch("/api/bookrequests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      setRequests((prev) => prev.filter((r) => r._id !== id))
    } catch (error) {
      console.error("Delete error", error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Approved":
        return "bg-green-100 text-green-700 border-green-200"
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4" />
      case "Approved":
        return <CheckCircle className="w-4 h-4" />
      case "Rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <Card data-aos="zoom-in" className="bg-white border-gray-200 shadow-lg">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-gray-900">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-2xl font-semibold">Book Requests Management</span>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
            {requests.length} Total
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {requests.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Book Requests</h3>
            <p className="text-gray-600">No book requests have been submitted yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <Card key={req._id} className="bg-gray-50 border-gray-200 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{req.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4" />
                          <span className="text-sm">Author: {req.author}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(req.status)}>
                          {getStatusIcon(req.status)}
                          <span className="ml-1 font-medium">{req.status}</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {req.status === "Pending" && (
                        <>
                          <Button
                            onClick={() => handleStatusUpdate(req._id, "Approved")}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleStatusUpdate(req._id, "Rejected")}
                            size="sm"
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      <Button
                        onClick={() => handleDelete(req._id)}
                        size="sm"
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
