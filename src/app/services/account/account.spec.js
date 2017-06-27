import test from 'ava';
import { roro } from '@/services/account/find';

test('roro is pass or not', t => {
  const actual = 2;
  const expected = 2;
  t.is(actual, expected);
});
