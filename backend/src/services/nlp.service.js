const Groq = require('groq-sdk');
const { systemPrompt } = require('../utils/promptTemplates');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.AI_KEY });

const analyzeQuery = async (userQuery) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Analyze this query and return only JSON: "${userQuery}"`
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.1,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0]?.message?.content || '{}');
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
};

module.exports = {
  analyzeQuery
};