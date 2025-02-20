import { useEffect, useState } from "react";

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const response = await fetch("/api/donate");
    const data = await response.json();
    if (data.success) setDonations(data.donations);
  };

  const updateStatus = async (id, newStatus) => {
    await fetch("/api/donate", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });

    fetchDonations(); // Refresh data
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-xl font-bold mb-4">Manage Book Donations</h2>
      <ul>
        {donations.map((donation) => (
          <li key={donation._id} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-semibold">{donation.bookTitle}</p>
              <p className="text-gray-500">Reg. No: {donation.regNo}</p>
              <p className={`text-sm ${donation.status === "Pending" ? "text-red-500" : "text-green-500"}`}>
                {donation.status}
              </p>
            </div>
            <button
              onClick={() => updateStatus(donation._id, donation.status === "Pending" ? "Completed" : "Pending")}
              className={`px-3 py-1 text-white rounded ${
                donation.status === "Pending" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {donation.status === "Pending" ? "Mark as Completed" : "Mark as Pending"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
