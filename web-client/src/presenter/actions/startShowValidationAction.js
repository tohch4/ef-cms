import { state } from 'cerebral';

/**
 * sets the state.showValidation to true
 *
 * @param {Object} providers the providers object
 * @param {Object} providers.store the cerebral store used for setting state.workItem
 */
export const startShowValidationAction = ({ store }) => {
  store.set(state.showValidation, true);
};
