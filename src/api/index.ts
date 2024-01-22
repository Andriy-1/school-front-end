import axios from 'axios';
export const baseUrl = 'http://localhost:5000/';
// export const baseUrl = 'https://api.kopachyntsi.if.ua/'; server
// export const baseUrl = 'http://192.168.88.208:5000/';
const instanse = axios.create({
  baseURL: 'http://localhost:5000/api',
//   baseURL: 'https://api.kopachyntsi.if.ua/api', server
//   baseURL: 'http://192.168.88.208:5000/api', 
});

instanse.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default instanse;
