import proxyquire from 'proxyquire';
import sinon from 'sinon';
import test from 'ava';
import { mount, tick } from '@/../test/helpers';
import Login from './index.vue';

test('Login form', async t => {
  const login = sinon.spy();
  // const Login = proxyquire('./index.vue', {
  //   '../../services/auth': { login }
  // });

  const user = {
    email: 'user@gmail.com',
    password: 'pass'
  };
  const {vm, holder} = mount(Login, {});

  console.log(vm.user);

  // //vm.user = user;
  // const loginButton = holder.find('[data-name="login"]');
  // await tick();
  // loginButton.click();
  // t.deepEqual(login.args[0][0], user);
});
