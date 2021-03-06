import { state } from 'cerebral';

/**
 * Takes the selected work items in the store and invoke the assignWorkItems so that the assignee is attached to each
 * of the work items.
 *
 * @param {Object} providers the providers object
 * @param {Object} providers.applicationContext contains the assignWorkItems method we will need from the getUseCases method
 * @param {Object} providers.store the cerebral store containing the selectedWorkItems, workQueue, assigneeId, assigneeName this method uses
 * @param {Function} providers.get the cerebral get helper function
 * @returns {undefined} currently doesn't return anything
 */
export const assignSelectedWorkItemsAction = async ({
  applicationContext,
  get,
  store,
}) => {
  const selectedWorkItems = get(state.selectedWorkItems);
  const sectionWorkQueue = get(state.workQueue);
  const assigneeId = get(state.assigneeId);
  const assigneeName = get(state.assigneeName);

  await Promise.all(
    selectedWorkItems.map(workItem =>
      applicationContext.getUseCases().assignWorkItems({
        applicationContext,
        assigneeId,
        assigneeName,
        workItemId: workItem.workItemId,
      }),
    ),
  );

  store.set(
    state.workQueue,
    sectionWorkQueue.map(workItem => {
      if (
        selectedWorkItems.find(item => item.workItemId === workItem.workItemId)
      ) {
        return {
          ...workItem,
          assigneeId,
          assigneeName,
        };
      } else {
        return workItem;
      }
    }),
  );

  store.set(state.selectedWorkItems, []);
  store.set(state.assigneeId, null);
  store.set(state.assigneeName, null);
};
