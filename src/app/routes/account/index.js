/* ============
 * account Route
 * ============
 */

import account from '@/pages/account';

export default {
  path: '/account',
  name: 'account.index',
  component: account,

  // If the user needs to be authenticated to view this page
  meta: {
    auth: true,
  },
};
