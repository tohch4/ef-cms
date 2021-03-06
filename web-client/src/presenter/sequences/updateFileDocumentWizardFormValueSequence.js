import { clearWizardDataAction } from '../actions/FileDocument/clearWizardDataAction';
import { props, state } from 'cerebral';
import { set } from 'cerebral/factories';

export const updateFileDocumentWizardFormValueSequence = [
  set(state.form[props.key], props.value),
  clearWizardDataAction,
];
