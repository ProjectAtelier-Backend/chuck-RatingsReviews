const axios = require('axios');
const url = 'http://localhost:3001'

describe('API Server Unit Tests', () => {
  test('get reviews', async () => {
    const response = await axios.get(`${url}/reviews`);
    expect(response.data.length).toBe(5);
    expect(response.data[0].product_id).toBe(20);
    expect(response.data[0].review_id).toBe(61);
    expect(response.data[0].body).toBeDefined();
  })


})


