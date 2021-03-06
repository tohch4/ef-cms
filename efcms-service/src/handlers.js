module.exports = {
  addCoversheetLambda: require('./documents/addCoversheetLambda').handler,
  assignWorkItemsLambda: require('./workitems/assignWorkItemsLambda').handler,
  checkForReadyForTrialCases: require('./cases/checkForReadyForTrialCasesLambda')
    .handler,
  completeWorkItemLambda: require('./workitems/completeWorkItemLambda').handler,
  createCaseFromPaperLambda: require('./cases/createCaseFromPaperLambda')
    .handler,
  createCaseLambda: require('./cases/createCaseLambda').handler,
  createDocumentLambda: require('./users/createDocumentLambda').handler,
  createUserLambda: require('./users/createUserLambda').handler,
  createWorkItemLambda: require('./workitems/createWorkItemLambda').handler,
  downloadPolicyUrlLambda: require('./documents/downloadPolicyUrlLambda')
    .handler,
  fileExternalDocumentToCaseLambda: require('./cases/fileExternalDocumentToCaseLambda')
    .handler,
  forwardWorkItemLambda: require('./workitems/forwardWorkItemLambda').handler,
  getCaseLambda: require('./cases/getCaseLambda').handler,
  getCasesByUserLambda: require('./cases/getCasesByUserLambda').handler,
  getCasesForRespondentLambda: require('./cases/getCasesForRespondentLambda')
    .handler,
  getDocumentDownloadUrlLambda: require('./documents/getDocumentDownloadUrl')
    .handler,
  getInternalUsersLambda: require('./users/getInternalUsersLambda').handler,
  getNotificationsLambda: require('./users/getNotificationsLambda').handler,
  getSentWorkItemsForSectionLambda: require('./workitems/getSentWorkItemsForSectionLambda')
    .handler,
  getSentWorkItemsForUserLambda: require('./workitems/getSentWorkItemsForUserLambda')
    .handler,
  getUploadPolicyLambda: require('./documents/getUploadPolicyLambda').handler,
  getUsersInSectionLambda: require('./users/getUsersInSectionLambda').handler,
  getWorkItemLambda: require('./workitems/getWorkItemLambda').handler,
  getWorkItemsBySectionLambda: require('./workitems/getWorkItemsBySectionLambda')
    .handler,
  getWorkItemsForUserLambda: require('./workitems/getWorkItemsForUserLambda')
    .handler,
  practitionerCaseAssociationLambda: require('./cases/practitionerCaseAssociationLambda')
    .handler,
  recallPetitionFromIRSHoldingQueueLambda: require('./cases/recallPetitionFromIRSHoldingQueueLambda')
    .handler,
  runBatchProcessLambda: require('./cases/runBatchProcessLambda').handler,
  sendPetitionToIRSHoldingQueueLambda: require('./cases/sendPetitionToIRSHoldingQueueLambda')
    .handler,
  setWorkItemAsReadLambda: require('./workitems/setWorkItemAsReadLambda')
    .handler,
  swaggerJsonLambda: require('./swagger/swaggerJsonLambda').handler,
  swaggerLambda: require('./swagger/swaggerLambda').handler,
  updateCaseLambda: require('./cases/updateCaseLambda').handler,
  verifyCaseForUserLambda: require('./cases/verifyCaseForUserLambda').handler,
};
