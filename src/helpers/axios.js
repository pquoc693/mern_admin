import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';
import { authConstants } from '../actions/constants';

const token = localStorage.getItem('token');
console.log('token', token)

const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    'authorization': token ? `${token}` : ''
  }
});

axiosIntance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.authorization = `${auth.token}`;
  }
  return req;
})

axiosIntance.interceptors.response.use((res) => {
  return res;
}, (error) => {
  console.log(error.response);
  const { status } = error.response;
  if (status === 500) {
    localStorage.clear();
    store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
  }
  return Promise.reject(error);
})


export default axiosIntance; 