import test from 'ava';
import sinon from 'sinon';
import login from './index';

test('route login', async t => {
  const y = '/login';
  const x = login.path;
  t.is(x, y);
});
