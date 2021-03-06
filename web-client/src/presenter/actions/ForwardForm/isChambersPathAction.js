import { state } from 'cerebral';

/**
 * get the role associated with the user
 *
 * @param {Object} providers the providers object
 * @param {Function} providers.get the cerebral get function
 * @param {Object} providers.path the cerebral path object used for invoking the next path in the sequence based on the section value
 * @param {Object} providers.props the cerebral store used for getting the props.value
 * @returns {Object} the path to call based on the section value
 */
export const isChambersPathAction = ({ get, path, props }) => {
  const { CHAMBERS_SECTION } = get(state.constants);

  if (props.value === CHAMBERS_SECTION) {
    return path.yes();
  }

  return path.no();
};
