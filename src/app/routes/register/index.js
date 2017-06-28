/* ============
 * register Route
 * ============
 */

import register from '@/pages/register';

export default {
  path: '/register',
  name: 'register.index',
  component: register,

  // If the user needs to be a guest to view this page
  meta: {
    guest: true,
  },
};
