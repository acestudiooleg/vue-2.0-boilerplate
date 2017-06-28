import Vue from 'vue';
import { find } from './../account';
import store from './../../store';

// When the request succeeds
const success = (token) => {
  store.dispatch('auth/login', token);
  find();
  Vue.router.push({
    name: 'home.index',
  });
};

// When the request fails
const failed = () => {
};

export const login = (user) => {
  /*
   * Normally you would perform an AJAX-request.
   * But to get the example working, the data is hardcoded.
   *
   * With the include REST-client Axios, you can do something like this:
   * Vue.$http.post('/auth/login', user)
   *   .then((response) => {
   *     success(response);
   *   })
   *   .catch((error) => {
   *     failed(error);
   *   });
   */
  if (!user.email || !user.password) {
    failed();
  } else {
    success('RandomGeneratedToken');
  }
};


export const logout = () => {
  store.dispatch('auth/logout');
  Vue.router.push({
    name: 'login.index',
  });
};


export const register = (user) => {
  if (!user.email || !user.password || !user.passwordConfirm || !user.firstName || !user.lastName) {
    failed();
  } else if (user.password !== user.passwordConfirm) {
    failed();
  } else {
    success('RandomGeneratedToken');
  }
};

export default {
  login,
  logout,
  register,
};
