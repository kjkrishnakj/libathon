// import { useEffect, useState } from "react";
// import "aos/dist/aos.css";
// import AOS from "aos";
// export default function AdminDonations() {
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     fetchDonations();
//   }, []);
//   useEffect(() => {
//     AOS.init();
    
// }, [])

//   const fetchDonations = async () => {
//     const response = await fetch("/api/donate");
//     const data = await response.json();
//     if (data.success) setDonations(data.donations);
//   };

//   const updateStatus = async (id, newStatus) => {
//     await fetch("/api/donate", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id, status: newStatus }),
//     });

//     fetchDonations(); // Refresh data
//   };

//   return (
//     <div data-aos="zoom-in" className="p-6 bg-white shadow-lg rounded-md">
//       <h2 className="text-xl font-bold mb-4">Manage Book Donations</h2>
//       <ul>
//         {donations.map((donation) => (
//           <li key={donation._id} className="flex justify-between items-center border-b py-2">
//             <div>
//               <p className="font-semibold">{donation.bookTitle}</p>
//               <p className="text-gray-500">Reg. No: {donation.regNo}</p>
//               <p className={`text-sm ${donation.status === "Pending" ? "text-red-500" : "text-green-500"}`}>
//                 {donation.status}
//               </p>
//             </div>
//             <button
//               onClick={() => updateStatus(donation._id, donation.status === "Pending" ? "Completed" : "Pending")}
//               className={`px-3 py-1 text-white rounded ${
//                 donation.status === "Pending" ? "bg-green-500" : "bg-red-500"
//               }`}
//             >
//               {donation.status === "Pending" ? "Mark as Completed" : "Mark as Pending"}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Hash, CheckCircle, Clock } from "lucide-react"
import "aos/dist/aos.css"
import AOS from "aos"

export default function AdminDonations() {
  const [donations, setDonations] = useState([])

  useEffect(() => {
    fetchDonations()
  }, [])

  useEffect(() => {
    AOS.init()
  }, [])

  const fetchDonations = async () => {
    const response = await fetch("/api/donate")
    const data = await response.json()
    if (data.success) setDonations(data.donations)
  }

  const updateStatus = async (id, newStatus) => {
    await fetch("/api/donate", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    })
    fetchDonations() // Refresh data
  }

  const getStatusColor = (status) => {
    return status === "Pending"
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : "bg-green-100 text-green-700 border-green-200"
  }

  const getStatusIcon = (status) => {
    return status === "Pending" ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />
  }

  return (
    <Card data-aos="zoom-in" className="bg-white border-gray-200 shadow-lg">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-gray-900">
          <div className="p-2 bg-red-100 rounded-lg">
            <Heart className="w-5 h-5 text-red-600" />
          </div>
          <span className="text-2xl font-semibold">Book Donations Management</span>
          <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200">
            {donations.length} Total
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {donations.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Donations Yet</h3>
            <p className="text-gray-600">No book donations have been received yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {donations.map((donation) => (
              <Card
                key={donation._id}
                className="bg-gray-50 border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{donation.bookTitle}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Hash className="w-4 h-4" />
                            <span>Reg. No: {donation.regNo}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(donation.status)}>
                          {getStatusIcon(donation.status)}
                          <span className="ml-1 font-medium">{donation.status}</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="ml-4">
                      <Button
                        onClick={() =>
                          updateStatus(donation._id, donation.status === "Pending" ? "Completed" : "Pending")
                        }
                        size="sm"
                        className={
                          donation.status === "Pending"
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-yellow-600 hover:bg-yellow-700 text-white"
                        }
                      >
                        {donation.status === "Pending" ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark as Completed
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 mr-1" />
                            Mark as Pending
                          </>
                        )}
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
