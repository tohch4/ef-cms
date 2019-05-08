const moment = require('moment');
const {
  ExternalDocumentInformationFactory,
} = require('./ExternalDocumentInformationFactory');

describe('ExternalDocumentInformationFactory', () => {
  let baseDoc;

  const errors = () =>
    ExternalDocumentInformationFactory.get(
      baseDoc,
    ).getFormattedValidationErrors();

  describe('Standard Document', () => {
    beforeEach(() => {
      baseDoc = {
        category: 'Application',
        documentTitle: 'Application for Waiver of Filing Fee',
        documentType: 'Application for Waiver of Filing Fee',
        scenario: 'Standard',
      };
    });

    it('should require primary document file', () => {
      expect(errors().primaryDocumentFile).toEqual('A file was not selected.');
      baseDoc.primaryDocumentFile = {};
      expect(errors().primaryDocumentFile).toEqual(undefined);
    });

    it('should require certificate of service radio be selected', () => {
      expect(errors().certificateOfService).toEqual(
        'Enter selection for Certificate of Service.',
      );
      baseDoc.certificateOfService = false;
      expect(errors().certificateOfService).toEqual(undefined);
    });

    describe('Has Certificate of Service', () => {
      beforeEach(() => {
        baseDoc.certificateOfService = true;
      });

      it('should require certificate of service date be entered', () => {
        expect(errors().certificateOfServiceDate).toEqual(
          'Enter a Certificate of Service Date.',
        );
        baseDoc.certificateOfServiceDate = moment().format();
        expect(errors().certificateOfServiceDate).toEqual(undefined);
      });

      it('should not allow certificate of service date to be in the future', () => {
        baseDoc.certificateOfServiceDate = moment()
          .add(1, 'days')
          .format();
        expect(errors().certificateOfServiceDate).toEqual(
          'Certificate of Service date is in the future. Please enter a valid date.',
        );
      });
    });

    it('should require exhibits radio be selected', () => {
      expect(errors().exhibits).toEqual('Enter selection for Exhibits.');
      baseDoc.exhibits = false;
      expect(errors().exhibits).toEqual(undefined);
    });

    it('should require attachments radio be selected', () => {
      expect(errors().attachments).toEqual('Enter selection for Attachments.');
      baseDoc.attachments = false;
      expect(errors().attachments).toEqual(undefined);
    });

    describe('Motion Document', () => {
      beforeEach(() => {
        baseDoc.category = 'Motion';
      });

      it('should require objections radio be selected', () => {
        expect(errors().objections).toEqual('Enter selection for Objections.');
        baseDoc.objections = 'Yes';
        expect(errors().objections).toEqual(undefined);
      });
    });

    it('should require has supporting documents radio be selected', () => {
      expect(errors().hasSupportingDocuments).toEqual(
        'Enter selection for Supporting Documents.',
      );
      baseDoc.hasSupportingDocuments = false;
      expect(errors().hasSupportingDocuments).toEqual(undefined);
    });

    describe('Has Supporting Documents', () => {
      beforeEach(() => {
        baseDoc.hasSupportingDocuments = true;
      });

      it('should require supporting document type be entered', () => {
        expect(errors().supportingDocument).toEqual(
          'Enter selection for Supporting Document.',
        );
        baseDoc.supportingDocument = 'Brief';
        expect(errors().supportingDocument).toEqual(undefined);
      });

      describe('Brief Supporting Document', () => {
        beforeEach(() => {
          baseDoc.supportingDocument = 'Brief in Support';
        });

        it('should require supporting document file to be selected', () => {
          expect(errors().supportingDocumentFile).toEqual(
            'A file was not selected.',
          );
          baseDoc.supportingDocumentFile = {};
          expect(errors().supportingDocumentFile).toEqual(undefined);
        });
      });

      describe('Affidavit Supporting Document', () => {
        beforeEach(() => {
          baseDoc.supportingDocument = 'Affidavit in Support';
        });

        it('should require supporting document file to be selected', () => {
          expect(errors().supportingDocumentFile).toEqual(
            'A file was not selected.',
          );
          baseDoc.supportingDocumentFile = {};
          expect(errors().supportingDocumentFile).toEqual(undefined);
        });
        it('should require supporting document text to be added', () => {
          expect(errors().supportingDocumentFreeText).toEqual(
            'Please provide a value.',
          );
          baseDoc.supportingDocumentFreeText = 'Something';
          expect(errors().supportingDocumentFreeText).toEqual(undefined);
        });
      });
    });

    describe(`Scenario 'Nonstandard H' Secondary Document`, () => {
      beforeEach(() => {
        baseDoc.scenario = 'Nonstandard H';
      });

      describe('Motion for Leave to File', () => {
        beforeEach(() => {
          baseDoc.documentTitle = 'Motion for Leave to File';
          baseDoc.documentType = 'Motion for Leave to File';
        });

        it('should not require secondary document file be added', () => {
          expect(errors().secondaryDocumentFile).toEqual(undefined);
        });

        it(`should not require 'has supporting secondary documents' radio be selected`, () => {
          expect(errors().hasSecondarySupportingDocuments).toEqual(undefined);
        });

        describe('Secondary document file added', () => {
          beforeEach(() => {
            baseDoc.secondaryDocumentFile = {};
          });

          it(`should require 'has supporting secondary documents' radio be selected`, () => {
            expect(errors().hasSecondarySupportingDocuments).toEqual(
              'Enter selection for Secondary Supporting Documents.',
            );
            baseDoc.hasSecondarySupportingDocuments = false;
            expect(errors().hasSecondarySupportingDocuments).toEqual(undefined);
          });
        });
      });

      describe('Motion for Leave to File Out of Time', () => {
        beforeEach(() => {
          baseDoc.documentTitle = 'Motion for Leave to File Out of Time';
          baseDoc.documentType = 'Motion for Leave to File Out of Time';
        });

        it('should require secondary document file be added', () => {
          expect(errors().secondaryDocumentFile).toEqual(
            'A file was not selected.',
          );
          baseDoc.secondaryDocumentFile = {};
          expect(errors().secondaryDocumentFile).toEqual(undefined);
        });

        it(`should not require 'has supporting secondary documents' radio be selected`, () => {
          expect(errors().hasSecondarySupportingDocuments).toEqual(undefined);
        });

        describe('Secondary document file added', () => {
          beforeEach(() => {
            baseDoc.secondaryDocumentFile = {};
          });

          it(`should require 'has supporting secondary documents' radio be selected`, () => {
            expect(errors().hasSecondarySupportingDocuments).toEqual(
              'Enter selection for Secondary Supporting Documents.',
            );
            baseDoc.hasSecondarySupportingDocuments = false;
            expect(errors().hasSecondarySupportingDocuments).toEqual(undefined);
          });
        });

        describe('Has Supporting Secondary Documents', () => {
          beforeEach(() => {
            baseDoc.hasSecondarySupportingDocuments = true;
          });

          it('should require supporting secondary document type be entered', () => {
            expect(errors().secondarySupportingDocument).toEqual(
              'Enter selection for Secondary Supporting Document.',
            );
            baseDoc.secondarySupportingDocument =
              'Unsworn Declaration under Penalty of Perjury in Support';
            expect(errors().secondarySupportingDocument).toEqual(undefined);
          });

          describe('Memorandum Supporting Secondary Document', () => {
            beforeEach(() => {
              baseDoc.secondarySupportingDocument = 'Memorandum in Support';
            });

            it('should require supporting secondary document file to be added', () => {
              expect(errors().secondarySupportingDocumentFile).toEqual(
                'A file was not selected.',
              );
              baseDoc.secondarySupportingDocumentFile = {};
              expect(errors().secondarySupportingDocumentFile).toEqual(
                undefined,
              );
            });
          });

          describe('Declaration Supporting Secondary Document', () => {
            beforeEach(() => {
              baseDoc.secondarySupportingDocument = 'Declaration in Support';
            });

            it('should require supporting secondary document file to be selected', () => {
              expect(errors().secondarySupportingDocumentFile).toEqual(
                'A file was not selected.',
              );
              baseDoc.secondarySupportingDocumentFile = {};
              expect(errors().secondarySupportingDocumentFile).toEqual(
                undefined,
              );
            });
            it('should require supporting secondary document text to be added', () => {
              expect(errors().secondarySupportingDocumentFreeText).toEqual(
                'Please provide a value.',
              );
              baseDoc.secondarySupportingDocumentFreeText = 'Something';
              expect(errors().secondarySupportingDocumentFreeText).toEqual(
                undefined,
              );
            });
          });
        });
      });
    });

    it('should require one of [partyPrimary, partySecondary, partyRespondent] to be selected', () => {
      expect(errors().partyPrimary).toEqual('Select a party.');
      baseDoc.partyRespondent = true;
      expect(errors().partyPrimary).toEqual(undefined);
    });
  });
});
