import client from './client';

const endpoint = "/auth/login";

let req = client.add

const getListing = () => client.get(endpoint);

export default {
  getListing,
}