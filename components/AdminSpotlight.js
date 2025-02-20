// import { useState } from "react";

// const AdminSpotlight = () => {
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await fetch("/api/spotlight", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to post spotlight message");
//       }

//       setSuccess("Message posted successfully!");
//       setMessage("");
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 p-6 rounded-md shadow-md my-4">
//       <h2 className="text-lg font-bold text-gray-800">Post Spotlight Message</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}
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
//     </div>
//   );
// };

// export default AdminSpotlight;

import { useState, useEffect } from "react";

const AdminSpotlight = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch all messages
  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/spotlight");
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Post a new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/spotlight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Failed to post message");

      setSuccess("Message posted successfully!");
      setMessage("");
      fetchMessages(); // Refresh messages after posting
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a message
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/spotlight`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send ID in the request body
      });
  
      if (!response.ok) throw new Error("Failed to delete message");
  
      setMessages(messages.filter((msg) => msg._id !== id)); // Update state after deletion
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md my-4">
      <h2 className="text-lg font-bold text-gray-800">Manage Spotlight Messages</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {/* Post Message Form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          className="w-full p-2 border rounded-md"
          rows="3"
          placeholder="Enter spotlight message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Message"}
        </button>
      </form>

      {/* View Messages */}
      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-700">All Spotlight Messages</h3>
        {messages.length === 0 ? (
          <p className="text-gray-500 mt-2">No messages available.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {messages.map((msg) => (
              <li
                key={msg._id}
                className="flex justify-between items-center bg-white p-2 rounded-md shadow"
              >
                <span className="text-gray-800">{msg.message}</span>
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminSpotlight;
