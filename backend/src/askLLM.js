require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const askLLM = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  try {
    const result = await model.generateContent(prompt);
    await sleep(4000); // Add a delay of 4 seconds
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error in askLLM:', error);
    throw error;
  }
};

module.exports = askLLM;
