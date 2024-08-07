const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const askLLM = require('./askLLM.js');

// Extract text from PDF
const extractTextFromPdf = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  
  return data.text;
};

const summarizeText = async (text) => {
  //console.log('orignal text:', text);

  const prompt = `Here's a resume parsed from pdf to docx to text. can you create a summary that like 
                  like it doesnt lose any important information but its shorter and more concise? dont
                  lose project titles or por titles. like list them but the content in them should be summarised
                  forget about dates, not necessary. if you can maybe just include titles and like one-two word essance of each project, title thing. this summary
                  is meant to be given to an interviwer, he'll ask the details to the interviewwee if he needs them.
                  ${text}`;

  const response = await askLLM(prompt);
  
  return response;
};

const main = async (req, res) => {
  // Access the uploaded file
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Read the file content
  const fileContent = await extractTextFromPdf(file.path);
  
  const summarizedContent = await summarizeText(fileContent);

  res.json({ summary: summarizedContent });
  // Delete the file
  fs.unlink(file.path, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    }
  });
};

module.exports = main;