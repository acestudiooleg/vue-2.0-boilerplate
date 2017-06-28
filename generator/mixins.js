const _ = require('lodash');



module.exports = (name) => {
  const script = `/* ============
 * ${name} Mixin
 * ============
 * https://vuejs.org/v2/guide/mixins.html
 */


export default {
  computed: {

  },
  methods: {
    test: (a) => a
  }
};`;

  const test = `import test from 'ava';
import sinon from 'sinon';
import ${name} from './index';

test('mixin', async t => {
  const y = 'hello';
  const x = ${name}.methods.test(y);
  t.is(x, y);
});`;

  return {test, script};

};
