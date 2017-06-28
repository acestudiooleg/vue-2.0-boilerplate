const _ = require('lodash');



module.exports = (name) => {
  const index = `/* ============
 * ${name} Module
 * ============
 *
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};
`;

  const actions = `/* ============
 * Actions for the ${name} module
 * ============
 */

import * as types from './mutation-types';

export const store = ({ commit }, payload) => {
  commit(types.STORE, payload);
};

export default {
  store,
};
`;

  const getters = `/* ============
 * Getters for the ${name} module
 * ============
 */

export default {};
`;

  const mutationsTypes = `/* ============
 * Mutation types for the ${name} module
 * ============
 */

export const STORE = 'STORE';

export default {
  STORE,
};
`;

  const mutations = `/* ============
 * Mutations for the ${name} module
 * ============
 */

import { STORE } from './mutation-types';

export default {
  [STORE](state, account) {
    state.email = account.email;
    state.firstName = account.firstName;
    state.lastName = account.lastName;
  },
};
`;

  const state = `/* ============
 * State of the ${name} module
 * ============
 */

export default {
  email: null,
  firstName: null,
  lastName: null,
};
`;

  const actionsTest = `import test from 'ava';
import sinon from 'sinon';
import actions from './actions';

test('actions', async t => {
  const y = '/${name}';
  const x = '/${name}';
  t.is(x, y);
});
`;

  const mutationsTest = `import test from 'ava';
import sinon from 'sinon';
import mutations from './mutations';

test('mutations', async t => {
  const y = '/${name}';
  const x = '/${name}';
  t.is(x, y);
});
`;

  return {actionsTest, mutationsTest, index, actions, mutationsTypes, mutations, state, getters};
};
