/* ============
 * Register Index Page
 * ============
 *
 * Page where the user can register.
 */

import { register } from '@/services/auth';
import VLayout from '@/layouts/minimal';
import VPanel from '@/components/panel';

export default {

  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        email: null,
        passwordConfirm: null,
        password: null,
      },
    };
  },

  methods: {
    register(user) {
      register(user);
    },
  },

  components: {
    VLayout,
    VPanel
  },
};
