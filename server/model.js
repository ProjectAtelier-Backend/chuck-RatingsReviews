require('dotenv').config();
const Pool = require('pg').Pool;
const pool = new Pool(process.env.db_credentials);

const getReviews = (product_id, page=1, count=5, sort='relevant') => {
  let order = '';
  if (sort === 'relevant') order = 'helpfulness DESC, date DESC';
  if (sort === 'helpful') order = 'helpfulness DESC';
  if (sort === 'newest') order = 'date DESC';
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT * FROM reviews WHERE product_id = ${product_id}
                ORDER BY ${order} LIMIT ${count};`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const getCharacteristicsType = (product_id) => {
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT * FROM characteristics WHERE product_id = ${product_id}`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const getCharacteristicsValue = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT value FROM characteristic_reviews WHERE characteristic_id = ${id}`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const getRatingRecommended = (product_id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT rating, recommend FROM reviews WHERE review_id <= 5', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const voteReview = (review_id) => {
  return new Promise(function(resolve, reject) {
    pool.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = ${review_id}`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const reportReview = (review_id) => {
  return new Promise(function(resolve, reject) {
    pool.query(`UPDATE reviews SET reported = t WHERE review_id = ${review_id}`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

module.exports = {
  getReviews,
  getCharacteristicsType,
  getCharacteristicsValue,
  getRatingRecommended,
}