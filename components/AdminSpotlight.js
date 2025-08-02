// import "aos/dist/aos.css";
// import AOS from "aos";

// import { useState, useEffect } from "react";

// const AdminSpotlight = () => {
//   useEffect(() => {
//     AOS.init();
   
// }, [])
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Fetch all messages
//   const fetchMessages = async () => {
//     try {
//       const response = await fetch("/api/spotlight");
//       if (!response.ok) throw new Error("Failed to fetch messages");
//       const data = await response.json();
//       setMessages(data);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   // Post a new message
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await fetch("/api/spotlight", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//       });

//       if (!response.ok) throw new Error("Failed to post message");

//       setSuccess("Message posted successfully!");
//       setMessage("");
//       fetchMessages(); // Refresh messages after posting
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a message
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`/api/spotlight`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id }), // Send ID in the request body
//       });
  
//       if (!response.ok) throw new Error("Failed to delete message");
  
//       setMessages(messages.filter((msg) => msg._id !== id)); // Update state after deletion
//     } catch (error) {
//       setError(error.message);
//     }
//   };
  

//   return (
//     <div data-aos="zoom-in" className="bg-gray-100 p-6 rounded-md shadow-md my-4">
//       <h2 className="text-lg font-bold text-gray-800">Manage Spotlight Messages</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}

//       {/* Post Message Form */}
//       <form onSubmit={handleSubmit} className="mt-4">
//         <textarea
//           className="w-full p-2 border rounded-md"
//           rows="3"
//           placeholder="Enter spotlight message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           required
//         ></textarea>
//         <button
//           type="submit"
//           className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
//           disabled={loading}
//         >
//           {loading ? "Posting..." : "Post Message"}
//         </button>
//       </form>

//       {/* View Messages */}
//       <div className="mt-6">
//         <h3 className="text-md font-semibold text-gray-700">All Spotlight Messages</h3>
//         {messages.length === 0 ? (
//           <p className="text-gray-500 mt-2">No messages available.</p>
//         ) : (
//           <ul className="mt-2 space-y-2">
//             {messages.map((msg) => (
//               <li
//                 key={msg._id}
//                 className="flex justify-between items-center bg-white p-2 rounded-md shadow"
//               >
//                 <span className="text-gray-800">{msg.message}</span>
//                 <button
//                   onClick={() => handleDelete(msg._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminSpotlight;

"use client"

import "aos/dist/aos.css"
import AOS from "aos"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Plus, Trash2, MessageSquare, Send } from "lucide-react"

const AdminSpotlight = () => {
  useEffect(() => {
    AOS.init()
  }, [])

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Fetch all messages
  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/spotlight")
      if (!response.ok) throw new Error("Failed to fetch messages")
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  // Post a new message
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch("/api/spotlight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })
      if (!response.ok) throw new Error("Failed to post message")
      setSuccess("Message posted successfully!")
      setMessage("")
      fetchMessages() // Refresh messages after posting
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Delete a message
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return

    try {
      const response = await fetch(`/api/spotlight`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send ID in the request body
      })

      if (!response.ok) throw new Error("Failed to delete message")
      setMessages(messages.filter((msg) => msg._id !== id)) // Update state after deletion
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Card data-aos="zoom-in" className="bg-white border-gray-200 shadow-lg">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-gray-900">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Zap className="w-5 h-5 text-yellow-600" />
          </div>
          <span className="text-2xl font-semibold">Spotlight Messages Management</span>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200">
            {messages.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Status Messages */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">{success}</p>
          </div>
        )}

        {/* Post Message Form */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Plus className="w-5 h-5 text-yellow-600" />
              Add New Spotlight Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Message Content</label>
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-yellow-500/20 resize-none"
                  rows="4"
                  placeholder="Enter spotlight message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading || !message.trim()}
                className="w-full h-12 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Posting Message...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Post Message
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* View Messages */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            All Spotlight Messages
          </h3>
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Messages Yet</h3>
              <p className="text-gray-600">Create your first spotlight message using the form above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <Card
                  key={msg._id}
                  className="bg-gray-50 border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-blue-100 rounded-lg mt-1">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                              #{index + 1}
                            </Badge>
                          </div>
                          <p className="text-gray-800 leading-relaxed">{msg.message}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDelete(msg._id)}
                        size="sm"
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 ml-4"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
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

export default AdminSpotlight
