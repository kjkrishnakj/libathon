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
        const canvas = await html2canvas(element, { scale: 2 }); // Higher scale for better quality
        const imgData = canvas.toDataURL("image/png");
    
        const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
    
        const imgWidth = pageWidth - 20; // Leave some margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
    
        let y = 10; // Initial Y position
        if (imgHeight > pageHeight - 20) {
            // If the content is too long, add pages dynamically
            let heightLeft = imgHeight;
            let position = 10;
            while (heightLeft > 0) {
                pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                if (heightLeft > 0) {
                    pdf.addPage();
                    position = 0;
                }
            }
        } else {
            // If it fits on one page
            pdf.addImage(imgData, "PNG", 10, y, imgWidth, imgHeight);
        }
    
        pdf.save(`${issue.title} receipt.pdf`);
    };
    

    if (!issue) return <p>Loading...</p>;

    return (
        <div ref={receiptRef} style={{ textAlign: "center" }} className="p-4 border border-gray-400 rounded-md bg-gray-100 shadow-lg">
        {/* Library Logo */}
        <img src="/vitlogo.jpg" alt="Library Logo" className="mx-auto mb-4 w-45 h-28" />
      
        {/* Receipt Header */}
        <h2 className="text-2xl font-bold text-gray-800">Issue Receipt</h2>
      
        {/* Table Format for Details */}
        <table className="w-full mt-4 border-collapse border border-gray-300">
          <tbody>
            <tr className="border border-gray-300">
              <td className="p-2 font-semibold text-gray-700">Title</td>
              <td className="p-2 text-gray-700">{issue.title}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="p-2 font-semibold text-gray-700">Book ID</td>
              <td className="p-2 text-gray-700">{issue.bid}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="p-2 font-semibold text-gray-700">Issued By</td>
              <td className="p-2 text-gray-700">{issue.sid}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="p-2 font-semibold text-gray-700">Issue Date</td>
              <td className="p-2 text-gray-700">{new Date(issue.createdAt).toLocaleDateString()}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="p-2 font-semibold text-gray-700">Expected Return Date</td>
              <td className="p-2 text-gray-700">
                {new Date(new Date(issue.createdAt).getTime() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>
      
        {/* Return Policy */}
        <div className="mt-4 text-gray-700">
          <h3 className="text-lg font-semibold">Return Policy</h3>
          <p>This book must be returned within <strong>10 days</strong> from the issue date to avoid penalties.</p>
        </div>
      
        {/* Terms & Conditions */}
        <div className="mt-4 text-gray-700">
          <h3 className="text-lg font-semibold">Terms & Conditions</h3>
          <ul className="text-left list-disc pl-6">
            <li>Books returned late will incur a fine of ₹1 per day.</li>
            <li>Damaged or lost books must be replaced or paid for.</li>
            <li>Books are non-transferable and must be used by the borrower only.</li>
            <li>Keep the book in good condition and avoid markings.</li>
          </ul>
        </div>
      
      
    
      

            <button onClick={downloadPDF} className="mt-4 bg-blue-500 text-white p-2 rounded">Download PDF</button>
        </div>
    );
};

export default Receipt;
