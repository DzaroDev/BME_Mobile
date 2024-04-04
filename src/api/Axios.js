import axios from "axios";
import { APIURL, LocalStorage, ContentType } from "../Constants";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
const { getItem } = useAsyncStorage(LocalStorage.AccessToken);

const headersConfig = async (contentType) => {
  const token = await getItem();
  const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  };
   if (token) {
    headers['Authorization'] = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjVhOWIxODkzNDYxZTg5OGZhN2M2YmNlIiwiaWF0IjoxNzA3ODc3MzU3fQ.5mxpzYwOqaPH7LDKJuxMjYtQ0T8May3iNEGKuE6oWGA'}`;
   }
  return headers
};

const base = async (param) => {
  // const CancelToken = axios.CancelToken;
  // let source = CancelToken.source();
  // setTimeout(() => {
  //   source.cancel();
  // }, 10000);
  return await axios({
    method: param.method,
    baseURL: APIURL.BASE,
    // withCredentials: false,
    url: param.url,
    headers: await headersConfig(param.contentType),
    // cancelToken: source.token,
    data: param.data,
  })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err.response);
      // if (err.response) {
      //   return Promise.reject(err.response);
      // } else {
      //   return Promise.reject('TIMEOUT');
      // }
    });
};

// const base = async param => {

//   return await fetch(`${config.baseUrl}${param.url}`, {
//     method: param.method,
//     headers: config.headers,
//     body: JSON.stringify(param.data)
//   }).then((res) => {
//     return res.json();
//   })
//     .then(res => {
//       return Promise.resolve(res);
//     })
//     .catch(err => {
//       console.log(err);
//       return Promise.reject(err.response);
//     });
// };

const request = async (method, url) => {
  return await base({ method, url, contentType: ContentType.JSON })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
};

const requestWithData = async (method, url, data) => {
  return await base({ method, url, data, contentType: ContentType.JSON })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
};
const requestWithFormData = async (method, url, imgData) => {
  const data = new FormData();
  data.append("image", {
    name: imgData.fileName,
    type: imgData.type,
    uri: imgData.uri,
  });

  return await base({ method, url, data, contentType: ContentType.FORM_DATA })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
};

export default {
  request,
  requestWithData,
  requestWithFormData,
};
