import { CaseDetailHeader } from './CaseDetailHeader';
import { CompletedMessages } from './DocumentDetail/CompletedMessages';
import { CreateMessageModalDialog } from './DocumentDetail/CreateMessageModalDialog';
import { DocumentActions } from './DocumentDetail/DocumentActions';
import { DocumentInfo } from './DocumentDetail/DocumentInfo';
import { ErrorNotification } from './ErrorNotification';
import { Messages } from './DocumentDetail/Messages';
import { PDFPreview } from './DocumentDetail/PDFPreview';
import { PendingMessages } from './DocumentDetail/PendingMessages';
import { RecallPetitionModalDialog } from './RecallPetitionModalDialog';
import { ServeToIrsModalDialog } from './ServeToIrsModalDialog';
import { SuccessNotification } from './SuccessNotification';
import { Tab, Tabs } from '../ustc-ui/Tabs/Tabs';
import { connect } from '@cerebral/react';
import { state } from 'cerebral';

import React from 'react';

export const DocumentDetail = connect(
  {
    helper: state.documentDetailHelper,
    showModal: state.showModal,
  },
  ({ helper, showModal }) => {
    return (
      <>
        <CaseDetailHeader />
        <section className="usa-section grid-container DocumentDetail">
          <h2 className="heading-1">{helper.formattedDocument.documentType}</h2>
          <span className="filed-by">
            Filed {helper.formattedDocument.createdAtFormatted} by{' '}
            {helper.formattedDocument.filedBy}
          </span>
          <SuccessNotification />
          <ErrorNotification />
          <DocumentActions />

          <Tabs className="no-full-border-bottom" bind="currentTab">
            {helper.showDocumentInfoTab && (
              <Tab
                tabName="Document Info"
                title="Document Info"
                id="tab-document-info"
              >
                <DocumentInfo />
              </Tab>
            )}
            <Tab tabName="Messages" title="Messages" id="tab-pending-messages">
              <Messages />
            </Tab>
          </Tabs>
        </section>
        {showModal === 'ServeToIrsModalDialog' && <ServeToIrsModalDialog />}
        {showModal === 'RecallPetitionModalDialog' && (
          <RecallPetitionModalDialog />
        )}
        {showModal === 'CreateMessageModalDialog' && (
          <CreateMessageModalDialog />
        )}
      </>
    );
  },
);
