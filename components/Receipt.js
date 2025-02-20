import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Receipt = () => {
    const [issue, setIssue] = useState(null);
    const receiptRef = useRef();
    const router = useRouter();
    const { id } = router.query;  // Get issue ID from URL

    useEffect(() => {
        if (!id) return;
        fetch(`/api/getIssue?id=${id}`)
            .then((res) => res.json())
            .then((data) => setIssue(data));
    }, [id]);

    const downloadPDF = async () => {
        const element = receiptRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10, 180, 0);
        pdf.save("receipt.pdf");
    };

    if (!issue) return <p>Loading...</p>;

    return (
        <div>
           <div ref={receiptRef} className="p-4 border border-gray-400 rounded-md bg-gray-100 shadow-lg">
    <h2 className="text-2xl font-bold text-gray-800">Issue Receipt</h2>
    <p className="text-gray-700"><strong>Title:</strong> {issue.title}</p>
    <p className="text-gray-700"><strong>Book id:</strong> {issue.bid}</p>
    <p className="text-gray-700"><strong>Issued By:</strong> {issue.sid}</p>
    <p className="text-gray-700"><strong>Issue Date:</strong> {new Date(issue.createdAt).toLocaleDateString()}</p>
    <p className="text-gray-700"><strong>Expected   Return Date:</strong> {new Date(new Date(issue.createdAt).getTime() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
</div>

            <button onClick={downloadPDF} className="mt-4 bg-blue-500 text-white p-2 rounded">Download PDF</button>
        </div>
    );
};

export default Receipt;
