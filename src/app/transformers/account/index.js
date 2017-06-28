/* ============
 * Account Transformer
 * ============
 *
 * The transformer for the account.
 */

/**
 * Method used to transform a fetched account
 *
 * @param account The fetched account
 *
 * @returns {Object} The transformed account
 */
export const fetch = ({email, first_name, last_name}) => ({
  email,
  firstName: first_name,
  lastName: last_name
});

/**
 * Method used to transform a send account
 *
 * @param account The account to be send
 *
 * @returns {Object} The transformed account
 */
export const send = ({email, firstName, lastName}) => ({
  email,
  first_name: firstName,
  last_name: lastName
});


export default {
  fetch,
  send
};

