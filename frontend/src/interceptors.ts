import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { StatusCodes } from 'http-status-codes';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === StatusCodes.UNAUTHORIZED) {
      store.dispatch('setError', error.response.data.error.message);
    }

    if (error.response.status === StatusCodes.UNPROCESSABLE_ENTITY) {
      store.dispatch('setValidationErrors', error.response.data.errors);
    }

    if (error.response.status === StatusCodes.FORBIDDEN) {
      router.push({ name: 'home' });
    }

    if (error.response.status === StatusCodes.NOT_FOUND) {
      router.push({ name: 'home' });
    }

    return Promise.reject(error);
  },
);
