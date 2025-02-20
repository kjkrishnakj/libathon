import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
export default function AdminBookRequests() {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    AOS.init();
   
}, [])
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/bookrequests");
        if (!res.ok) throw new Error("Failed to fetch");
        setRequests(await res.json());
      } catch (error) {
        console.error(error);
      }
    };
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await fetch("/api/bookrequests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
    } catch (error) {
      console.error("Update error", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request?")) return;
    try {
      await fetch("/api/bookrequests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <div data-aos="zoom-in" className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Book Requests</h2>
      {requests.length === 0 ? <p>No requests found.</p> : requests.map((req) => (
        <div key={req._id} className="p-4 bg-white shadow rounded mb-2 flex justify-between">
          <div>
            <p className="font-bold">{req.title}</p>
            <p>Author: {req.author}</p>
            <p>Status: <span className={req.status === "Pending" ? "text-yellow-500" : req.status === "Approved" ? "text-green-500" : "text-red-500"}>{req.status}</span></p>
          </div>
          <div className="space-x-2">
            {req.status === "Pending" && (
              <>
                <button onClick={() => handleStatusUpdate(req._id, "Approved")} className="bg-green-500 text-white p-2 rounded">Approve</button>
                <button onClick={() => handleStatusUpdate(req._id, "Rejected")} className="bg-red-500 text-white p-2 rounded">Reject</button>
              </>
            )}
            <button onClick={() => handleDelete(req._id)} className="bg-gray-500 text-white p-2 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
