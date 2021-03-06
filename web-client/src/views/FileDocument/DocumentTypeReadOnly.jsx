import { Focus } from '../../ustc-ui/Focus/Focus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NonstandardForm } from './NonstandardForm';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const DocumentTypeReadOnly = connect(
  {
    closeDocumentCategoryAccordionSequence:
      sequences.closeDocumentCategoryAccordionSequence,
    editSelectedDocumentSequence: sequences.editSelectedDocumentSequence,
    form: state.form,
    selectDocumentTypeHelper: state.selectDocumentTypeHelper,
  },
  ({
    closeDocumentCategoryAccordionSequence,
    editSelectedDocumentSequence,
    form,
    selectDocumentTypeHelper,
  }) => {
    return (
      <React.Fragment>
        <div role="alert" aria-live="polite">
          <div className="usa-form-group">
            <div>
              <Focus className="header-with-link-button">
                <label htmlFor="category" tabIndex="-1" className="focusable">
                  Selected Document Type
                </label>
              </Focus>
              <button
                className="usa-button usa-button--unstyled"
                id="edit-selected-document-type"
                onClick={() => {
                  closeDocumentCategoryAccordionSequence();
                  editSelectedDocumentSequence();
                }}
              >
                <FontAwesomeIcon icon="edit" size="sm" />
                Edit
              </button>
            </div>
            <div>
              <p className="margin-top-105">{form.documentType}</p>
            </div>
          </div>
          {selectDocumentTypeHelper.primary.showNonstandardForm && (
            <NonstandardForm
              helper="selectDocumentTypeHelper"
              level="primary"
              updateSequence="updateFileDocumentWizardFormValueSequence"
              validateSequence="validateSelectDocumentTypeSequence"
              validationErrors="validationErrors"
            />
          )}
        </div>
      </React.Fragment>
    );
  },
);
