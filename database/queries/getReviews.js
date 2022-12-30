const pool = require('../index.js');

module.exports = ({ productId, page, count, sort }) => {

  if (sort === 'newest') sort = 'date desc'
  if (sort === 'helpful') sort = 'helpfulness desc'
  if (sort === 'relevant') sort = 'helpfulness desc, date desc'

  const query = {
    text: `
    SELECT json_agg(reviews_list) FROM (
      SELECT reviews.review_id AS review_id, summary, body, to_timestamp(date::numeric/1000) as date, helpfulness, rating,
        recommend AS recommend, reviewer_name, response, (
          SELECT coalesce(json_agg(photos), '[]'::json) FROM (
            SELECT photo_id, url FROM photos WHERE review_id = reviews.review_id) photos
        ) AS photos FROM reviews
        WHERE product_id = ${productId}
        ORDER BY ${sort}
        LIMIT ${count}
      ) reviews_list;
    ;`
  }

  return pool
    .connect()
    .then(client => {
      return client
        .query(query)
        .then(async res => {
          const response = {};
          response['results'] = res.rows[0].json_agg;
          response['product'] = productId;
          response['page'] = page;
          response['count'] = count;
          client.release()
          return response
        })
        .catch(err => {
          client.release()
          console.log(err.stack)
          return err.stack
        })
    })
}

// module.exports = ({ productId, page, count, sort }) => {
//   let offset = (count * page - count)

//   if (sort === 'newest') sort = 'date desc'
//   if (sort === 'helpful') sort = 'helpfulness desc'
//   if (sort === 'relevant') sort = 'helpfulness desc, date desc'

//   count = count.toString()
//   offset = offset.toString()

//   const query = {
//     text: `
//     SELECT review_id, rating, summary, recommend, response, body, to_timestamp(date::numeric/1000) as date, reviewer_name, helpfulness
//     FROM reviews
//     WHERE product_id=$1 and reported=false
//     ORDER BY ${sort}
//     LIMIT $2
//     OFFSET $3
//     ;`,
//     values: [productId, count, offset]
//   }

//   return pool
//     .connect()
//     .then(client => {
//       return client
//         .query(query)
//         .then(async res => {
//           const response = {};
//           response['results'] = res.rows.map((review) => {
//             review['photos'] = [];
//             return review
//           })
//           for(let i = 0; i < response['results'].length; i++) {
//             const r_id = response['results'][i]['review_id'];
//             const photoQuery = {
//               text: `
//               SELECT photo_id as id, url FROM photos WHERE review_id=$1
//               ;`,
//               values: [r_id]
//             }
//             const photosArr = await client.query(photoQuery);
//             response['results'][i]['photos'] = photosArr.rows;
//           }
//           response['product'] = productId;
//           response['page'] = page;
//           response['count'] = count;

//           client.release()
//           return response
//         })
//         .catch(err => {
//           client.release()
//           console.log(err.stack)
//           return err.stack
//         })
//     })
// }
