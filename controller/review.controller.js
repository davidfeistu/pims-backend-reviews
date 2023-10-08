const Review = require('./../model/review.model');
const apiUtils = require('./../utils/apiUtils');

const getAllReviews = async (req, res) => {
  try {
    const utils = new apiUtils(Review.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .peginate();
    const reviews = await utils.query;
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestedTime,
      results: reviews.length,
      data: {
        reviews: reviews,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fails',
      error: err,
    });
  }
};

const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestedTime,
      data: {
        review: review,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fails',
      error: err,
    });
  }
};

const createReview = async (req, res) => {
  try {
    let reviewsToCreate = req.body;
    if (!Array.isArray(req.body)) {
      reviewsToCreate = [req.body];
    }
    const createdReviews = await Promise.all(
      reviewsToCreate.map((reviewData) => Review.create(reviewData))
    );

    res.status(200).json({
      status: 'success',
      data: {
        reviews: createdReviews,
      },
    });
  } catch (err) {
    console.error('Error', err);
    res.status(500).json({
      status: 'fail',
      error: 'Internal Server Error',
    });
  }
};

const getStats = async (req, res) => {
    try{
        const stats = await Review.aggregate([
          {
            $group: {
              _id: '$type',
              numReview: {
                $sum: 1,
              },
              allLikes: {
                $sum: '$likes',
              },
              allViews: {
                $sum: '$views',
              },
              bestRating: {
                $max: '$rating',
              },
              worstRating: {
                $min: '$rating',
              },
              avgRating: {
                $avg: '$rating',
              },
            },
          },
        ]);

        res.status(200).json({
          status: 'success',
          data: {
            stats: stats,
          },
        });

    }catch(err){
        console.log('Errpr getTourStats: ', err);
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  getStats,
};
