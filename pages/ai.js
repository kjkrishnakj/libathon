import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [descriptions, setDescriptions] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setDescriptions(['Please enter a book title or topic.']);
      return;
    }

    try {
      
      // Initialize Gemini API
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      toast.success("Fetching the data ", { autoClose: 2000 })

      // Generate description
      const prompt = `Provide description of the book related to: ${query} in a line and in second line give related books to the searched book. If the input is not related to any book, respond with descriptions to different books related to the input`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Split the response into individual book descriptions
      const formattedDescriptions = text.split(/\\/).filter(Boolean);
      setDescriptions(formattedDescriptions);
    } catch (error) {
      console.error('Error fetching book description:', error);
      setDescriptions(['Failed to fetch description. Please try again.']);
    }
  };

  return (
    <div style={{ padding: '20px',textAlign:"center" }}>
      <ToastContainer />
      <h1 className='my-4 text-xl font-bold'>Book Description Search</h1>
      <input
        type="text"
      className='my-4  '
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter book title or topic"
        style={{ width: '600px',textAlign:'center',padding: '10px',borderRadius:'10px',border: "2px solid black", marginRight: '10px' }}
      />
      <button className='bg-indigo-600' onClick={handleSearch} style={{ padding: '10px' ,color:"white",borderRadius:"10px" }}>
        Search
      </button>
      {descriptions.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2 className="text-xl font-bold">Results</h2>

          {descriptions.map((desc, index) => (
            <div className='text-xl' key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <p style={{ whiteSpace: 'pre-wrap' }}>{desc.trim()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
