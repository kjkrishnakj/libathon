import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import "aos/dist/aos.css";
import AOS from "aos";
import Head from "next/head";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Issue = () => {
    const router = useRouter();
    const { bookId, title, img } = router.query;

    const [sname, setSname] = useState('');
    const [sid, setSid] = useState('');
    const [issueid, setIssueid] = useState('');
    const [penalty, setPenalty] = useState(0);
    const [rs, setRs] = useState(false);
    const [idate, setIdate] = useState(new Date().toISOString().split('T')[0]);

    const today = new Date();
    today.setDate(today.getDate() + 10);
    const [rdate, setRdate] = useState(today.toISOString().split('T')[0]);

    useEffect(() => {
        AOS.init();
        const storedRno = localStorage.getItem("rno");
        if (storedRno) {
            setSid(storedRno);
        }
        const user = localStorage.getItem("sname");
        setSname(user);
    }, []);

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // if (name === 'sname') {
        //     setSname(value);
        // }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storedRno = localStorage.getItem("rno");
        if (storedRno) {
            setSid(storedRno);
        }

        const data = { sname, sid, bid: bookId, title, idate, rdate, rs, penalty };

        try {
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addIssue`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            let response = await res.json();

            if (response.issueId) {
                toast.success("Book issues successfully ✅", { autoClose: 2000 })

                console.log("Issue ID:", response.issueId);
                setIssueid(response.issueId);
           
            const issueButton = document.getElementById("issueButton");
            if (issueButton) {
                issueButton.disabled = true;
                issueButton.textContent = "Thank you";
                issueButton.style.backgroundColor = "#d1d5db"; // Light gray
                issueButton.style.cursor = "not-allowed";
            } }
        } catch (error) {
            console.error("Error submitting issue:", error);
        }
    };

    return (
        <div>
            <ToastContainer />
            <Head>
                <title>BookHive | Issue</title>
            </Head>
            <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-sm">
                    {img && (
                        <img className='mx-auto' src={img} alt="Book Cover" style={{ height: "18rem", width: "16rem" }} />
                    )}
                    <h2 data-aos="zoom-in" className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Details of your Book
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" data-aos="zoom-in">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="sname" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                                <input value={sname} onChange={handleChange} id="sname" name="sname" type="text" required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset p-3 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                            <div className="mt-2">
                                <input value={title || ''} id="title" name="title" type="text" readOnly
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="sid" className="block text-sm font-medium leading-6 text-gray-900">Reg No.</label>
                            <div className="mt-2">
                                <input value={sid} id="sid" name="sid" type="text" readOnly
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="idate" className="block text-sm font-medium leading-6 text-gray-900">Issue Date</label>
                            <div className="mt-2">
                                <input value={idate} id="idate" name="idate" type="date" readOnly
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="rdate" className="block text-sm font-medium leading-6 text-gray-900">Return Date</label>
                            <div className="mt-2">
                                <input value={rdate} id="rdate" name="rdate" type="date" readOnly
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" id='issueButton'
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Issue
                                
                            </button>
                        </div>
                    </form>

                    {issueid && (
                        <Link href={`/receipt?id=${issueid}`} className="block text-center bg-green-500 text-white p-2 mt-4 rounded">
                            Generate Receipt
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Issue;
