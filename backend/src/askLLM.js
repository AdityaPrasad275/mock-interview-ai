require('dotenv').config();

const { Groq } = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function askLLM(prompt) {
  const chatCompletion = await getGroqChatCompletion(prompt);
  // Print the completion returned by the LLM.
  const completion = chatCompletion.choices[0]?.message?.content || "";
  
  return completion;
}

async function getGroqChatCompletion(prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `${prompt}`,
      },
    ],
    model: "llama-3.1-70b-versatile",
  });
}

module.exports = askLLM;