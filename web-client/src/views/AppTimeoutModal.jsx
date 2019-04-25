import { sequences } from 'cerebral';

import { ModalDialog } from './ModalDialog';
import { connect } from '@cerebral/react';
import React from 'react';

class AppTimeoutModalComponent extends ModalDialog {
  constructor(props) {
    super(props);
    this.modal = {
      classNames: 'app-timeout-modal',
      confirmLabel: 'Yes!',
    };
    this.logoutTimer = setTimeout(() => {
      this.props.logoutSequence();
    }, 5000);
  }

  runConfirmSequence() {
    clearTimeout(this.logoutTimer);
    this.props.stayLoggedInSequence();
  }

  renderBody() {
    return <div>Are you still there?</div>;
  }
}

export const AppTimeoutModal = connect(
  {
    logoutSequence: sequences.signOutSequence,
    stayLoggedInSequence: sequences.confirmStayLoggedInSequence,
  },
  AppTimeoutModalComponent,
);
