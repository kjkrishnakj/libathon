// import { useEffect, useState } from "react";

// export default function AdminIssuedBooks() {
//     const [issues, setIssues] = useState([]);

//     useEffect(() => {
//         const fetchIssues = async () => {
//             const response = await fetch("/api/addIssue");
//             const data = await response.json();
//             setIssues(data);
//         };

//         fetchIssues();
//     }, []);

//     return (
//         <div className="p-4">
//             <h2 className="text-xl font-bold mb-4">Issued Books</h2>
//             <table className="min-w-full bg-white border border-gray-300">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="border px-4 py-2">Title</th>
//                         <th className="border px-4 py-2">Student Name</th>
//                         <th className="border px-4 py-2">Issue Date</th>
//                         <th className="border px-4 py-2">Return Date</th>
//                         <th className="border px-4 py-2">Penalty</th>
//                         <th className="border px-4 py-2">Returned</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {issues.map((issue) => (
//                         <tr key={issue._id} className="border">
//                             <td className="border px-4 py-2">{issue.title}</td>
//                             <td className="border px-4 py-2">{issue.sname}</td>
//                             <td className="border px-4 py-2">{new Date(issue.idate).toLocaleDateString()}</td>
//                             <td className="border px-4 py-2">{new Date(issue.rdate).toLocaleDateString()}</td>
//                             <td className="border px-4 py-2">{issue.penalty}</td>
//                             <td className="border px-4 py-2">{issue.rs ? "Yes" : "No"}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
        
import { useEffect, useState } from "react";

export default function AdminIssuedBooks() {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            const response = await fetch("/api/addIssue");
            const data = await response.json();
            setIssues(data);
        };

        fetchIssues();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Issued Books</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Student Name</th>
                        <th className="border px-4 py-2">Issue Date</th>
                        <th className="border px-4 py-2">Return Date</th>
                        <th className="border px-4 py-2">Penalty</th>
                        <th className="border px-4 py-2">Returned</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map((issue) => (
                        <tr key={issue._id} className="border">
                            <td className="border px-4 py-2">{issue.title}</td>
                            <td className="border px-4 py-2">{issue.sname}</td>
                            <td className="border px-4 py-2">{new Date(issue.idate).toLocaleDateString()}</td>
                            <td className="border px-4 py-2">{new Date(issue.rdate).toLocaleDateString()}</td>
                            <td className="border px-4 py-2">{issue.penalty}</td>
                            <td
                                className={`border px-4 py-2 text-white font-bold ${
                                    issue.rs ? "bg-green-500" : "bg-red-500"
                                }`}
                            >
                                {issue.rs ? "Yes" : "No"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
