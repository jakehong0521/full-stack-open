import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getById = async (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, getById };
