const { response } = require('express');
const pool = require('../index');

module.exports = async (product_id) => {
  queryReviews = {
    text: `
    SELECT review_id, rating, recommend FROM reviews WHERE product_id=$1
    ;`,
    values: [product_id]
  }

  queryCharacteristics = {
    text: `
    SELECT id, type FROM characteristics WHERE product_id=$1
    ;`,
    values: [product_id]
  }

  const client = await pool.connect()

  let r = await client.query(queryReviews)
  r = r.rows
  let c = await client.query(queryCharacteristics)
  c = c.rows

  // Create ratings and recommend object
  const ratings = {}
  const recommended = { 0: 0, 1: 0 }
  for (let i = 0; i < r.length; i++) {
    let review = r[i]
    ratings[review.rating] = ratings[review.rating] + 1 || 1

    if (review.recommend) {
      recommended['1'] += 1
    } else {
      recommended['0'] += 1
    }
  }

  // Create characteristics object
  const characteristics = {}
  for (let i = 0; i < c.length; i++) {
    let characteristicId = c[i].id
    let characteristicType = c[i].type
    queryCharacteristicsReviews = {
      text: `
      SELECT avg(value) FROM characteristic_reviews WHERE characteristic_id=$1
      ;`,
      values: [characteristicId]
    }
    let averageScore = await client.query(queryCharacteristicsReviews)
    if (averageScore.rows[0].avg !== null) {
      averageScore = averageScore.rows[0].avg.substring(0, 6)
      characteristics[characteristicType] = { id: characteristicId, value: averageScore }
    } else {
      characteristics[characteristicType] = { id: characteristicId, value: null }
    }
  }
  client.release()
  return { product_id, ratings, recommended, characteristics }
}