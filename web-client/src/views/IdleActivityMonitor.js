import { AppTimeoutModal } from './AppTimeoutModal';
import { connect } from '@cerebral/react';
import { sequences, state, sequence } from 'cerebral';
import IdleTimer from 'react-idle-timer';
import React from 'react';

export const IdleActivityMonitor = connect(
  {
    logoutModal: sequences.setIdleStatusIdleSequence,
    showModal: state.showModal,
  },
  ({ logoutModal, showModal }) => {
    return (
      <div>
        <IdleTimer debounce={250} timeout={5000} onIdle={logoutModal} />
        {showModal == 'AppTimeoutModal' && <AppTimeoutModal />}
      </div>
    );
  },
);
