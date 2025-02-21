// const Spotlight = ({ messages }) => {
//     if (!messages.length) {
//       return <p className="text-center text-gray-500">No spotlight messages available.</p>;
//     }
  
//     return (
//       <div className="bg-yellow-100 p-4 rounded-md shadow-md my-4">
//         <h2 className="text-lg font-bold text-yellow-900">Spotlight Messages</h2>
//         <ul className="list-disc pl-5">
//           {messages.map((msg) => (
//             <li key={msg._id} className="text-yellow-700">
//               {msg.message}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };
  
//   export default Spotlight;
  
import { useEffect, useState } from "react";

const Spotlight = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/spotlight");
        if (!response.ok) {
          throw new Error("Failed to fetch spotlight messages");
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching spotlight messages:", error);
      }
    };

    fetchMessages();
  }, []);

  if (!messages.length) {
    return <p className="text-center text-gray-500">No spotlight messages available.</p>;
  }

  return (
    <div className="bg-yellow-100  p-4 rounded-md shadow-md my-4" style={{height:"44vh"}}>
      <h2 className="text-lg font-bold my-3 text-center text-yellow-900">Spotlight Messages</h2>
      <ul className="list-disc pl-5">
        {messages.map((msg) => (
          <li key={msg._id} className="text-yellow-700">
            {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Spotlight;
