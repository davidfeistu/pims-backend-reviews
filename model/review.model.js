const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Review must have a name'],
    maxlength: [40, 'Review name must have less then 40 characters'],
    minlength: [5, 'Review name must have more then 5 characters'],
  },
  description: {
    type: String,
    required: [true, 'Review must have a description'],
    maxlength: [800, 'Review description must have less then 40 characters'],
    minlength: [5, 'Review description must have more then 5 characters'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: {
      values: ['movie', 'hotel', 'food'],
      message: 'Type must be from: moview, hotel, food ',
    },
  },
  rating: {
    type: Number,
    default: 4.5,
    required: true,
    min: [1, 'Rating must be from 1.0 to 5.0'],
    max: [5, 'Rating must be from 1.0 to 5.0'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  image: {
    type: String,
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
