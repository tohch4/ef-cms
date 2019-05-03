import { cancelUploadsAction } from '../actions/cancelUploadsAction';
import { clearModalAction } from '../actions/clearModalAction';

export const cancelFileUploadSequence = [cancelUploadsAction, clearModalAction];
