const _ = require('lodash');

module.exports = (name) => {
  const index = `/* ============
 * ${name} Transformer
 * ============
 *
 */

export const fetch = ({email, first_name, last_name}) => ({
  email,
  firstName: first_name,
  lastName: last_name
});

export const send = ({email, firstName, lastName}) => ({
  email,
  first_name: firstName,
  last_name: lastName
});

export default {
  fetch,
  send
};
`;

  const test = `import test from 'ava';
import sinon from 'sinon';
import { fetch, send } from './index';

test('transformer ${name} - fetch', t => {
  const user = {
    email: 'email',
    first_name: 'firstName',
    last_name: 'lastName'
  };
  const actual = fetch(user);
  const expected = {
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name
  };
  t.deepEqual(expected, actual);
});

test('transformer ${name} - send', t => {
  const user = {
    email: 'email',
    firstName: 'first_name',
    lastName: 'last_name'
  };
  const actual = send(user);
  const expected = {
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName
  };
  t.deepEqual(expected, actual);
});
`;

  return {test, index};
};

