const createApplicationContext = require('../applicationContext');
const {
  handle,
  getUserFromAuthHeader,
} = require('../middleware/apiGatewayHelper');

/**
 * used for recalling the case from the irs holding queue
 *
 * @param {Object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.handler = event =>
  handle(event, async () => {
    const user = getUserFromAuthHeader(event);
    const applicationContext = createApplicationContext(user);
    try {
      const results = await applicationContext
        .getUseCases()
        .recallPetitionFromIRSHoldingQueue({
          applicationContext,
          caseId: event.pathParameters.caseId,
        });
      applicationContext.logger.info('User', user);
      applicationContext.logger.info('Results', results);
      return results;
    } catch (e) {
      applicationContext.logger.error(e);
      throw e;
    }
  });
