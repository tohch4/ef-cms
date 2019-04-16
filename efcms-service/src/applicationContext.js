const AWSXRay = require('aws-xray-sdk');

const AWS =
  process.env.NODE_ENV === 'production'
    ? AWSXRay.captureAWS(require('aws-sdk'))
    : require('aws-sdk');

const uuidv4 = require('uuid/v4');
const { S3, DynamoDB } = AWS;
const docketNumberGenerator = require('../../shared/src/persistence/dynamo/cases/docketNumberGenerator');
const irsGateway = require('../../shared/src/external/irsGateway');
const {
  addWorkItemToSectionInbox,
} = require('../../shared/src/persistence/dynamo/workitems/addWorkItemToSectionInbox');
const {
  assignWorkItems: assignWorkItemsUC,
} = require('../../shared/src/business/useCases/workitems/assignWorkItemsInteractor');
const {
  createCase,
} = require('../../shared/src/persistence/dynamo/cases/createCase');
const {
  deleteDocument,
} = require('../../shared/src/persistence/s3/deleteDocument');

const {
  completeWorkItem,
} = require('../../shared/src/business/useCases/workitems/completeWorkItemInteractor');
const {
  createCase: createCaseUC,
} = require('../../shared/src/business/useCases/createCaseInteractor');
const {
  createCaseFromPaper,
} = require('../../shared/src/business/useCases/createCaseFromPaperInteractor');
const {
  createDocument,
} = require('../../shared/src/business/useCases/createDocumentInteractor');
const {
  createUser,
} = require('../../shared/src/persistence/dynamo/users/createUser');
const {
  createUser: createUserUC,
} = require('../../shared/src/business/useCases/users/createUserInteractor');
const {
  createWorkItem,
} = require('../../shared/src/persistence/dynamo/workitems/createWorkItem');
const {
  createWorkItem: createWorkItemUC,
} = require('../../shared/src/business/useCases/workitems/createWorkItemInteractor');
const {
  deleteWorkItemFromInbox,
} = require('../../shared/src/persistence/dynamo/workitems/deleteWorkItemFromInbox');
const {
  deleteWorkItemFromSection,
} = require('../../shared/src/persistence/dynamo/workitems/deleteWorkItemFromSection');
const {
  forwardWorkItem,
} = require('../../shared/src/business/useCases/workitems/forwardWorkItemInteractor');
const {
  getCase,
} = require('../../shared/src/business/useCases/getCaseInteractor');
const {
  getCaseByCaseId,
} = require('../../shared/src/persistence/dynamo/cases/getCaseByCaseId');
const {
  getCaseByDocketNumber,
} = require('../../shared/src/persistence/dynamo/cases/getCaseByDocketNumber');
const {
  getCasesByStatus,
} = require('../../shared/src/persistence/dynamo/cases/getCasesByStatus');
const {
  getCasesByStatus: getCasesByStatusUC,
} = require('../../shared/src/business/useCases/getCasesByStatusInteractor');
const {
  getCasesByUser,
} = require('../../shared/src/persistence/dynamo/cases/getCasesByUser');
const {
  getCasesByUser: getCasesByUserUC,
} = require('../../shared/src/business/useCases/getCasesByUserInteractor');
const {
  getCasesForRespondent,
} = require('../../shared/src/persistence/dynamo/cases/getCasesForRespondent');
const {
  getCasesForRespondent: getCasesForRespondentUC,
} = require('../../shared/src/business/useCases/respondent/getCasesForRespondentInteractor');
const {
  getDownloadPolicyUrl,
} = require('../../shared/src/persistence/s3/getDownloadPolicyUrl');
const {
  getInternalUsers,
} = require('../../shared/src/persistence/dynamo/users/getInternalUsers');
const {
  getInternalUsers: getInternalUsersUC,
} = require('../../shared/src/business/useCases/users/getInternalUsersInteractor');
const {
  getSentWorkItemsForSection,
} = require('../../shared/src/persistence/dynamo/workitems/getSentWorkItemsForSection');
const {
  getSentWorkItemsForSection: getSentWorkItemsForSectionUC,
} = require('../../shared/src/business/useCases/workitems/getSentWorkItemsForSectionInteractor');
const {
  getSentWorkItemsForUser,
} = require('../../shared/src/persistence/dynamo/workitems/getSentWorkItemsForUser');
const {
  getSentWorkItemsForUser: getSentWorkItemsForUserUC,
} = require('../../shared/src/business/useCases/workitems/getSentWorkItemsForUserInteractor');
const {
  getUploadPolicy,
} = require('../../shared/src/persistence/s3/getUploadPolicy');
const {
  getUser,
} = require('../../shared/src/business/useCases/getUserInteractor');
const {
  getUserById,
} = require('../../shared/src/persistence/dynamo/users/getUserById');
const {
  getUsersInSection,
} = require('../../shared/src/persistence/dynamo/users/getUsersInSection');
const {
  getUsersInSection: getUsersInSectionUC,
} = require('../../shared/src/business/useCases/users/getUsersInSectionInteractor');
const {
  getWorkItem,
} = require('../../shared/src/business/useCases/workitems/getWorkItemInteractor');
const {
  getWorkItemById,
} = require('../../shared/src/persistence/dynamo/workitems/getWorkItemById');
const {
  getWorkItemsBySection,
} = require('../../shared/src/persistence/dynamo/workitems/getWorkItemsBySection');
const {
  getWorkItemsBySection: getWorkItemsBySectionUC,
} = require('../../shared/src/business/useCases/workitems/getWorkItemsBySectionInteractor');
const {
  getWorkItemsForUser,
} = require('../../shared/src/persistence/dynamo/workitems/getWorkItemsForUser');
const {
  getWorkItemsForUser: getWorkItemsForUserUC,
} = require('../../shared/src/business/useCases/workitems/getWorkItemsForUserInteractor');
const {
  incrementCounter,
} = require('../../shared/src/persistence/dynamo/helpers/incrementCounter');
const {
  isAuthorized,
  WORKITEM,
} = require('../../shared/src/authorization/authorizationClientService');
const {
  PetitionFromPaperWithoutFiles,
} = require('../../shared/src/business/entities/PetitionFromPaperWithoutFiles');
const {
  PetitionWithoutFiles,
} = require('../../shared/src/business/entities/PetitionWithoutFiles');
const {
  putWorkItemInOutbox,
} = require('../../shared/src/persistence/dynamo/workitems/putWorkItemInOutbox');
const {
  recallPetitionFromIRSHoldingQueue,
} = require('../../shared/src/business/useCases/recallPetitionFromIRSHoldingQueueInteractor');
const {
  runBatchProcess,
} = require('../../shared/src/business/useCases/runBatchProcessInteractor');
const {
  saveWorkItem,
} = require('../../shared/src/persistence/dynamo/workitems/saveWorkItem');
const {
  saveWorkItemForNonPaper
} = require('../../shared/src/persistence/dynamo/workitems/saveWorkItemForNonPaper')
const {
  saveWorkItemForPaper
} = require('../../shared/src/persistence/dynamo/workitems/saveWorkItemForPaper')
const {
  sendPetitionToIRSHoldingQueue,
} = require('../../shared/src/business/useCases/sendPetitionToIRSHoldingQueueInteractor');
const {
  updateCase,
} = require('../../shared/src/persistence/dynamo/cases/updateCase');
const {
  updateCase: updateCaseUC,
} = require('../../shared/src/business/useCases/updateCaseInteractor');
const {
  updateWorkItem,
} = require('../../shared/src/persistence/dynamo/workitems/updateWorkItem');
const {
  zipDocuments,
} = require('../../shared/src/persistence/s3/zipDocuments');
const { User } = require('../../shared/src/business/entities/User');

