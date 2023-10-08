const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Import the cors middleware
const loadData = require('./utils/loadData');

const reviewRouter = require('./route/review.route');
const apiVersion = 'v1';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
// app.use(async (req, res, next) => {
//     await loadData.importData()
//     next()
// });


app.use(cors());

app.get('/', (req, res) => {
  res.send('Hey biatch');
});

app.use(`/api/${apiVersion}/reviews`, reviewRouter);

module.exports = app;
