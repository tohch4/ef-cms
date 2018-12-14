const { fileRespondentDocument } = require('./fileRespondentDocument');
const Case = require('../../entities/Case');

exports.fileAnswer = async ({
  userId,
  caseToUpdate,
  document,
  applicationContext,
}) => {
  return await applicationContext.getPersistenceGateway().uploadDocument({
    applicationContext,
    document,
  });
};
