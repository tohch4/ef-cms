import { state } from 'cerebral';

/**
 * stash wizard data in props
 *
 * @param {Object} providers the providers object
 * @param {Object} providers.get the cerebral get function
 * @param {Object} providers.props the cerebral props object
 */
export const stashWizardDataAction = async ({ get, props, store }) => {
  const supporting = get(state.screenMetadata.supporting);
  if (!supporting) {
    const { primaryDocumentFileId, secondaryDocumentFileId } = props;

    const {
      dateReceived,
      dateReceivedMonth,
      dateReceivedDay,
      dateReceivedYear,
      lodged,
      partyPrimary,
      partySecondary,
      partyRespondent,
      practitioner,
    } = get(state.form);

    const documentMetadata = {
      dateReceived,
      dateReceivedDay,
      dateReceivedMonth,
      dateReceivedYear,
      partyPrimary,
      partyRespondent,
      partySecondary,
      practitioner,
    };

    store.set(state.screenMetadata.primary, { ...documentMetadata, lodged });

    const secondaryDocument = get(state.form.secondaryDocument);
    if (secondaryDocument) {
      store.set(state.screenMetadata.secondary, {
        ...documentMetadata,
        lodged: true,
      });
    }

    const filedDocumentIds = [];
    filedDocumentIds.push(primaryDocumentFileId);
    if (secondaryDocumentFileId) {
      filedDocumentIds.push(secondaryDocumentFileId);
    }
    store.set(state.screenMetadata.filedDocumentIds, filedDocumentIds);
  }
};
