import test from 'ava';
import { mount, tick } from '@/../test/helpers';
import tt from './tt';

test('renders', async t => {
  const {holder} = mount(tt, {msg: 'hello worldшл'});
  holder.click();
  await tick();
  holder.debug('its a dom');

  t.pass();
});
