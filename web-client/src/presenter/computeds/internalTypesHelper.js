import { flatten, orderBy, values } from 'lodash';
import { state } from 'cerebral';

const getInternalDocumentTypesForSelect = typeMap => {
  let filteredTypeList = flatten(values(typeMap)).map(t => {
    return { label: t.documentType, value: t.eventCode };
  });
  return orderBy(filteredTypeList, ['label'], ['asc']);
};

export const getSortFunction = searchText => {
  if (searchText.length === 0) {
    return (a, b) => a.label.localeCompare(b.label, { sensitivity: 'base' });
  }
  const str = searchText.toUpperCase();
  return (first, second) => {
    let [a, b] = [first.value.toUpperCase(), second.value.toUpperCase()];
    if (a == str) return -1; // exact match for a
    if (b == str) return 1; // exact match for b

    // first value begins with search string but second does not
    if (a.indexOf(str) == 0 && b.indexOf(str) != 0) {
      return -1;
    }

    // second value begins with search string but first does not
    if (b.indexOf(str) == 0 && a.indexOf(str) != 0) {
      return 1;
    }

    // neither has a "good match" for the value.
    // continue comparing labels without regard to search string
    let [x, y] = [first.label, second.label];
    return x.localeCompare(y, { sensitivity: 'base' }); // a == A
  };
};

export const internalTypesHelper = get => {
  const { INTERNAL_CATEGORY_MAP } = get(state.constants);
  const searchText = get(state.screenMetadata.searchText) || '';

  const internalDocumentTypesForSelect = getInternalDocumentTypesForSelect(
    INTERNAL_CATEGORY_MAP,
  );

  const internalDocumentTypesForSelectSorted = internalDocumentTypesForSelect.sort(
    getSortFunction(searchText),
  );

  return {
    internalDocumentTypesForSelect,
    internalDocumentTypesForSelectSorted,
  };
};
