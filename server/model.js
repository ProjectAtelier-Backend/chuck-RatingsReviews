require('dotenv').config();
const Pool = require('pg').Pool;
// const pool = new Pool(process.env.db_credentials);
const pool = new Pool({
  user: process.env.db_credentials.user,
  host: process.env.db_credentials.host,
  password: process.env.db_credentials.password,
  port: process.env.db_credentials.port,
  database: 'sdc_ratings_and_reviews',
});

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

const createReview = (body) => {
  return new Promise(function(resolve, reject) {
    const { product_id, rating, summary, body, recommend, name, email, photos, characteristics } = body;
    pool.query(`INSERT INTO reviews (product_id, rating, summary, body, recommend,reviewer_name, reviewer_email)
    VALUES (${product_id}, ${rating}, ${summary}, ${body}, ${recommend}, ${name}, ${email}) RETURNING review_id`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(pool.query(`INSERT INTO photos (review_id, url)
      VALUES ((SELECT review_id from reviews), ${photos}) RETURNING *`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(pool.query(`INSERT INTO characteristics (product_id, type)
        VALUES (${product_id}, ${characteristics}) RETURNING *`, (error, results) => {
          if (error) {
            reject(error)
          }
          resolve(`A new review has been added: ${results.rows[0]}`)
        }))
      }))
    })
  })
}


module.exports = {
  getReviews,
  getCharacteristicsType,
  getCharacteristicsValue,
  getRatingRecommended,
  voteReview,
  reportReview,
  createReview,
}