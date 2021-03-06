import { getSortFunction, internalTypesHelper } from './internalTypesHelper';
import { runCompute } from 'cerebral/test';

const INTERNAL_CATEGORY_MAP = {
  Answer: [
    {
      category: 'Answer (filed by respondent only)',
      documentTitle: 'Amended Answer',
      documentType: 'Amended Answer',
      eventCode: 'AA',
      labelFreeText: '',
      labelPreviousDocument: '',
      ordinalField: '',
      scenario: 'Standard',
    },
    {
      category: 'Answer (filed by respondent only)',
      documentTitle: 'Answer',
      documentType: 'Answer',
      eventCode: 'A',
      labelFreeText: '',
      labelPreviousDocument: '',
      ordinalField: '',
      scenario: 'Standard',
    },
    {
      category: 'Answer (filed by respondent only)',
      documentTitle: '[First, Second, etc.] Amendment to Answer',
      documentType: 'Amendment to Answer',
      eventCode: 'ATAN',
      labelFreeText: '',
      labelPreviousDocument: '',
      ordinalField: 'What Iteration Is This Filing?',
      scenario: 'Nonstandard G',
    },
  ],
  'Seriatum Brief': [
    {
      category: 'Seriatum Brief',
      documentTitle: 'Seriatim Answering Memorandum Brief',
      documentType: 'Seriatim Answering Memorandum Brief',
      eventCode: 'SAMB',
      labelFreeText: '',
      labelPreviousDocument: '',
      ordinalField: '',
      scenario: 'Standard',
    },
  ],
};

