import { state } from 'cerebral';

/**
 * Starts a delayed auto log-out
 *
 * @param {Object} providers the providers object
 * @param {Object} providers.get the cerebral get function to retrieve state values
 * @param {Object} providers.store the cerebral store object used for clearing alertError, alertSuccess, caseDetailErrors
 */
export const startDelayedLogoutAction = ({
  applicationContext,
  get,
  store,
}) => {
  const oldTimer = get(state.logoutTimer);
  clearTimeout(oldTimer);

  const logoutTimer = setTimeout(() => {
    store.set(state.shouldIdleLogout, true);
  }, applicationContext.getConstants().SESSION_MODAL_TIMEOUT);

  store.set(state.logoutTimer, logoutTimer);
};
