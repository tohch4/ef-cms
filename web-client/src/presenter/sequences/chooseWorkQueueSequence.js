import { chooseWorkQueueAction } from '../actions/chooseWorkQueueAction';
import { clearWorkQueueAction } from '../actions/clearWorkQueueAction';
import { getNotificationsAction } from '../actions/getNotificationsAction';
import { getSentWorkItemsForSectionAction } from '../actions/getSentWorkItemsForSectionAction';
import { getSentWorkItemsForUserAction } from '../actions/getSentWorkItemsForUserAction';
import { getWorkItemsByUserAction } from '../actions/getWorkItemsByUserAction';
import { getWorkItemsForSectionAction } from '../actions/getWorkItemsForSectionAction';
import { parallel } from 'cerebral/factories';
import { setFormSubmittingAction } from '../actions/setFormSubmittingAction';
import { setNotificationsAction } from '../actions/setNotificationsAction';
import { setWorkItemsAction } from '../actions/setWorkItemsAction';
import { unsetFormSubmittingAction } from '../actions/unsetFormSubmittingAction';

export const chooseWorkQueueSequence = [
  setFormSubmittingAction,
  clearWorkQueueAction,
  chooseWorkQueueAction,
  {
    myinbox: [
      parallel([
        [getNotificationsAction, setNotificationsAction],
        [getWorkItemsByUserAction, setWorkItemsAction],
      ]),
    ],
    myoutbox: [
      parallel([
        [getNotificationsAction, setNotificationsAction],
        [getSentWorkItemsForUserAction, setWorkItemsAction],
      ]),
    ],
    sectioninbox: [
      parallel([
        [getNotificationsAction, setNotificationsAction],
        [getWorkItemsForSectionAction, setWorkItemsAction],
      ]),
    ],
    sectionoutbox: [
      parallel([
        [getNotificationsAction, setNotificationsAction],
        [getSentWorkItemsForSectionAction, setWorkItemsAction],
      ]),
    ],
  },
  unsetFormSubmittingAction,
];
