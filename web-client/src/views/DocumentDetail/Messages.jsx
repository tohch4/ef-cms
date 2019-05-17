import { CompletedMessages } from './CompletedMessages';
import { PDFPreview } from './PDFPreview';
import { PendingMessages } from './PendingMessages';
import { Tab, Tabs } from '../../ustc-ui/Tabs/Tabs';
import { connect } from '@cerebral/react';

import React from 'react';

export const Messages = connect(
  {},
  () => {
    return (
      <div className="grid-container padding-x-0">
        <div className="grid-row grid-gap">
          <div className="grid-col-5">
            <div
              id="tab-pending-messages-panel"
              aria-labelledby="tab-pending-messages"
            >
              <Tabs
                className="container-tabs no-full-border-bottom"
                id="case-detail-messages-tabs"
                bind="documentDetail.messagesTab"
                boxed
              >
                <Tab
                  tabName="inProgress"
                  title="In Progress"
                  id="tab-messages-in-progress"
                >
                  <PendingMessages />
                </Tab>
                <Tab
                  tabName="completed"
                  title="Complete"
                  id="tab-messages-completed"
                >
                  <CompletedMessages />
                </Tab>
              </Tabs>
            </div>
          </div>
          <div className="grid-col-7">
            <PDFPreview />
          </div>
        </div>
      </div>
    );
  },
);
