const {
  CaseAssociationRequestFactory,
} = require('../../entities/CaseAssociationRequestFactory');
const {
  generateCaseAssociationDocumentTitle,
} = require('./generateCaseAssociationDocumentTitleInteractor');

describe('generateCaseAssociationDocumentTitle', () => {
  let applicationContext;

  it('generates a document title', async () => {
    applicationContext = {
      environment: { stage: 'local' },
      getEntityConstructors: () => ({
        CaseAssociationRequestFactory,
      }),
    };
    const title = await generateCaseAssociationDocumentTitle({
      applicationContext,
      caseAssociationRequest: {
        documentTitleTemplate: 'Substitution of Counsel for [Petitioner Names]',
        representingPrimary: true,
      },
      contactPrimaryName: 'Test Petitioner',
      contactSecondaryName: 'Another Petitioner',
    });
    expect(title).toEqual('Substitution of Counsel for Petr. Test Petitioner');
  });
});
