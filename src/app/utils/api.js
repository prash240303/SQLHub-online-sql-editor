import axios from 'axios';

const API_URL = 'http://localhost:1337'; // Replace with your Strapi backend URL

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;
