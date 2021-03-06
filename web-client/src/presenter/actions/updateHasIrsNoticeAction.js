import { state } from 'cerebral';

/**
 * clears the case type and IRS notice date because notice
 * date is not required if there is no notice, and the case types
 * are not always the same if there is or is not a notice
 *
 * @param {Object} providers the providers object
 * @param {Object} providers.store the cerebral store
 */
export const updateHasIrsNoticeAction = async ({ store }) => {
  store.set(state.form.caseType, undefined);
  store.set(state.form.month, undefined);
  store.set(state.form.day, undefined);
  store.set(state.form.year, undefined);
};
