import { state } from 'cerebral';

/**
 * computes the date from a month, day and year value
 *
 * @param {Object} providers the providers object
 * @param {Object} providers.store the cerebral store object
 * @param {Object} providers.get the cerebral get function
 */
export const computeFormDateAction = ({ store, get }) => {
  let formDate = `${get(state.form.year)}-${get(state.form.month)}-${get(
    state.form.day,
  )}`;

  formDate = formDate
    .split('-')
    .map(segment => (segment = segment.padStart(2, '0')))
    .join('-');

  store.set(state.form.serviceDate, formDate);
};
