import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in your .env.local
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method is allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || prompt.trim().length === 0) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const aiMessage = response.choices[0].message.content;

    res.status(200).json({ result: aiMessage });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ message: 'Failed to fetch from OpenAI', error: error.message });
  }
}
