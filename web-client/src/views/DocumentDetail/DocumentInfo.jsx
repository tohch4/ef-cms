import { CaseDetailEdit } from '../CaseDetailEdit/CaseDetailEdit';
import { CaseDetailReadOnly } from '../CaseDetailReadOnly';
import { PDFPreview } from '../DocumentDetail/PDFPreview';
import { connect } from '@cerebral/react';
import { state } from 'cerebral';

import React from 'react';

export const DocumentInfo = connect(
  {
    helper: state.documentDetailHelper,
    showModal: state.showModal,
  },
  ({ helper }) => {
    return (
      <div className="grid-container padding-x-0">
        <div className="grid-row grid-gap">
          <div className="grid-col-5">
            <div
              id="tab-document-info-panel"
              aria-labelledby="tab-document-info"
            >
              {helper.showCaseDetailsEdit && <CaseDetailEdit />}
              {helper.showCaseDetailsView && <CaseDetailReadOnly />}
            </div>
          </div>
          <div className="grid-col-7">
            <PDFPreview />
          </div>
        </div>
      </div>
    );
  },
);
