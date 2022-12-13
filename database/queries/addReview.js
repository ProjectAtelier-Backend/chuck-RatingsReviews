const pool = require('../index');

module.exports = async (review) => {
  console.log('review>>>', review)
  const { product_id, rating, summary, body, recommend, name, email, characteristics } = review
  const reviewer_name = review.name;
  const reviewer_email = review.email;
  const client = await pool.connect();
  const data = await client.query('select max(review_id) from reviews;');
  const review_id = data.rows[0].max+1;
  const values = [review_id, product_id, rating, summary, body, recommend, reviewer_name, reviewer_email]
  let query = {
    text: `
    INSERT INTO
    reviews(review_id, product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, reported)
    VALUES($1, $2, $3, extract(epoch from now())*1000, $4, $5, $6, $7, $8, false)
    RETURNING review_id
    ;`,
    values: values
  }

  return pool
    .connect()
    .then(client => {
      return client
        .query(query)
        .then(res => {
          client.release()
          return res.rows
        })
        .catch(err => {
          client.release()
          console.log(err.stack)
          return err.stack
        })
    })
}