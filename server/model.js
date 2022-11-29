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

module.exports = {
  getReviews,
}