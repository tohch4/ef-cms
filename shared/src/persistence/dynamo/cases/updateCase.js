const client = require('../../dynamodbClientService');
const {
  updateWorkItemCaseStatus,
} = require('../workitems/updateWorkItemCaseStatus');
const {
  updateWorkItemDocketNumberSuffix,
} = require('../workitems/updateWorkItemDocketNumberSuffix');
const { saveVersionedCase } = require('./saveCase');
/**
 * createWorkItem
 *
 * @param workItemId
 * @param message
 * @param userId
 * @param applicationContext
 * @returns {*}
 */
exports.updateCase = async ({ caseToUpdate, applicationContext }) => {
  const oldCase = await client.get({
    Key: {
      pk: caseToUpdate.caseId,
      sk: '0',
    },
    applicationContext,
  });

  const requests = [];
  if (
    oldCase.status !== caseToUpdate.status ||
    oldCase.docketNumberSuffix !== caseToUpdate.docketNumberSuffix
  ) {
    const workItemMappings = await client.query({
      ExpressionAttributeNames: {
        '#pk': 'pk',
      },
      ExpressionAttributeValues: {
        ':pk': `${caseToUpdate.caseId}|workItem`,
      },
      KeyConditionExpression: '#pk = :pk',
      applicationContext,
    });
    for (let mapping of workItemMappings) {
      requests.push(
        updateWorkItemCaseStatus({
          applicationContext,
          caseStatus: caseToUpdate.status,
          workItemId: mapping.sk,
        }),
      );
      requests.push(
        updateWorkItemDocketNumberSuffix({
          applicationContext,
          docketNumberSuffix: caseToUpdate.docketNumberSuffix,
          workItemId: mapping.sk,
        }),
      );
    }
  }

  const [results] = await Promise.all([
    saveVersionedCase({
      applicationContext,
      caseToSave: caseToUpdate,
      existingVersion: (caseToUpdate || {}).currentVersion,
    }),
    ...requests,
  ]);

  return results;
};
