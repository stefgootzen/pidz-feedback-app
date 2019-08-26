const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://10.10.2.209:8080',
});

export const setAuthorizationHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = token;
};

export default axiosInstance;
