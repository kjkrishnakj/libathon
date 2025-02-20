import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
    <div style={{ padding: '20px' }}>
      <h1>Book Description Search</h1>
      <input
        type="text"
      
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter book title or topic"
        style={{ width: '300px', padding: '10px', marginRight: '10px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px' }}>
        Search
      </button>
      {descriptions.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Results:</h2>
          {descriptions.map((desc, index) => (
            <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <p style={{ whiteSpace: 'pre-wrap' }}>{desc.trim()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}