describe('internalTypesHelper', () => {
  describe('custom search function', () => {
    it('correctly sorts a list with two items (coverage)', () => {
      const searchString = 'a';
      const sortFunc = getSortFunction(searchString);
      const objectList = [
        { label: 'Answer', value: 'A' },
        { label: 'Seriatim Answering Memorandum Brief', value: 'SAMB' },
      ];
      const sortedList = [
        { label: 'Answer', value: 'A' },
        { label: 'Seriatim Answering Memorandum Brief', value: 'SAMB' },
      ];
      const result = objectList.sort(sortFunc);
      expect(result).toEqual(sortedList);
    });
    it('correctly sorts when an item matches the value exactly (A)', () => {
      const searchString = 'a';
      const sortFunc = getSortFunction(searchString);
      const objectList = [
        { label: 'Amended Answer', value: 'AA' },
        { label: 'Amendment to Answer', value: 'ATAN' },
        { label: 'Answer', value: 'A' },
        { label: 'Seriatim Answering Memorandum Brief', value: 'SAMB' },
      ];
      const sortedList = [
        { label: 'Answer', value: 'A' },
        { label: 'Amended Answer', value: 'AA' },
        { label: 'Amendment to Answer', value: 'ATAN' },
        { label: 'Seriatim Answering Memorandum Brief', value: 'SAMB' },
      ];
      const result = objectList.sort(sortFunc);
      expect(result).toEqual(sortedList);
    });
    it('correctly sorts when value starts with search string (AT)', () => {
      const searchString = 'at';
      const sortFunc = getSortFunction(searchString);
      const objectList = [
        { label: 'Amended Answer', value: 'AA' },
        { label: 'Amendment to Answer', value: 'ATAN' },
        { label: 'Answer', value: 'A' },
        { label: 'Seriatim Answering Memorandum Brief', value: 'SAMB' },
      ];
      const sortedList = [
        { label: 'Amendment to Answer', value: 'ATAN' },
        { label: 'Amended Answer', value: 'AA' },
        { label: 'Answer', value: 'A' },
        { label: 'Seriatim Answering Memorandum Brief', value: 'SAMB' },
      ];
      const result = objectList.sort(sortFunc);
      expect(result).toEqual(sortedList);
    });
    it('correctly sorts according to label when no values start with search string (X)', () => {
      const searchString = 'X';
      const sortFunc = getSortFunction(searchString);
      const objectList = [
        { label: 'Amended Answer', value: 'AA' },
        { label: 'Amendment to Answer', value: 'ATAN' },
        { label: 'Answer', value: 'A' },
        { label: 'Seriatim Answering Memorandum Brief', value: 'SAMB' },
      ];
      const sortedList = [
        { label: 'Amended Answer', value: 'AA' },
        { label: 'Amendment to Answer', value: 'ATAN' },
        { label: 'Answer', value: 'A' },
        { label: 'Seriatim Answering Memorandum Brief', value: 'SAMB' },
      ];
      const result = objectList.sort(sortFunc);
      expect(result).toEqual(sortedList);
    });
  });

  describe('produces a list', () => {
    it('of value/label objects sorted by their label (default) when no search text is provided', () => {
      const result = runCompute(internalTypesHelper, {
        state: {
          constants: {
            INTERNAL_CATEGORY_MAP,
          },
        },
      });
      const expected = [
        { label: 'Amended Answer', value: 'AA' },
        { label: 'Amendment to Answer', value: 'ATAN' },
        { label: 'Answer', value: 'A' },
        { label: 'Seriatim Answering Memorandum Brief', value: 'SAMB' },
      ];
      expect(result.internalDocumentTypesForSelect).toEqual(expected);
      expect(result.internalDocumentTypesForSelectSorted).toEqual(expected);
    });
    describe('when searchText is defined', () => {
      it('and is an empty string', () => {
        const result = runCompute(internalTypesHelper, {
          state: {
            constants: {
              INTERNAL_CATEGORY_MAP,
            },
            screenMetadata: { searchText: '' },
          },
        });
        const expected = [
          { label: 'Amended Answer', value: 'AA' },
          { label: 'Amendment to Answer', value: 'ATAN' },
          { label: 'Answer', value: 'A' },
          { label: 'Seriatim Answering Memorandum Brief', value: 'SAMB' },
        ];
        expect(result.internalDocumentTypesForSelectSorted).toEqual(expected);
      });
      it('and is not matching an event code', () => {
        const result = runCompute(internalTypesHelper, {
          state: {
            constants: {
              INTERNAL_CATEGORY_MAP,
            },
            screenMetadata: { searchText: 'Seriatim' },
          },
        });
        const expected = [
          { label: 'Amended Answer', value: 'AA' },
          { label: 'Amendment to Answer', value: 'ATAN' },
          { label: 'Answer', value: 'A' },
          { label: 'Seriatim Answering Memorandum Brief', value: 'SAMB' },
        ];
        expect(result.internalDocumentTypesForSelectSorted).toEqual(expected);
      });
      it('and matches the beginning of an eventCode', () => {
        const result = runCompute(internalTypesHelper, {
          state: {
            constants: {
              INTERNAL_CATEGORY_MAP,
            },
            screenMetadata: { searchText: 'SA' },
          },
        });
        const expected = [
          { label: 'Seriatim Answering Memorandum Brief', value: 'SAMB' },
          { label: 'Amended Answer', value: 'AA' },
          { label: 'Amendment to Answer', value: 'ATAN' },
          { label: 'Answer', value: 'A' },
        ];
        expect(result.internalDocumentTypesForSelectSorted).toEqual(expected);
      });

      it('and matches an event code exactly', () => {
        const result = runCompute(internalTypesHelper, {
          state: {
            constants: {
              INTERNAL_CATEGORY_MAP,
            },
            screenMetadata: { searchText: 'ATAN' },
          },
        });
        const expected = [
          { label: 'Amendment to Answer', value: 'ATAN' },
          { label: 'Amended Answer', value: 'AA' },
          { label: 'Answer', value: 'A' },
          { label: 'Seriatim Answering Memorandum Brief', value: 'SAMB' },
        ];
        expect(result.internalDocumentTypesForSelectSorted).toEqual(expected);
      });
    });
  });
});
