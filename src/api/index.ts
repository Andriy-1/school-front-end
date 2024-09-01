import axios from 'axios';
// export const baseUrl = 'https://api.kopachyntsi.if.ua/';
export const baseUrl = 'http://localhost:5000/';
const instanse = axios.create({
  baseURL: 'http://localhost:5000/api',
//  baseURL: 'https://api.kopachyntsi.if.ua/api',
});

instanse.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default instanse;
