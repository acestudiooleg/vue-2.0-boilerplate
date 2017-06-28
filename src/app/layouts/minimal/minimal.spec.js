import test from 'ava';
import sinon from 'sinon';
import { mount, tick } from '@/../test/helpers';
import Minimal from './index';

test.skip('layout', async t => {
  const name = 'hello world';

  // holder - jQuery wrapper
  const {vm, holder} = mount(Minimal, {name});


});
