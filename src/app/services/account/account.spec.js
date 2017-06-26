import test from 'ava';
import { roro } from '@/services/account/find';

test('roro is pass or not', t => {
  const actual = roro(2);
  const expected = 3;
  t.is(actual, expected);
});
