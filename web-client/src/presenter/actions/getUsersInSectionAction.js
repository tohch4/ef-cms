import { sortBy } from 'lodash';

/**
 * returns a callback function scoped to a section the users in a section
 *
 * @param {string} section the section to fetch users from
 * @returns {Function} a function which should fetch the users in that section
 */
export const getUsersInSectionAction = ({ section }) =>
  /**
   * get the users in a section
   *
   * @param {Object} providers the providers object
   * @param {Object} providers.applicationContext the cerebral get function used for getting the state.user
   * @returns {Object} the list of users in a section
   */
  async ({ applicationContext }) => {
    const users = await applicationContext
      .getUseCases()
      .getUsersInSection({ applicationContext, section });

    return {
      users: sortBy(users, 'name'),
    };
  };
