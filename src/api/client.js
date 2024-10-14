import {create} from 'apisauce';
//const BASE_URL = 'https://dmsapi.expressindia.com'; // prod url
const BASE_URL = 'http://143.244.135.31:8080'; // uat url
//const BASE_URL = 'http://192.168.60.65:8080'; // dev urls
//const BASE_URL = 'http://192.168.80.81:8080'; // dev urls
const POST_ACCEPT = 'application/vnd.tiedn.ie.api.v1+json';
const POST_CONTENT_TYPE = 'application/vnd.tiedn.ie.api.v1+json';
const GET_ACCEPT = 'application/vnd.tiedn.ie.api.v1+json';
const GET_CONTENT_TYPE = 'application/json';

const apiClient = create({
  baseURL: BASE_URL,
  headers: {Accept: POST_ACCEPT, 'Content-Type': POST_CONTENT_TYPE},
});

// const apiClient2 = create({
//   baseURL: LOCAL_URL,
//   headers: {Accept: POST_ACCEPT, 'Content-Type': POST_CONTENT_TYPE},
// });

const getApiRequest = create({
  baseURL: BASE_URL,
  headers: {Accept: GET_ACCEPT, 'Content-Type': GET_CONTENT_TYPE},
});

export default {
  apiClient,
  getApiRequest,
  BASE_URL,
  // apiClient2,
};
