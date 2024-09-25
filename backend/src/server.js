const express = require('express');
const { json } = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const main = require('./gettingStarted.js');
const { interviewer, reviewer } = require('./interview.js');
const askLLM = require('./askLLM.js');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express(PORT);
app.use(json());
app.use(cors());



async function testLLM() {
  const prompt = "What is the capital of France?";
  const completion = await askLLM(prompt);
  console.log("test complete: ", completion);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  testLLM();
});

app.post('/api/gettingStarted',
  multer({ dest: 'src/uploads/' }).single('resume'),
  main,
  (req, res) => {
    // Access summarized content from req object
    const summarizedResume = req.summarizedContent;
    //console.log('Summarized Resume!', summarizedResume);
    req.app.locals.summarizedResume = summarizedResume;
    //res.end();
  }
);

// app.get('/api/resume', (req, res) => {
//   res.json({ summary: summarizedResume });
// });


app.post('/api/interviewer-asks', (req, res, next) => {
  req.summarizedResume = req.app.locals.summarizedResume;
  next();
}, interviewer);

app.post('/api/reviewer-reviews', (req, res, next) => {
  req.summarizedResume = req.app.locals.summarizedResume;
  next();
}, reviewer);
