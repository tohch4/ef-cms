import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';

export const PDFPreview = connect(
  {
    baseUrl: state.baseUrl,
    helper: state.documentDetailHelper,
    token: state.token,
  },
  ({ baseUrl, helper, token }) => {
    return (
      <>
        {/* we can't show the iframe in cypress or else cypress will pause and ask for a save location for the file */}
        {!process.env.CYPRESS && (
          <iframe
            title={`Document type: ${helper.formattedDocument.documentType}`}
            src={`${baseUrl}/documents/${
              helper.formattedDocument.documentId
            }/documentDownloadUrl?token=${token}`}
          />
        )}
      </>
    );
  },
);
