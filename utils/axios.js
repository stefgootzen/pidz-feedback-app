const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://192.168.2.30:8080',
});

export const setAuthorizationHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = token;
};

export default axiosInstance;
