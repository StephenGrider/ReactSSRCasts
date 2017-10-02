const express = require('express');
const app = express();

app.get('/', (req, res) => {});

app.listen(3000, () => {
  console.log('Listening on prot 3000');
});
