 
// import { useEffect, useState } from "react";

// const Spotlight = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch("/api/spotlight");
//         if (!response.ok) {
//           throw new Error("Failed to fetch spotlight messages");
//         }
//         const data = await response.json();
//         setMessages(data);
//       } catch (error) {
//         console.error("Error fetching spotlight messages:", error);
//       }
//     };

//     fetchMessages();
//   }, []);

//   if (!messages.length) {
//     return <p className="text-center text-gray-500">No spotlight messages available.</p>;
//   }

//   return (
//     <div className="bg-yellow-100  p-4 rounded-md shadow-md my-4" style={{height:"44vh"}}>
//       <h2 className="underline text-lg font-bold my-2 text-center text-yellow-900">Spotlight Messages</h2>
//       <ul className="list-disc pl-5">
//         {messages.map((msg) => (
//           <li key={msg._id} className="text-yellow-700">
//             {msg.message}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Spotlight;


"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Zap } from "lucide-react"

const Spotlight = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/spotlight")
        if (!response.ok) {
          throw new Error("Failed to fetch spotlight messages")
        }
        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.error("Error fetching spotlight messages:", error)
      }
    }

    fetchMessages()
  }, [])

  if (!messages.length) {
    return (
      <Card className="bg-white border-gray-200 h-[44vh] shadow-lg">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No spotlight messages available.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white border-gray-200 h-[44vh] overflow-hidden shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-gray-900">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-xl font-semibold">Spotlight Messages</span>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
            {messages.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 h-full overflow-y-auto">
        <div className="space-y-3 pb-6">
          {messages.map((msg, index) => (
            <div
              key={msg._id}
              className="group p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-blue-200 transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                    {msg.message}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Badge variant="outline" className="bg-white text-gray-500 border-gray-300 text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default Spotlight