const environment = {
  documentsBucketName: process.env.DOCUMENTS_BUCKET_NAME || '',
  dynamoDbEndpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
  masterDynamoDbEndpoint:
    process.env.MASTER_DYNAMODB_ENDPOINT || 'dynamodb.us-east-1.amazonaws.com',
  masterRegion: process.env.MASTER_REGION || 'us-east-1',
  region: process.env.AWS_REGION || 'us-east-1',
  s3Endpoint: process.env.S3_ENDPOINT || 'localhost',
  stage: process.env.STAGE || 'local',
};

let user;
const getCurrentUser = () => {
  return user;
};
const setCurrentUser = newUser => {
  user = new User(newUser);
};

module.exports = (appContextUser = {}) => {
  setCurrentUser(appContextUser);

  return {
    docketNumberGenerator,
    environment,
    getCurrentUser,
    getDocumentClient: ({ useMasterRegion } = {}) => {
      const dynamo = new DynamoDB.DocumentClient({
        endpoint: useMasterRegion
          ? environment.masterDynamoDbEndpoint
          : environment.dynamoDbEndpoint,
        region: useMasterRegion ? environment.masterRegion : environment.region,
      });
      return dynamo;
    },
    getDocumentsBucketName: () => {
      return environment.documentsBucketName;
    },
    getEntityConstructors: () => ({
      Petition: PetitionWithoutFiles,
      PetitionFromPaper: PetitionFromPaperWithoutFiles,
    }),
    getPersistenceGateway: () => {
      return {
        addWorkItemToSectionInbox,
        createCase,
        createUser,
        createWorkItem,
        deleteDocument,
        deleteWorkItemFromInbox,
        deleteWorkItemFromSection,
        getCaseByCaseId,
        getCaseByDocketNumber,
        getCasesByStatus,
        getCasesByUser,
        getCasesForRespondent,
        getDownloadPolicyUrl,
        getInternalUsers,
        getSentWorkItemsForSection,
        getSentWorkItemsForUser,
        getUploadPolicy,
        getUserById,
        getUsersInSection,
        getWorkItemById,
        getWorkItemsBySection,
        getWorkItemsForUser,
        incrementCounter,
        putWorkItemInOutbox,
        saveWorkItem,
        saveWorkItemForNonPaper,
        saveWorkItemForPaper,
        updateCase,
        updateWorkItem,
        zipDocuments,
      };
    },
    getStorageClient: () => {
      const s3 = new S3({
        endpoint: environment.s3Endpoint,
        region: environment.region,
        s3ForcePathStyle: true,
      });
      return s3;
    },
    // TODO: replace external calls to environment
    getUniqueId: () => {
      return uuidv4();
    },
    getUseCases: () => {
      return {
        assignWorkItems: assignWorkItemsUC,
        completeWorkItem,
        createCase: createCaseUC,
        createCaseFromPaper,
        createDocument,
        createUser: createUserUC,
        createWorkItem: createWorkItemUC,
        forwardWorkItem,
        getCase,
        getCasesByStatus: getCasesByStatusUC,
        getCasesByUser: getCasesByUserUC,
        getCasesForRespondent: getCasesForRespondentUC,
        getInternalUsers: getInternalUsersUC,
        getSentWorkItemsForSection: getSentWorkItemsForSectionUC,
        getSentWorkItemsForUser: getSentWorkItemsForUserUC,
        getUser,
        getUsersInSection: getUsersInSectionUC,
        getWorkItem,
        getWorkItemsBySection: getWorkItemsBySectionUC,
        getWorkItemsForUser: getWorkItemsForUserUC,
        recallPetitionFromIRSHoldingQueue,
        runBatchProcess,
        sendPetitionToIRSHoldingQueue,
        updateCase: updateCaseUC,
      };
    },
    irsGateway,
    isAuthorized,
    isAuthorizedForWorkItems: () => isAuthorized(user, WORKITEM),
    logger: {
      error: value => {
        // eslint-disable-next-line no-console
        console.error(JSON.stringify(value));
      },
      info: (key, value) => {
        // eslint-disable-next-line no-console
        console.info(key, JSON.stringify(value));
      },
    },
  };
};
