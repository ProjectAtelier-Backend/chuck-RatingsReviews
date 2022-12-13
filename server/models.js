// const db = require('../database/queries');
const db_getReviews = require('../database/queries/getReviews.js');
const db_getReviewMeta = require('../database/queries/getReviewMeta.js');
const db_addReview = require('../database/queries/addReview.js');
const db_voteReview = require('../database/queries/voteReview.js');
const db_reportReview = require('../database/queries/reportReview.js');

module.exports = {
  getReviews: (req, res) => {
    console.log("?????get reviews req body????", req.params, req.query)
    const productId = req.params.product_id;
    const page = parseInt(req.query.page) || 1;
    const count = parseInt(req.query.count) || 5;
    const sort = req.query.sort || 'relevant';

    db_getReviews({ productId, page, count, sort })
      .then(data => {
        res.status(200).send({ product: productId, page, count, results: data.results })
      })
      .catch(err => {
        res.send(500).send(err)
      })
  },

  getReviewMeta: (req, res) => {
    // console.log("?????get review meta req body????", req.params)
    db_getReviewMeta(req.params.product_id)
      .then(data => {
        // console.log("i got reviewmeta", data)
        res.status(200).send(data)
      })
      .catch(err => {
        // console.log("get reviewMeta error", err)
        res.status(500).send(err)
      })
  },

  addReview: (req, res) => {
    db_addReview(req.query)
      .then(data => {
        let review_id = data[0]
        res.status(201).send( review_id )
      })
      .catch(err => {
        res.status(500).send(err)
      })
  },

  voteReview: (req, res) => {
    db_voteReview(req.params.review_id)
      .then(data => {
        res.sendStatus(204)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  },

  reportReview: (req, res) => {
    db_reportReview(req.params.review_id)
      .then(data => {
        res.sendStatus(204)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }

}