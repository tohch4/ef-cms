exports.runCreateCoverSheet = ({ applicationContext, caseId, documentId }) => {
  applicationContext.getExecutorClient().invokeAsync({
    FunctionName: 'createCoverSheet',
    InvokeArgs: JSON.stringify({
      caseId,
      documentId,
    }),
  });
};
