const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from local machine!');
});

app.listen(4444, () => {
  console.log('Test server running on port 4444');
});
