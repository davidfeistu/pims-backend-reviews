const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Review = require('./../model/review.model')

dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`Connected to database`);
});

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/sampleData.json`)
);

const importData = async () => {
  try {
    const reviewsDatabase = await Review.countDocuments();
    console.log('REV: ', reviewsDatabase);
    if (!reviewsDatabase) {
      await Review.create(reviews);
    }
  } catch (err) {
    console.log('Error importing data: ', err);
  }
};

module.exports = importData();
