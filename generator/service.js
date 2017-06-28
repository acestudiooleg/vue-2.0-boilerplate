const _ = require('lodash');

module.exports = (name) => {
  const index = `/* ============
 * ${name} Service
 * ============
 *
 */

export const asyncSum = (a, b) => new Promise(resolve => {
  setTimeout(() => resolve(a+b), sec *1000);
});


export default {
  asyncSum
};
`;

  const test = `import test from 'ava';
import sinon from 'sinon';
import { asyncSum } from './index';

test('service ${name}', async t => {
  const a = 1;
  const b = 2;
  const expected = 3;
  const actual = await asyncSum(a, b);
  t.is(actual, expected);
});
`;

  return {test, index};
};
