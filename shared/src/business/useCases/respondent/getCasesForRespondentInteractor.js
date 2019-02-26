const Case = require('../../entities/Case');

/**
 * getCasesForRespondent
 * @param userId
 * @param applicationContext
 * @returns {*|Promise<*>}
 */
exports.getCasesForRespondent = async ({
  respondentId,
  applicationContext,
}) => {
  // const user = applicationContext.getCurrentUser();
  // TODO: Authorization

  const cases = await applicationContext
    .getPersistenceGateway()
    .getCasesForRespondent({
      respondentId,
      applicationContext,
    });
  return Case.validateRawCollection(cases);
};