const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

// Extract text from PDF
const extractTextFromPdf = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  
  return data.text;
};

const main = async (req, res) => {
  // Access the uploaded file
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Read the file content
  const fileContent = await extractTextFromPdf(file.path);
  
  

  // Delete the file
  fs.unlink(file.path, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    }
  });
};

module.exports = main;