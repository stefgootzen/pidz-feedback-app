import axios from 'axios';
import { setError } from '../actions/errorActions';
import { store } from '../store';

const config = {
  baseURL: 'http://10.10.2.101:8080',
  timeout: 5000,
};

const axiosInstance = axios.create(config);

const setAuthorizationHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = token;
};

const removeAuthorizationHeader = () => {
  axiosInstance.defaults.headers.common.Authorization = null;
};

const globalErrorHandler = (error) => {
  if (!error.status) {
    store.dispatch(setError('Oeps. We kunnen de server niet bereiken! Controleer je internet verbinding.'));
  } else {
    store.dispatch(setError(error.response.data.message));
  }
};

export { globalErrorHandler, setAuthorizationHeader, removeAuthorizationHeader };
export default axiosInstance;
