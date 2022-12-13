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

  test('get reviews meta', async () => {
    const response = await axios.get(`${url}/reviews/meta`);
    expect(response.data.product_id).toBe(20);
    expect(response.data.ratings).toBeDefined();
    expect(response.data.recommended).toBeDefined();
    expect(response.data.characteristics).toBeDefined();
  })
})


