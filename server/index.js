const express = require('express');
const app = express();
const port = 3001;
const models = require('./model.js');

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})



// ---- RATINGS & REVIEWS ROUTES ---- //

//Returns a list of reviews for a particular product
app.get('/reviews', (req, res) => {
  return models.getReviews(20)
    .then((data) => {
      res.status(200).send(data)
    })
});

//Returns review metadata for a given product
app.get('/reviews/meta', (req, res) => {
  res.end();
});

//Adds a review for the given product
app.post('/reviews', (req, res) => {
  res.end();
});

//Updates a review to show it was found helpful
app.put('/reviews/:review_id/helpful', (req, res) => {
  res.end();
});

//Updates a review to show it was reported
app.put('/reviews/:review_id/report', (req, res) => {
  res.end();
});

