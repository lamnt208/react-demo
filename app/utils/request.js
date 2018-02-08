import 'whatwg-fetch';
import axios from 'axios';

function getData(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url) {
  return axios.get(url)
    .then(getData);
}
