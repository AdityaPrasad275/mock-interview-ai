const express = require('express');
const { json } = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const main = require('./gettingStarted.js');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express(PORT);
app.use(json());
app.use(cors());


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/api/gettingStarted', multer({ dest: 'src/uploads/' }).single('resume'), main);