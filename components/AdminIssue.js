 
// import { useEffect, useState } from "react";
// import "aos/dist/aos.css";
// import AOS from "aos";
// export default function AdminIssuedBooks() {
//     const [issues, setIssues] = useState([]);
//     useEffect(() => {
//         AOS.init();
       
//     }, [])
//     useEffect(() => {
//         const fetchIssues = async () => {
//             const response = await fetch("/api/addIssue");
//             const data = await response.json();
//             setIssues(data);
//         };

//         fetchIssues();
//     }, []);

//     return (
//         <div data-aos="zoom-in" className="p-4">
//             <h2 className="text-xl font-bold mb-4">Issued Books</h2>
//             <table className="min-w-full bg-white border border-gray-300">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="border px-4 py-2">Title</th>
//                         <th className="border px-4 py-2">Student ID</th>
//                         <th className="border px-4 py-2">Issue Date</th>
//                         <th className="border px-4 py-2">Return Date</th>
//                         <th className="border px-4 py-2">Penalty</th>
//                         <th className="border px-4 py-2">Returned</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {issues.map((issue) => (
//                         <tr key={issue._id} className="border">
//                             <td className="border px-4 py-2">{issue.title}</td>
//                             <td className="border px-4 py-2">{issue.sid.toUpperCase()}</td>
//                             <td className="border px-4 py-2">{new Date(issue.idate).toLocaleDateString()}</td>
//                             <td className="border px-4 py-2">{new Date(issue.rdate).toLocaleDateString()}</td>
//                             <td className="border px-4 py-2">{issue.penalty}</td>
//                             <td
//                                 className={`border px-4 py-2 text-white font-bold ${
//                                     issue.rs ? "bg-green-500" : "bg-red-500"
//                                 }`}
//                             >
//                                 {issue.rs ? "Yes" : "No"}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, User, Calendar, DollarSign, CheckCircle, XCircle } from "lucide-react"
import "aos/dist/aos.css"
import AOS from "aos"

export default function AdminIssuedBooks() {
  const [issues, setIssues] = useState([])

  useEffect(() => {
    AOS.init()
  }, [])

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await fetch("/api/addIssue")
      const data = await response.json()
      setIssues(data)
    }
    fetchIssues()
  }, [])

  const getReturnStatusColor = (returned) => {
    return returned ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"
  }

  const getReturnStatusIcon = (returned) => {
    return returned ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />
  }

  return (
    <Card data-aos="zoom-in" className="bg-white border-gray-200 shadow-lg">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-gray-900">
          <div className="p-2 bg-green-100 rounded-lg">
            <BookOpen className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-2xl font-semibold">Issued Books History</span>
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
            {issues.length} Records
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {issues.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Issued Books</h3>
            <p className="text-gray-600">No books have been issued yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header */}
              <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg font-semibold text-gray-700 text-sm border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Book Title
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Student ID
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Issue Date
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Return Date
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Penalty
                </div>
                <div className="text-center">Status</div>
              </div>

              {/* Data Rows */}
              <div className="space-y-2 mt-4">
                {issues.map((issue) => (
                  <Card
                    key={issue._id}
                    className="bg-gray-50 border-gray-200 hover:shadow-md transition-shadow duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="grid grid-cols-6 gap-4 items-center text-sm">
                        <div className="font-medium text-gray-900 truncate">{issue.title}</div>
                        <div className="text-gray-700 font-mono uppercase">{issue.sid}</div>
                        <div className="text-gray-600">{new Date(issue.idate).toLocaleDateString()}</div>
                        <div className="text-gray-600">{new Date(issue.rdate).toLocaleDateString()}</div>
                        <div className="font-semibold text-gray-900">
                          {issue.penalty > 0 ? `₹${issue.penalty}` : "₹0"}
                        </div>
                        <div className="flex justify-center">
                          <Badge variant="outline" className={getReturnStatusColor(issue.rs)}>
                            {getReturnStatusIcon(issue.rs)}
                            <span className="ml-1 font-medium">{issue.rs ? "Returned" : "Pending"}</span>
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
