import test from 'ava';
import sinon from 'sinon';
import register from './index';

test('route register', async t => {
  const y = '/register';
  const x = register.path;
  t.is(x, y);
});
