/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

// Routes
import home from './home';
import account from './account';
import login from './login';
import register from './register';

const index = {
  path: '/',
  redirect: '/home',
};

const other = {
  path: '/*',
  redirect: '/home',
};

/**
 * The routes
 *
 * @type {object} The routes
 */
export default [
  index,
  home,
  account,
  login,
  register,
  other
];
