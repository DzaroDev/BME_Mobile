import axios from 'axios';
import {  APIURL } from '../Constants';
const config = {
  baseUrl: APIURL.BASE,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjU5YTNlMWRjOWI0MzFlNzI1NmJjYWE4IiwiaWF0IjoxNzA0OTg5NDY3fQ.ElOOcvPndd6CA_OKH2-tl52SvZjLE6pYsfXx9zrx1QI'}
};

const base = async param => {
  // const CancelToken = axios.CancelToken;
  // let source = CancelToken.source();
  // setTimeout(() => {
  //   source.cancel();
  // }, 10000);
  return await axios({
    method: param.method,
    baseURL: config.baseUrl,
    url: param.url,
    headers: config.headers,
    // cancelToken: source.token,
    data: param.data,
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err.response);
      // if (err.response) {
      //   return Promise.reject(err.response);
      // } else {
      //   return Promise.reject('TIMEOUT');
      // }
    });
};

const request = async (method, url) => {
  return await base({method, url})
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err));
};

const requestWithData = async (method, url, data) => {
  return await base({method, url, data})
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err));
};

export default {
  request,
  requestWithData,
};