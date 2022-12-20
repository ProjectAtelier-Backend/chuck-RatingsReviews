import http from "k6/http";
import { check } from "k6";

export default function () {
  const url = 'http://localhost:3001';
  const product_id = Math.floor(Math.random() * (4655060 - 1)) + 1
  const response = http.batch([
    ['GET', `${url}/reviews/${product_id}`],
    ['GET', `${url}/reviews/${product_id}/meta`]
  ]);
  check(response[0], {
    "get reviews: is status 200?": (r) => r.status === 200,
    "get reviews: is product id the same we asked?": (r) => {
      const id = Number(r.json("product"));
      return id === product_id;
    }
  });
  check(response[1], {
    "get reviews meta: is status 200?": (r) => r.status === 200,
    "get reviews meta: is product id the same we asked?": (r) => {
      const id = Number(r.json("product_id"));
      return id === product_id;
    }
  });
}

export let options = {
  vus: 1000,
  duration: '60s'
};