/* ============
 * Login Index Page
 * ============
 *
 * Page where the user can login.
 */
import { login } from '@/services/auth';
import VLayout from '@/layouts/minimal';
import VPanel from '@/components/panel';

export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    login(user) {
      login(user);
    },
  },

  components: {
    VLayout,
    VPanel
  },
};
