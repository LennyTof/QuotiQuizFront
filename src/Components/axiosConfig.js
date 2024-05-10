import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = apiURL;

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

axios.interceptors.response.use(response => response, error => {
  console.error('An API error occurred', error);
  return Promise.reject(error);
});

export default axios;
