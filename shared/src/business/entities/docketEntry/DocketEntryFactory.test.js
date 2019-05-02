const moment = require('moment');
const { DocketEntryFactory } = require('./DocketEntryFactory');

describe('DocketEntryFactory', () => {
  let rawEntity;

  const errors = () =>
    DocketEntryFactory(rawEntity).getFormattedValidationErrors();

  describe('Base', () => {
    beforeEach(() => {
      rawEntity = {};
    });

    it('should require a file', () => {
      expect(errors().primaryDocumentFile).toEqual('A file was not selected.');
      rawEntity.primaryDocumentFile = {};
      expect(errors().primaryDocumentFile).toEqual(undefined);
    });

    it('should require a Filing Status selection', () => {
      expect(errors().lodged).toEqual('Enter selection for Filing Status.');
      rawEntity.lodged = false;
      expect(errors().lodged).toEqual(undefined);
    });

    it('should require received date be entered', () => {
      expect(errors().dateReceived).toEqual('Enter date received.');
      rawEntity.dateReceived = moment().format();
      expect(errors().dateReceived).toEqual(undefined);
    });

    it('should not allow received date be in the future', () => {
      rawEntity.dateReceived = moment()
        .add(1, 'days')
        .format();
      expect(errors().dateReceived).toEqual(
        'Received date is in the future. Please enter a valid date.',
      );
    });

    it('should not require event code', () => {
      expect(errors().eventCode).toEqual(undefined);
    });

    describe('Document Type', () => {
      beforeEach(() => {
        rawEntity = {
          ...rawEntity,
          category: 'Answer',
          documentTitle: '[First, Second, etc.] Amendment to Answer',
          documentType: 'Amendment to Answer',
          scenario: 'Nonstandard G',
        };
      });

      it('should require non standard fields', () => {
        expect(errors().ordinalValue).toEqual('You must select an iteration.');
        rawEntity.ordinalValue = 'First';
        expect(errors().ordinalValue).toEqual(undefined);
      });
    });

    it('should require one of [partyPrimary, partySecondary, partyRespondent] to be selected', () => {
      expect(errors().partyPrimary).toEqual('Select a filing party.');
      rawEntity.partySecondary = true;
      expect(errors().partyPrimary).toEqual(undefined);
    });

    it('should not require Additional Info 1', () => {
      expect(errors().additionalInfo).toEqual(undefined);
    });

    it('should not require Additional Info 2', () => {
      expect(errors().additionalInfo2).toEqual(undefined);
    });

    it('should not require add to cover sheet', () => {
      expect(errors().addToCoversheet).toEqual(undefined);
    });

    describe('Inclusions', () => {
      it('should not require Certificate of Service', () => {
        expect(errors().certificateOfService).toEqual(undefined);
      });

      describe('Has Certificate of Service', () => {
        beforeEach(() => {
          rawEntity.certificateOfService = true;
        });

        it('should require certificate of service date be entered', () => {
          expect(errors().certificateOfServiceDate).toEqual(
            'Enter a Certificate of Service Date.',
          );
          rawEntity.certificateOfServiceDate = moment().format();
          expect(errors().certificateOfServiceDate).toEqual(undefined);
        });

        it('should not allow certificate of service date be in the future', () => {
          rawEntity.certificateOfServiceDate = moment()
            .add(1, 'days')
            .format();
          expect(errors().certificateOfServiceDate).toEqual(
            'Certificate of Service date is in the future. Please enter a valid date.',
          );
        });
      });

      it('should not require Exhibits', () => {
        expect(errors().exhibits).toEqual(undefined);
      });

      it('should not require Attachments', () => {
        expect(errors().attachments).toEqual(undefined);
      });

      describe('Motion Document', () => {
        beforeEach(() => {
          rawEntity.category = 'Motion';
        });

        it('should not require Objections', () => {
          expect(errors().objections).toEqual(undefined);
        });
      });
    });
  });
});