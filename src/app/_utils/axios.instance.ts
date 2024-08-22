import axios from 'axios';

export const URL = "https://restriction-tour-fake-tolerance.trycloudflare.com";

export const BASE_IMAGE_URL = 'https://restriction-tour-fake-tolerance.trycloudflare.com/';


const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;