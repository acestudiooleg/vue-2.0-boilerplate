/* eslint no-console: 0 */
import Vue from 'vue';
import $ from 'jquery';

export const mount = (component, propsData = {}) => {
  const Com = Vue.extend(component);
  const vm = new Com({propsData}).$mount();
  const holder = $(vm.$el);
  holder.debug = (msg) => console.log(msg, '\n', vm.$el.outerHTML);
  return { vm, holder };
};


export const tick = () => new Promise(s => Vue.nextTick(s));

export default {
  mount,
  tick
};
