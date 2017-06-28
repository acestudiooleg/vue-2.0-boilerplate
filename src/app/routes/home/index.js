/* ============
 * home Route
 * ============
 */

import home from '@/pages/home';

export default {
  path: '/home',
  name: 'home.index',
  component: home,

  // If the user needs to be authenticated to view this page
  meta: {
    auth: true,
  },
};
