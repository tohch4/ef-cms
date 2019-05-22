import { Select } from '../../ustc-ui/Select/Select';
import { connect } from '@cerebral/react';
import { get } from 'lodash';
import { sequences, state } from 'cerebral';
import React from 'react';

export const SupportingDocumentSelect = connect(
  {
    addDocketEntryHelper: state.addDocketEntryHelper,
    form: state.form,
    updateDocketEntryFormValueSequence:
      sequences.updateDocketEntryFormValueSequence,
    validateDocketEntrySequence: sequences.validateDocketEntrySequence,
    validationErrors: state.validationErrors,
  },
  ({
    addDocketEntryHelper,
    form,
    updateDocketEntryFormValueSequence,
    validateDocketEntrySequence,
    validationErrors,
  }) => {
    return (
      <React.Fragment>
        <Select
          error={validationErrors && validationErrors.previousDocument}
          label="Which Document is This Supporting?"
          name="previousDocument"
          id="previous-document"
          value={get(form, 'previousDocument', '')}
          values={addDocketEntryHelper.previouslyFiledWizardDocuments}
          onChange={e => {
            updateDocketEntryFormValueSequence({
              key: e.target.name,
              value: e.target.value,
            });
            validateDocketEntrySequence();
          }}
        />
      </React.Fragment>
    );
  },
);
