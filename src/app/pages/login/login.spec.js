import proxyquire from 'proxyquire';
import sinon from 'sinon';
import test from 'ava';
import { mount, tick, makeMockComponents } from '@/../test/helpers';

test('Login form', async t => {
  const login = sinon.spy();
  const {default: Login} = proxyquire('./index', {
    '../../services/auth': { default: { login } }
  });

  const user = {
    email: 'user@gmail.com',
    password: 'pass'
  };
  const {vm, holder} = mount(Login, {});
  vm.user = user;
  const loginButton = holder.find('[data-name="login"]');
  await tick();
  loginButton.click();
  t.deepEqual(login.args[0][0], user);
});
