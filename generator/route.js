const _ = require('lodash');

module.exports = (name) => {
  const index = `/* ============
 * ${name} Route
 * ============
 * https://router.vuejs.org/en/essentials/getting-started.html
 *
 */

import ${name} from '@/pages/${name}/index.vue';

export default {
  path: '/${name}',
  name: '${name}.index',
  component: ${name},

  meta: {
    hello: 'meta world',
  }
};
`;

  const test = `import test from 'ava';
import sinon from 'sinon';
import ${name} from './index';

test('route ${name}', async t => {
  const y = '/${name}';
  const x = ${name}.path;
  t.is(x, y);
});
`;

  return {test, index};
};

