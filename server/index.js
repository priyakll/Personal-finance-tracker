const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const transactionsRouter = require('./routes/transactions');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/personal-finance-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/transactions', transactionsRouter);

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
