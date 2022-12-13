const express = require('express');
const router = express.Router();
const models = require('./models.js');


// router.get('/test', ()=>{console.log('-----got here!-----')});

router.get('/:product_id', models.getReviews);
router.get('/:product_id/meta', models.getReviewMeta);
router.post('/:product_id', models.addReview);
router.put('/:review_id/helpful', models.voteReview);
router.put('/:review_id/report', models.reportReview);

module.exports = router;