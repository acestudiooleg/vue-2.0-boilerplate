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
  const tmpl = `<div @click="hello" class="${Name}-class">
    ${name} - {{name}}
  </div>`;

  const newName = `Hello World ${Name}`;

  const script = `/* ============
 * ${name} Component
 * ============
 * https://vuejs.org/v2/guide/components.html
 */

import SlotMixin from '@/mixins/slot';

export default {
  mixins: [
    SlotMixin,
  ],
  data() {
    return {name: '${name}'};
  },
  props: {

  },
  computed: {

  },
  methods: {
    hello() {
      this.name = '${newName}';
    }
  }
};`;

  const test = `import test from 'ava';
import sinon from 'sinon';
import { mount, tick } from '@/../test/helpers';
import ${Name} from './index';

test('renders', async t => {
  const name = 'hello world';

  // holder - jQuery wrapper
  const {vm, holder} = mount(${Name}, {name});

  t.is(vm.name, name);
  t.is(vm.$el.textContent, \`${Name} - \${name}\`);
  t.is(holder.html(), \`${Name} - \${name}\`);
  t.is(holder.attr('class'), '${Name}-class');

  holder.click();
  await tick(); // rerender

  holder.debug('its a dom');

  t.is(vm.name, newName);
  t.is(vm.$el.textContent, \`${Name} - \${newName}\`);
  t.is(holder.html(), \`${Name} - \${newName}\`);

});`;

  return {test, tmpl, script, vue};

};
