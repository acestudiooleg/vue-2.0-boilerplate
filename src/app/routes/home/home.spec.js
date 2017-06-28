import test from 'ava';
import sinon from 'sinon';
import home from './index';

test('route home', async t => {
  const y = '/home';
  const x = home.path;
  t.is(x, y);
});
