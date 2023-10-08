const express = require('express');
const router = express.Router();

const controller = require('./../controller/review.controller');

router.route('/').get(controller.getAllReviews).post(controller.createReview);
router.route('/stats').get(controller.getStats);

router.route('/:id').get(controller.getReview);

module.exports = router;
