import axios from 'axios';
export const baseUrl = 'https://api.kopachyntsi.if.ua/';
// export const baseUrl = 'http://192.168.88.208:5000/';
const instanse = axios.create({
  baseURL: 'https://api.kopachyntsi.if.ua/api',
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
