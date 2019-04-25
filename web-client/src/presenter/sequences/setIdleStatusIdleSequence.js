import { set } from 'cerebral/factories';
import { state } from 'cerebral';

export const setIdleStatusIdleSequence = [
  set(state.showModal, 'AppTimeoutModal'),
];
