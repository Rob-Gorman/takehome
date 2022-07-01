const express = require('express')
const router = require('./routes/api')

const PORT = 3001;
const app = express();

app.use(function (req, res, next) {
  res.flush = function () { /* Do nothing */ }
  next();
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});