const express = require('express');
const app = express();
const port = 3001;
const models = require('./models.js');
const router = require('./router')

// app.get('/', (req, res) => {
//   res.status(200).send('Hello World!');
// })

app.use('/reviews', router)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})