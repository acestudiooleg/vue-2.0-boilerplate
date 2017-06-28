import test from 'ava';
import sinon from 'sinon';
import _ from 'lodash';
import slot from './index';

test('mixin slot', async t => {
  const y = 'hello';
  _.set(slot, 'methods.$slots.hello', true);
  const x = slot.methods.hasSlot(y);
  t.true(x);
});
