export default async ({ applicationContext, props }) => {
  const documentBlob = await applicationContext
    .getUseCases()
    .downloadDocumentFile({
      documentId: props.documentId,
      applicationContext,
    });
  props.callback(documentBlob);
};