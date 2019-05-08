import { state } from 'cerebral';

/**
 * toggles mobile docket sort to other option (byDate/byDateDesc)
 *
 * @param {Object} providers the providers object
 * @param {Object} providers.store the cerebral store used for setting state.sessionMetadata.docketRecordSort
 * @param {Object} providers.get the cerebral store used for getting state.sessionMetadata.docketRecordSort
 */
export const toggleMobileDocketSortAction = ({ store, get }) => {
  const caseId = get(state.caseDetail.caseId);
  const currentSort = get(state.sessionMetadata.docketRecordSort[caseId]);
  let newSort;
  switch (currentSort) {
    case 'byDate':
      newSort = 'byDateDesc';
      break;
    case 'byDateDesc':
    default:
      newSort = 'byDate';
      break;
  }
  store.set(state.sessionMetadata.docketRecordSort[caseId], newSort);
};
