/* ============
 * login Route
 * ============
 */

import login from '@/pages/login';

export default {
  path: '/login',
  name: 'login.index',
  component: login,

  // If the user needs to be a guest to view this page
  meta: {
    guest: true,
  },
};
