const _ = require('lodash');



module.exports = (name) => {
  const script = `/* ============
 * ${name} Route
 * ============
 * https://router.vuejs.org/en/essentials/getting-started.html
 */


export default {
  path: '/${name}',
  name: '${name}.index',
  component: require('@/pages/${name}/index.vue'),

  meta: {
    hello: 'meta world',
  },
};`;

  const test = `import test from 'ava';
import sinon from 'sinon';
import ${name} from './index';

test('route', async t => {
  const y = '/${name}';
  const x = ${name}.path;
  t.is(x, y);
});`;

  return {test, script};

};
