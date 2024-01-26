import axios from 'axios';
export const baseUrl = 'https://api.kopachyntsi.if.ua/';
const instanse = axios.create({
  baseURL: 'https://api.kopachyntsi.if.ua/api',
});

instanse.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default instanse;
