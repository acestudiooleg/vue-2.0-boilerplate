const _ = require('lodash');

const vue = `<template src="./template.html"></template>
<script >
  import script from './script';

  export default {
    ...script
  };
</script>`;

module.exports = (name) => {
  const Name = _.startCase(name);
  const tmpl = `<div class="container">
  <div class="row">
    <div class="col-md-6 col-md-offset-3">
      <!-- Content will be placed here -->
      <slot></slot>
    </div>
  </div>
</div>`;

  const newName = `Hello World ${Name}`;

  const script = `/* ============
 * ${name} Layout
 * ============
 * https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots
 */


export default {
  data() {
    return {name: '${name}'};
  },
  props: {

  },
  computed: {

  },
  methods: {
  }
};`;

  const test = `import test from 'ava';
import sinon from 'sinon';
import { mount, tick } from '@/../test/helpers';
import ${Name} from './index';

test.skip('layout', async t => {
  const name = 'hello world';

  // holder - jQuery wrapper
  const {vm, holder} = mount(${Name}, {name});

   t.pass();

});`;

  return {test, tmpl, script, vue};

};
