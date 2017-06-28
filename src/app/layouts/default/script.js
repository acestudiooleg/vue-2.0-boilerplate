/* ============
 * default Layout
 * ============
 * https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots
 */


import authService from '@/services/auth';

export default {
  methods: {
    logout() {
      authService.logout();
    },
  },
};
