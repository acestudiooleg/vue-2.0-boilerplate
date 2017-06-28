import proxyquire from 'proxyquire';
import sinon from 'sinon';
import test from 'ava';
import { sequence } from '@/../test/helpers';
import authService from '@/services/auth';

const { default: bootstrap } = proxyquire('./bootstrap', {
  './styles': { default: () => 'hello' }
});
const {default: App} = proxyquire('./app', {
  './bootstrap': bootstrap
});

test.before(async () => {
  authService.logout();
});

test('App Sequence', sequence(App, [
  async (t, {holder, state}) => {
    t.false(state.auth.authenticated);
    t.is(holder.find('[data-name="login-page"]').text().trim(), 'Login', 'Login');
    authService.login({email: '123', password: '234'});
  },
  async (t, {holder, state}) => {
    t.true(state.auth.authenticated);
    t.is(holder.find('[data-name="home-page"]').text().trim(), 'Welcome!', 'Login');
  }
]));
