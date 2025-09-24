import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50, // number of virtual users
  duration: '30s', // test duration
};

export default function () {
  const res = http.get('http://localhost:3000/api/products');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'body is not empty': (r) => r.body && r.body.length > 0,
  });
  sleep(1);
}
