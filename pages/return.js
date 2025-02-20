"use client";
import { useState, useEffect } from "react";

const ReturnBook = () => {
    const [name, setName] = useState("");
    const [regNo, setRegNo] = useState("");
    const [bookId, setBookId] = useState("");
    const [message, setMessage] = useState("");
    const [penalty, setPenalty] = useState(null);

    useEffect(() => {
        setName(localStorage.getItem("sname") || "");
        setRegNo(localStorage.getItem("rno") || "");
    }, []);

    const handleReturn = async () => {
        if (!bookId) {
            setMessage("Please enter a Book ID!");
            return;
        }

        try {
            const res = await fetch("/api/return", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bid: bookId, sid: regNo }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage("Book returned successfully!");
                setPenalty(data.penalty);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage("Error returning book!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Return Book</h2>

                <label className="block mb-2 text-gray-600">Name</label>
                <input
                    type="text"
                    value={name}
                    disabled
                    className="w-full p-2 mb-4 border rounded bg-gray-200"
                />

                <label className="block mb-2 text-gray-600">Reg No</label>
                <input
                    type="text"
                    value={regNo}
                    disabled
                    className="w-full p-2 mb-4 border rounded bg-gray-200"
                />

                <label className="block mb-2 text-gray-600">Book ID</label>
                <input
                    type="text"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Enter Book ID"
                />

                <button
                    onClick={handleReturn}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Return Book
                </button>

                {message && <p className="mt-4 text-center text-red-600">{message}</p>}
                {penalty !== null && <p className="mt-2 text-center font-bold">Penalty: ₹{penalty}</p>}
            </div>
        </div>
    );
};

export default ReturnBook;
