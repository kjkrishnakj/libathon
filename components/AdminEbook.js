import React, { useState, useEffect } from 'react';

const AdminEbookManager = () => {
    const [ebooks, setEbooks] = useState([]);
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        fetch('/api/ebooks')
            .then(res => res.json())
            .then(data => setEbooks(data))
            .catch(err => console.error('Error fetching ebooks:', err));
    }, []);

    const addEbook = async () => {
        if (!name || !link) return alert("Both fields are required");

        const res = await fetch('/api/ebooks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, link })
        });

        const data = await res.json();
        if (res.ok) {
            setEbooks([...ebooks, { _id: data._id, name, link }]);
            setName('');
            setLink('');
        } else {
            alert(data.error);
        }
    };

    const removeEbook = async (id) => {
        const res = await fetch('/api/ebooks', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });

        if (res.ok) {
            setEbooks(ebooks.filter(ebook => ebook._id !== id));
        } else {
            alert("Failed to delete ebook");
        }
    };

    return (
        <div className="p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-xl font-bold mb-4">📖 Manage Ebooks</h2>

            {/* Add Ebook Form */}
            <div className="mb-6">
                <input type="text" placeholder="Ebook Name" className="w-full p-2 border rounded mb-2" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Ebook Link" className="w-full p-2 border rounded mb-2" value={link} onChange={(e) => setLink(e.target.value)} />
                <button onClick={addEbook} className="w-full bg-green-500 text-white p-2 rounded">Add Ebook</button>
            </div>

            {/* List of Ebooks */}
            <div>
                <h3 className="text-lg font-semibold mb-3">📚 Existing Ebooks</h3>
                {ebooks.length === 0 ? (
                    <p className="text-gray-500">No ebooks available.</p>
                ) : (
                    ebooks.map((ebook) => (
                        <div key={ebook._id} className="flex justify-between items-center p-3 border rounded-lg shadow-md mb-2">
                            <span>{ebook.name}</span>
                            <button onClick={() => removeEbook(ebook._id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminEbookManager;
