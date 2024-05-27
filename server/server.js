const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/hackathon', { useNewUrlParser: true, useUnifiedTopology: true });

const dataSchema = new mongoose.Schema({
  CreditScore: Number,
  CreditLines: Number
});

const Data = mongoose.model('Data', dataSchema);

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      Data.insertMany(results, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('File uploaded and data saved.');
      });
      fs.unlinkSync(req.file.path); // Remove the file after processing
    });
});

app.get('/data', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const data = await Data.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  const count = await Data.countDocuments();
  res.json({
    data,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
