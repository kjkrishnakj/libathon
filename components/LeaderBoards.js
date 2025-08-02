// import { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const LeaderBoards = () => {
//   const [topUsers, setTopUsers] = useState([]);

//   useEffect(() => {
//     fetch("/api/topUser")
//       .then((res) => res.json())
//       .then((data) => {
//         setTopUsers(data);
//       })
//       .catch((err) => console.error("Error fetching top users:", err));
//   }, []);

//   useEffect(() => {
//     // console.log("Updated topUsers state:", topUsers);
//   }, [topUsers]); // Log only after state updates
  
//   // console.log(" topUsers state:", topUsers)
//   return (
//     <>
//     <section className="bg-gradient-to-r from-blue-400 to-indigo-600 text-white body-font py-1">
//       <div className="container px-5 mx-auto text-center" style={{ height: "44vh" }}>
//         <h2 className="text-2xl font-bold mb-2">🏆 Top 3 Users</h2>

//         {topUsers.length > 0 ? (
//           <div className="bg-white p-6 mb-6 shadow-lg">
//             <ResponsiveContainer width="100%" height={200}>
//               <BarChart data={topUsers} layout="vertical">
//                 <XAxis type="number" hide tick={{ fill: "#4F46E5", fontSize: 14, fontWeight: "bold" }} />
//                 <YAxis
//                   dataKey="_id"
//                   type="category"
//                   width={100}
//                   tickFormatter={(id) => id.toUpperCase()}
//                   tick={{ fill: "#323", fontSize: 14, fontWeight: "bold" }}
//                 />
//                 <Tooltip cursor={{ fill: "rgba(79,70,229,0.1)" }} />
//                 <Bar dataKey="count" fill="#4F46E5" barSize={45} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         ) : (
//           <p className="text-lg font-semibold animate-pulse">Loading...</p>
//         )}
//       </div>
//     </section>
//     </>
//   );
// };

// export default LeaderBoards;

"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp, Users, Award } from "lucide-react"

const LeaderBoards = () => {
  const [topUsers, setTopUsers] = useState([])

  useEffect(() => {
    fetch("/api/topUser")
      .then((res) => res.json())
      .then((data) => {
        setTopUsers(data)
      })
      .catch((err) => console.error("Error fetching top users:", err))
  }, [])

  const getTrophyIcon = (index) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 1:
        return <Award className="w-5 h-5 text-gray-400" />
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <Users className="w-5 h-5 text-blue-600" />
    }
  }

  const getBarColor = (index) => {
    switch (index) {
      case 0:
        return "#3B82F6" // Blue
      case 1:
        return "#6B7280" // Gray
      case 2:
        return "#4B5563" // Dark Gray
      default:
        return "#9CA3AF" // Light Gray
    }
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg">
          <p className="text-gray-900 font-semibold">{`User: ${label.toUpperCase()}`}</p>
          <p className="text-blue-600">{`Books Read: ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-white border-gray-200 h-[44vh] overflow-hidden shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-gray-900">
          <div className="p-2 bg-gray-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-gray-600" />
          </div>
          <span className="text-xl font-semibold">Top Readers</span>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
            Analytics
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 h-full">
        {topUsers.length > 0 ? (
          <div className="space-y-4">
            {/* Top 3 Users List */}
            <div className="grid grid-cols-1 gap-2 mb-4">
              {topUsers.slice(0, 3).map((user, index) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    {getTrophyIcon(index)}
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">{user._id.toUpperCase()}</p>
                      <p className="text-gray-500 text-xs">Rank #{index + 1}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-bold text-lg">{user.count}</p>
                    <p className="text-gray-500 text-xs">books read</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-sm font-medium">Reading Activity</span>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={topUsers} layout="vertical" margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="_id"
                    type="category"
                    width={60}
                    tickFormatter={(id) => id.toUpperCase()}
                    tick={{ fill: "#374151", fontSize: 11, fontWeight: "500" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" barSize={20} radius={[0, 4, 4, 0]}>
                    {topUsers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <p className="text-blue-600 text-xs font-medium">Total Users</p>
                <p className="text-gray-900 text-lg font-bold">{topUsers.length}</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                <p className="text-gray-600 text-xs font-medium">Total Books</p>
                <p className="text-gray-900 text-lg font-bold">{topUsers.reduce((sum, user) => sum + user.count, 0)}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading analytics...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default LeaderBoards
