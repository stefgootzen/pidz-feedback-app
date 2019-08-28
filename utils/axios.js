import axios from 'axios';
import { setError } from '../actions/errorActions';
import { store } from '../store';

const config = {
  baseURL: 'http://10.10.2.209:8080',
};

const axiosInstance = axios.create(config);

const setAuthorizationHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = token;
};

const removeAuthorizationHeader = () => {
  axiosInstance.defaults.headers.common.Authorization = null;
};

const globalErrorHandler = error => store.dispatch(setError(error.response.data.message));

export { globalErrorHandler, setAuthorizationHeader, removeAuthorizationHeader };
export default axiosInstance;
