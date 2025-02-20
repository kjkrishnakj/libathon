import React, { useEffect, useState } from 'react';
import Head from "next/head";

const Ebooks = () => {
    const [ebooks, setEbooks] = useState([]);

    useEffect(() => {
        fetch('/api/ebooks')
            .then(res => res.json())
            .then(data => setEbooks(data))
            .catch(err => console.error('Error fetching ebooks:', err));
    }, []);

    return (
        <>
        <Head><title>BookHive | Ebooks</title></Head>

        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center my-6">📚 Available Ebooks</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ebooks.map((ebook) => (
                    <div key={ebook._id} className="p-4 border rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold">{ebook.name}</h2>
                        <a href={ebook.link} target="_blank" className="text-blue-500 underline">
                            Download
                        </a>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
};

export default Ebooks;
