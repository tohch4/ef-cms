import { state } from 'cerebral';

export default async ({ applicationContext, get }) => {
  const caseToUpdate = get(state.caseDetail);

  const documentType = get(state.document.documentType);

  const user = get(state.user);

  await applicationContext.getUseCases().fileRespondentDocument({
    applicationContext,
    document: get(state.document.file),
    caseToUpdate,
    documentType,
    userId: user.token,
  });

  return {
    docketNumber: caseToUpdate.docketNumber,
    alertSuccess: {
      title: `Your ${documentType} was uploaded successfully.`,
      message: `Your document has been filed.`,
    },
  };
};