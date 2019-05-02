import { chooseNextStepAction } from '../actions/DocketEntry/chooseNextStepAction';
import { clearAlertsAction } from '../actions/clearAlertsAction';
import { clearFormAction } from '../actions/clearFormAction';
import { computeCertificateOfServiceFormDateAction } from '../actions/FileDocument/computeCertificateOfServiceFormDateAction';
import { computeDateReceivedAction } from '../actions/DocketEntry/computeDateReceivedAction';
import { getDocketEntryAlertSuccessAction } from '../actions/DocketEntry/getDocketEntryAlertSuccessAction';
import { navigateToCaseDetailAction } from '../actions/navigateToCaseDetailAction';
import { restoreFiledWizardDocumentIdsAction } from '../actions/DocketEntry/restoreFiledWizardDocumentIdsAction';
import { set } from 'cerebral/factories';
import { setAlertErrorAction } from '../actions/setAlertErrorAction';
import { setAlertSuccessAction } from '../actions/setAlertSuccessAction';
import { setCaseAction } from '../actions/setCaseAction';
import { setCurrentPageAction } from '../actions/setCurrentPageAction';
import { setValidationAlertErrorsAction } from '../actions/setValidationAlertErrorsAction';
import { setValidationErrorsAction } from '../actions/setValidationErrorsAction';
import { stashFiledWizardDocumentIdsAction } from '../actions/DocketEntry/stashFiledWizardDocumentIdsAction';
import { state } from 'cerebral';
import { submitDocketEntryAction } from '../actions/DocketEntry/submitDocketEntryAction';
import { uploadExternalDocumentsAction } from '../actions/FileDocument/uploadExternalDocumentsAction';
import { validateDocketEntryAction } from '../actions/DocketEntry/validateDocketEntryAction';

export const submitDocketEntrySequence = [
  clearAlertsAction,
  set(state.showValidation, true),
  computeCertificateOfServiceFormDateAction,
  computeDateReceivedAction,
  validateDocketEntryAction,
  {
    error: [
      setAlertErrorAction,
      setValidationErrorsAction,
      setValidationAlertErrorsAction,
    ],
    success: [
      set(state.showValidation, false),
      clearAlertsAction,
      uploadExternalDocumentsAction,
      submitDocketEntryAction,
      stashFiledWizardDocumentIdsAction,
      setCaseAction,
      chooseNextStepAction,
      {
        caseDetail: [
          setCurrentPageAction('Interstitial'),
          getDocketEntryAlertSuccessAction,
          setAlertSuccessAction,
          set(state.saveAlertsForNavigation, true),
          navigateToCaseDetailAction,
        ],
        supportingDocument: [
          getDocketEntryAlertSuccessAction,
          setAlertSuccessAction,
          clearFormAction,
          restoreFiledWizardDocumentIdsAction,
          set(state.wizardStep, 'SupportingDocumentForm'),
        ],
      },
    ],
  },
];