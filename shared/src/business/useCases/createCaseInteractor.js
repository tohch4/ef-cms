const {
  isAuthorized,
  PETITION,
} = require('../../authorization/authorizationClientService');
const { capitalize } = require('lodash');
const { Case } = require('../entities/Case');
const { Document } = require('../entities/Document');
const { Message } = require('../entities/Message');
const { PETITIONS_SECTION } = require('../entities/WorkQueue');
const { UnauthorizedError } = require('../../errors/errors');
const { WorkItem } = require('../entities/WorkItem');

const addDocumentToCase = (user, caseToAdd, documentEntity) => {
  const workItemEntity = new WorkItem({
    assigneeId: null,
    assigneeName: null,
    caseId: caseToAdd.caseId,
    caseStatus: caseToAdd.status,
    docketNumber: caseToAdd.docketNumber,
    docketNumberSuffix: caseToAdd.docketNumberSuffix,
    document: {
      ...documentEntity.toRawObject(),
      createdAt: documentEntity.createdAt,
    },
    isInitializeCase: documentEntity.isPetitionDocument() ? true : false,
    section: PETITIONS_SECTION,
    sentBy: user.userId,
  });

  let message;

  if (documentEntity.documentType === 'Petition') {
    const caseCaptionNames = Case.getCaseCaptionNames(caseToAdd.caseCaption);
    message = `${
      documentEntity.documentType
    } filed by ${caseCaptionNames} is ready for review.`;
  } else {
    message = `${documentEntity.documentType} filed by ${capitalize(
      user.role,
    )} is ready for review.`;
  }

  workItemEntity.addMessage(
    new Message({
      from: user.name,
      fromUserId: user.userId,
      message,
    }),
  );

  documentEntity.addWorkItem(workItemEntity);
  caseToAdd.addDocument(documentEntity);

  return workItemEntity;
};

/**
 *
 * @param petitionMetadata
 * @param petitionFileId
 * @param ownershipDisclosureFileId
 * @param applicationContext
 * @returns {Promise<*>}
 */
exports.createCase = async ({
  applicationContext,
  ownershipDisclosureFileId,
  petitionFileId,
  petitionMetadata,
  stinFileId,
}) => {
  const user = applicationContext.getCurrentUser();
  if (!isAuthorized(user, PETITION)) {
    throw new UnauthorizedError('Unauthorized');
  }

  const Petition = applicationContext.getEntityConstructors().Petition;
  const petitionEntity = new Petition(petitionMetadata).validate();

  // invoke the createCase interactor
  const docketNumber = await applicationContext.docketNumberGenerator.createDocketNumber(
    {
      applicationContext,
    },
  );

  let practitioner = null;
  if (user.role === 'practitioner') {
    const practitionerUser = await applicationContext
      .getPersistenceGateway()
      .getUserById({
        applicationContext,
        userId: user.userId,
      });
    practitioner = practitionerUser;
  }

  const caseToAdd = new Case({
    userId: user.userId,
    practitioner,
    ...petitionEntity.toRawObject(),
    docketNumber,
    isPaper: false,
  });

  caseToAdd.caseCaption = Case.getCaseCaption(caseToAdd);

  const petitionDocumentEntity = new Document({
    documentId: petitionFileId,
    documentType: Case.documentTypes.petitionFile,
    filedBy: user.name,
    userId: user.userId,
  });
  const newWorkItem = addDocumentToCase(
    user,
    caseToAdd,
    petitionDocumentEntity,
  );

  const stinDocumentEntity = new Document({
    documentId: stinFileId,
    documentType: Case.documentTypes.stin,
    filedBy: user.name,
    userId: user.userId,
  });
  caseToAdd.addDocumentWithoutDocketRecord(stinDocumentEntity);

  let odsDocumentEntity;

  if (ownershipDisclosureFileId) {
    odsDocumentEntity = new Document({
      documentId: ownershipDisclosureFileId,
      documentType: Case.documentTypes.ownershipDisclosure,
      filedBy: user.name,
      userId: user.userId,
    });
    caseToAdd.addDocument(odsDocumentEntity);
  }

  await applicationContext.getPersistenceGateway().createCase({
    applicationContext,
    caseToCreate: caseToAdd.validate().toRawObject(),
  });

  await applicationContext.getPersistenceGateway().saveWorkItemForNonPaper({
    applicationContext,
    workItem: newWorkItem.validate().toRawObject(),
  });

  await applicationContext.getExecutor().runCreateCoverSheet({
    applicationContext,
    caseId: caseToAdd.caseId,
    documentId: petitionDocumentEntity.documentId,
  });

  await applicationContext.getExecutor().runCreateCoverSheet({
    applicationContext,
    caseId: caseToAdd.caseId,
    documentId: stinDocumentEntity.documentId,
  });

  if (odsDocumentEntity) {
    await applicationContext.getExecutor().runCreateCoverSheet({
      applicationContext,
      caseId: caseToAdd.caseId,
      documentId: petitionDocumentEntity.documentId,
    });
  }

  return new Case(caseToAdd).toRawObject();
};
