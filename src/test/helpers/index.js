/* eslint no-console: 0, no-await-in-loop: 0 */
import Vue from 'vue';
import $ from 'jquery';
import _ from 'lodash';
import pretty from 'pretty';
import store from '@/store';

export const mount = (component, propsData = {}, other = {}) => {
  const Com = Vue.extend(component);
  const props = {
    propsData,
    ...other
  };
  const vm = new Com(props).$mount();
  const holder = $(vm.$el);
  holder.debug = (msg) => {
    if (msg) {
      console.log(msg);
    }
    console.log(pretty(vm.$el.outerHTML, {ocd: true}));
  };
  return { vm, holder };
};


export const makeMockComponents = (componentNames = []) => {
  const components = {};
  componentNames.forEach(name => {
    components[name] = Vue.component({});
  });

  return components;
};

export const tick = () => new Promise(s => Vue.nextTick(s));

export const sequence = (Component, seq = []) => async t => {
  const {holder, vm} = mount(Component);

  const COM = {
    holder,
    vm,
    store,
    state: store.state,
    tick,
    router: Vue.router,
    dispatch: store.dispatch
  };

  const slen = seq.length;

  for (let i = 0; i < slen; i++) {
    const s = seq[i];
    if (_.isString(s)) {
      Vue.router.push({
        name: s
      });
    }
    if (_.isFunction(s)) {
      await s(t, COM);
    }
    if (_.isObject(s) && !_.isFunction(s)) {
      store.dispatch(s.type, s.payload);
    }
  }
};

export default {
  mount,
  tick,
  makeMockComponents,
  sequence
};
