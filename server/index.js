const express = require('express')
const router = require('./routes/api')

const PORT = 3001;
const app = express();
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});