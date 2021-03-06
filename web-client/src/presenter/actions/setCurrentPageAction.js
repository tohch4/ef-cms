import { state } from 'cerebral';

/**
 * sets the state.caseTypes based on the props.caseTypes passed in
 *
 * @param {string} page the name of the page to set
 * @param {string} options an object which contains optional 'force' flag
 */
export const setCurrentPageAction = (page, options = {}) =>
  /**
   * sets the state.currentPage based on the scoped page
   *
   * @param {Object} providers the providers object
   * @param {Object} providers.store the cerebral store used for setting the state.currentPage
   */
  ({ store }) => {
    store.set(state.currentPage, page);
    if (options.force) {
      return new Promise(resolve => {
        setTimeout(resolve, 1);
      });
    }
  };
