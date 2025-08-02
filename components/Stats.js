// import { useEffect, useState } from "react";
// import CountUp from "react-countup";

// const Stats = () => {
//   const [totalBooks, setTotalBooks] = useState(0);
//   const [issuedBooks, setIssuedBooks] = useState(0);
//   const [eBooks, setEBooks] = useState(0);
//   const [bookreq, setBookreq] = useState(0);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_HOST}/api/totalBooks`)
//       .then((res) => res.json())
//       .then((data) => setTotalBooks(data.totalBooks))
//       .catch((err) => console.error("Error fetching books count:", err));

//     fetch(`${process.env.NEXT_PUBLIC_HOST}/api/issuedBooks`)
//       .then((res) => res.json())
//       .then((data) => setIssuedBooks(data.issuedBooks))
//       .catch((err) => console.error("Error fetching issued books count:", err));

//     fetch(`${process.env.NEXT_PUBLIC_HOST}/api/totalEbooks`)
//       .then((res) => res.json())
//       .then((data) => setEBooks(data.eBooks))
//       .catch((err) => console.error("Error fetching eBooks count:", err));

//     fetch(`${process.env.NEXT_PUBLIC_HOST}/api/totalBookreq`)
//       .then((res) => res.json())
//       .then((data) => setBookreq(data.bookreq))
//       .catch((err) => console.error("Error fetching book requests count:", err));
//   }, []);

//   return (
//     <section className="text-gray-600 bg-gray-200  body-font" style={{borderRadius:"2cm"}}>
//       <div className="container px-5 py-5 mx-auto">
//         <div className="flex flex-wrap -m-4 text-center">
//           <div className="p-4 sm:w-1/4 w-1/2">
//             <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
//               <CountUp start={0} end={totalBooks} duration={2.5} separator="," />
//             </h2>
//             <p className="leading-relaxed">Total Books</p>
//           </div>
//           <div className="p-4 sm:w-1/4 w-1/2">
//             <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
//               <CountUp start={0} end={issuedBooks} duration={2.5} separator="," />
//             </h2>
//             <p className="leading-relaxed">Books Issued</p>
//           </div>
//           <div className="p-4 sm:w-1/4 w-1/2">
//             <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
//               <CountUp start={0} end={eBooks} duration={2.5} separator="," />
//             </h2>
//             <p className="leading-relaxed">eBooks</p>
//           </div>
//           <div className="p-4 sm:w-1/4 w-1/2">
//             <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
//               <CountUp start={0} end={bookreq} duration={2.5} separator="," />
//             </h2>
//             <p className="leading-relaxed">Book Requests</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Stats;

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, TrendingUp, BarChart3, Smartphone, MessageSquare } from "lucide-react"
import CountUp from "react-countup"

const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, color = "#3B82F6" }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E5E7EB" strokeWidth={strokeWidth} fill="transparent" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
        </div>
      </div>
    </div>
  )
}

const MiniDonutChart = ({ value, total, color = "#3B82F6", size = 80 }) => {
  const percentage = total > 0 ? Math.min((value / total) * 100, 100) : 0
  const radius = 30
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#F3F4F6" strokeWidth="6" fill="transparent" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">
            <CountUp start={0} end={value} duration={2.5} separator="," />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Stats() {
  const [totalBooks, setTotalBooks] = useState(0)
  const [issuedBooks, setIssuedBooks] = useState(0)
  const [eBooks, setEBooks] = useState(0)
  const [bookreq, setBookreq] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Keep the original API calls exactly as they were
        await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_HOST}/api/totalBooks`)
            .then((res) => res.json())
            .then((data) => setTotalBooks(data.totalBooks))
            .catch((err) => console.error("Error fetching books count:", err)),

          fetch(`${process.env.NEXT_PUBLIC_HOST}/api/issuedBooks`)
            .then((res) => res.json())
            .then((data) => setIssuedBooks(data.issuedBooks))
            .catch((err) => console.error("Error fetching issued books count:", err)),

          fetch(`${process.env.NEXT_PUBLIC_HOST}/api/totalEbooks`)
            .then((res) => res.json())
            .then((data) => setEBooks(data.eBooks))
            .catch((err) => console.error("Error fetching eBooks count:", err)),

          fetch(`${process.env.NEXT_PUBLIC_HOST}/api/totalBookreq`)
            .then((res) => res.json())
            .then((data) => setBookreq(data.bookreq))
            .catch((err) => console.error("Error fetching book requests count:", err)),
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <Card className="bg-white border-gray-200 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading analytics...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate percentages for circular progress
  const maxValue = Math.max(totalBooks, issuedBooks, eBooks, bookreq, 100)
  const booksPercentage = totalBooks > 0 ? Math.min((totalBooks / maxValue) * 100, 100) : 0
  const issuedPercentage = totalBooks > 0 ? Math.min((issuedBooks / totalBooks) * 100, 100) : 0
  const ebooksPercentage = totalBooks > 0 ? Math.min((eBooks / totalBooks) * 100, 100) : 0
  const requestsPercentage = totalBooks > 0 ? Math.min((bookreq / totalBooks) * 100, 100) : 0

  return (
    <div className="space-y-8">
      {/* Main Analytics Dashboard */}
      <Card className="bg-gradient-to-r from-blue-50 via-white to-blue-50 border-blue-200 shadow-lg">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-gray-900">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-semibold">Library Analytics Dashboard</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
              Live Data
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Circular Progress Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Total Books */}
            <div className="text-center">
              <MiniDonutChart value={totalBooks} total={maxValue} color="#3B82F6" size={120} />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Books</h3>
                <p className="text-gray-600 text-sm">Available in library</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-600 font-medium">Collection</span>
                </div>
              </div>
            </div>

            {/* Books Issued */}
            <div className="text-center">
              <CircularProgress percentage={issuedPercentage} color="#10B981" size={120} />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Books Issued</h3>
                <p className="text-gray-600 text-sm">Currently borrowed</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-medium">
                    <CountUp start={0} end={issuedBooks} duration={2.5} separator="," />
                  </span>
                </div>
              </div>
            </div>

            {/* E-Books */}
            <div className="text-center">
              <CircularProgress percentage={ebooksPercentage} color="#F59E0B" size={120} />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">E-Books</h3>
                <p className="text-gray-600 text-sm">Digital collection</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Smartphone className="w-4 h-4 text-yellow-600" />
                  <span className="text-yellow-600 font-medium">
                    <CountUp start={0} end={eBooks} duration={2.5} separator="," />
                  </span>
                </div>
              </div>
            </div>

            {/* Book Requests */}
            <div className="text-center">
              <CircularProgress percentage={requestsPercentage} color="#EF4444" size={120} />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Book Requests</h3>
                <p className="text-gray-600 text-sm">Pending requests</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <MessageSquare className="w-4 h-4 text-red-600" />
                  <span className="text-red-600 font-medium">
                    <CountUp start={0} end={bookreq} duration={2.5} separator="," />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  <CountUp start={0} end={totalBooks} duration={2.5} separator="," />
                </div>
                <div className="text-sm text-gray-600">Total Books</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  <CountUp start={0} end={issuedBooks} duration={2.5} separator="," />
                </div>
                <div className="text-sm text-gray-600">Books Issued</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  <CountUp start={0} end={eBooks} duration={2.5} separator="," />
                </div>
                <div className="text-sm text-gray-600">E-Books</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  <CountUp start={0} end={bookreq} duration={2.5} separator="," />
                </div>
                <div className="text-sm text-gray-600">Book Requests</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
