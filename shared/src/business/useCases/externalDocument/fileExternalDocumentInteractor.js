const { Case } = require('../../entities/Case');
const { DOCKET_SECTION } = require('../../entities/WorkQueue');
const { DocketRecord } = require('../../entities/DocketRecord');
const { Document } = require('../../entities/Document');
const { Message } = require('../../entities/Message');
const { WorkItem } = require('../../entities/WorkItem');

const {
  isAuthorized,
  FILE_EXTERNAL_DOCUMENT,
} = require('../../../authorization/authorizationClientService');
const { capitalize, pick } = require('lodash');
const { UnauthorizedError } = require('../../../errors/errors');

/**
 *
 * @param documentMetadata
 * @param primaryDocumentFileId
 * @param secondaryDocumentFileId
 * @param supportingDocumentFileId
 * @param secondarySupportingDocumentFileId
 * @param applicationContext
 * @returns {Promise<*>}
 */
exports.fileExternalDocument = async ({
  applicationContext,
  documentMetadata,
  primaryDocumentFileId,
  secondaryDocumentFileId,
  secondarySupportingDocumentFileId,
  supportingDocumentFileId,
}) => {
  const user = applicationContext.getCurrentUser();
  const { caseId } = documentMetadata;

  if (!isAuthorized(user, FILE_EXTERNAL_DOCUMENT)) {
    throw new UnauthorizedError('Unauthorized');
  }

  const caseToUpdate = await applicationContext
    .getPersistenceGateway()
    .getCaseByCaseId({
      applicationContext,
      caseId,
    });

  const caseEntity = new Case(caseToUpdate);
  const workItems = [];

  const {
    supportingDocumentMetadata,
    secondaryDocument,
    secondarySupportingDocumentMetadata,
    ...primaryDocumentMetadata
  } = documentMetadata;

  const baseMetadata = pick(primaryDocumentMetadata, [
    'partyPrimary',
    'partySecondary',
    'partyRespondent',
    'practitioner',
  ]);

  if (secondaryDocument) {
    secondaryDocument.lodged = true;
  }
  if (secondarySupportingDocumentMetadata) {
    secondarySupportingDocumentMetadata.lodged = true;
  }

  [
    [primaryDocumentFileId, primaryDocumentMetadata, 'primaryDocument'],
    [
      supportingDocumentFileId,
      supportingDocumentMetadata,
      'primarySupportingDocument',
    ],
    [secondaryDocumentFileId, secondaryDocument, 'secondaryDocument'],
    [
      secondarySupportingDocumentFileId,
      secondarySupportingDocumentMetadata,
      'secondarySupportingDocument',
    ],
  ].forEach(([documentId, metadata, relationship]) => {
    if (documentId && metadata) {
      const documentEntity = new Document({
        ...baseMetadata,
        ...metadata,
        relationship,
        documentId,
        documentType: metadata.documentType,
        userId: user.userId,
      });
      documentEntity.generateFiledBy(caseToUpdate);

      if (!metadata.isPaper) {
        const workItem = new WorkItem({
          assigneeId: null,
          assigneeName: null,
          caseId: caseId,
          caseStatus: caseToUpdate.status,
          docketNumber: caseToUpdate.docketNumber,
          docketNumberSuffix: caseToUpdate.docketNumberSuffix,
          document: {
            ...documentEntity.toRawObject(),
            createdAt: documentEntity.createdAt,
          },
          section: DOCKET_SECTION,
          sentBy: user.userId,
        });

        const message = new Message({
          from: user.name,
          fromUserId: user.userId,
          message: `${documentEntity.documentType} filed by ${capitalize(
            user.role,
          )} is ready for review.`,
        });

        workItem.addMessage(message);
        documentEntity.addWorkItem(workItem);

        workItems.push(workItem);
      }
      caseEntity.addDocumentWithoutDocketRecord(documentEntity);

      caseEntity.addDocketRecord(
        new DocketRecord({
          description: metadata.documentTitle,
          documentId: documentEntity.documentId,
          filingDate: documentEntity.createdAt,
        }),
      );
    }
  });

  await applicationContext.getPersistenceGateway().updateCase({
    applicationContext,
    caseToUpdate: caseEntity.validate().toRawObject(),
  });

  for (let i = 0; i < workItems.length; i++) {
    await applicationContext.getPersistenceGateway().saveWorkItemForNonPaper({
      applicationContext,
      workItem: workItems[i].validate().toRawObject(),
    });
  }

  return caseEntity.toRawObject();
};
