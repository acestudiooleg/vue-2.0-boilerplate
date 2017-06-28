import test from 'ava';
import sinon from 'sinon';
import account from './index';

test('route account', async t => {
  const y = '/account';
  const x = account.path;
  t.is(x, y);
});
