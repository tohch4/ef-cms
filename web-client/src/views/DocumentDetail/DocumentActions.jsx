import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const DocumentActions = connect(
  {
    caseHelper: state.caseDetailHelper,
    clickServeToIrsSequence: sequences.clickServeToIrsSequence,
    helper: state.documentDetailHelper,
    setModalDialogNameSequence: sequences.setModalDialogNameSequence,
  },
  ({
    caseHelper,
    clickServeToIrsSequence,
    helper,
    setModalDialogNameSequence,
  }) => {
    return (
      <div className="document-detail__actions">
        {caseHelper.showServeToIrsButton &&
          helper.formattedDocument.isPetition && (
            <button
              className="usa-button serve-to-irs"
              onClick={() => clickServeToIrsSequence()}
            >
              <FontAwesomeIcon icon={['fas', 'clock']} />
              Serve to IRS
            </button>
          )}
        {caseHelper.showRecallButton && helper.formattedDocument.isPetition && (
          <span className="recall-button-box">
            <FontAwesomeIcon icon={['far', 'clock']} />
            Batched for IRS
            <button
              className="recall-petition"
              onClick={() =>
                setModalDialogNameSequence({
                  showModal: 'RecallPetitionModalDialog',
                })
              }
            >
              Recall
            </button>
          </span>
        )}
      </div>
    );
  },
);
