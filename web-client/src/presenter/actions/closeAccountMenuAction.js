import { state } from 'cerebral';

/**
 * Closes the account menu
 *
 * @param {Object} providers the providers object
 * @param {Object} providers.store the cerebral store object used for setting isAccountMenuOpen
 */
export const closeAccountMenuAction = ({ store }) => {
  store.set(state.isAccountMenuOpen, false);
};
