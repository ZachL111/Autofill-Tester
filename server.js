const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/submit', (req, res) => {
  const data = JSON.stringify(req.body, null, 2);
  fs.appendFile('submissions.txt', data + '\n', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving data');
    } else {
      res.send('Data saved successfully');
    }
  });
});

app.listen(3001, () => console.log('Server running on port 3001'));
