import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import FocusLock from 'react-focus-lock';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

const appRoot = document.getElementById('app');
const modalRoot = document.getElementById('modal-root');

class DocketRecordOverlayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.dismissModalSequence = this.props.dismissModalSequence;
  }

  toggleNoScroll(scrollingOn) {
    if (scrollingOn) {
      document.body.classList.add('no-scroll');
      document.addEventListener('touchmove', this.touchmoveTriggered, {
        passive: false,
      });
    } else {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('touchmove', this.touchmoveTriggered, {
        passive: false,
      });
    }
  }

  keydownTriggered(event) {
    if (event.keyCode === 27) {
      return this.blurDialog(event);
    }
  }
  touchmoveTriggered(event) {
    return event.preventDefault();
  }
  blurDialog(event) {
    return this.runCancelSequence(event);
  }
  componentDidMount() {
    modalRoot.appendChild(this.el);
    appRoot.inert = true;
    appRoot.setAttribute('aria-hidden', 'true');
    document.addEventListener('keydown', this.keydownTriggered, false);
    this.toggleNoScroll(true);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    appRoot.inert = false;
    appRoot.setAttribute('aria-hidden', 'false');
    document.removeEventListener('keydown', this.keydownTriggered, false);

    this.toggleNoScroll(false);
  }

  render() {
    return ReactDOM.createPortal(this.renderModalContent(), this.el);
  }

  renderModalContent() {
    const closeFunc = this.props.dismissModalSequence;
    const { record, document } = this.props.caseDetail.docketRecordWithDocument[
      this.props.docketRecordIndex
    ];
    return (
      <FocusLock>
        <dialog open className="modal-screen overlay">
          <div
            className={'modal-overlay'}
            data-aria-live="assertive"
            aria-modal="true"
            role="dialog"
          >
            <button
              className="heading-1 text-style"
              onClick={() => closeFunc()}
            >
              <FontAwesomeIcon icon="caret-left" />
              Document Details
            </button>
            <hr />
            <h2 tabIndex="-1">{record.description}</h2>
            <button>
              <FontAwesomeIcon icon={['fas', 'file-pdf']} />
              View PDF
            </button>
            <p className="semi-bold label">Date</p>
            <p>{document.createdAtFormatted}</p>
            <p className="semi-bold label">Filed By</p>
            <p>{document && document.filedBy}</p>
            <p className="semi-bold label">Action</p>
            <p>{record.action}</p>
            <p className="semi-bold label">Served</p>
            <p>
              {document && document.isStatusServed && (
                <span>
                  {this.props.caseDetail.datePetitionSentToIrsMessage}
                </span>
              )}
              {document && this.props.helper.showDocumentStatus && (
                <span>{document.status}</span>
              )}
            </p>
            <p className="semi-bold label">Parties</p>
            {record.servedParties}
          </div>
        </dialog>
      </FocusLock>
    );
  }
}

DocketRecordOverlayComponent.propTypes = {
  caseDetail: PropTypes.object,
  dismissModalSequence: PropTypes.func,
  docketRecordIndex: PropTypes.number,
  helper: PropTypes.object,
};

export const DocketRecordOverlay = connect(
  {
    caseDetail: state.formattedCaseDetail,
    clearDocumentSequence: sequences.clearDocumentSequence,
    dismissModalSequence: sequences.dismissModalSequence,
    docketRecordIndex: state.docketRecordIndex,
    helper: state.caseDetailHelper,
  },
  DocketRecordOverlayComponent,
);