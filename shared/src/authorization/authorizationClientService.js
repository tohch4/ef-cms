exports.CASE_METADATA = 'caseMetadata';
exports.FILE_EXTERNAL_DOCUMENT = 'fileExternalDocument';
exports.GET_CASE = 'getCase';
exports.PETITION = 'getPetitionOptions';
exports.UPDATE_CASE = 'updateCase';
exports.WORKITEM = 'workItem';
exports.CREATE_USER = 'createUser';
exports.GET_USERS_IN_SECTIION = 'getUsersInSection';
exports.START_PAPER_CASE = 'startPaperCase';
exports.GET_READ_MESSAGES = 'getReadMessages';

const AUTHORIZATION_MAP = {
  admin: [exports.CREATE_USER],
  docketclerk: [
    exports.CASE_METADATA,
    exports.GET_CASE,
    exports.GET_CASES_BY_DOCUMENT_ID,
    exports.WORKITEM,
    exports.UPDATE_CASE,
    exports.GET_USERS_IN_SECTION,
    exports.START_PAPER_CASE,
    exports.GET_READ_MESSAGES,
    exports.FILE_EXTERNAL_DOCUMENT,
  ],
  petitioner: [exports.PETITION, exports.FILE_EXTERNAL_DOCUMENT],
  petitionsclerk: [
    exports.CASE_METADATA,
    exports.GET_CASE,
    exports.GET_CASES_BY_DOCUMENT_ID,
    exports.PETITION,
    exports.UPDATE_CASE,
    exports.WORKITEM,
    exports.GET_USERS_IN_SECTION,
    exports.START_PAPER_CASE,
    exports.GET_READ_MESSAGES,
  ],

  practitioner: [
    exports.GET_CASE,
    exports.PETITION,
    exports.FILE_EXTERNAL_DOCUMENT,
  ],
  respondent: [
    exports.GET_CASE,
    exports.FILE_EXTERNAL_DOCUMENT,
    exports.UPDATE_CASE,
  ],
  seniorattorney: [
    exports.CASE_METADATA,
    exports.GET_CASE,
    exports.GET_CASES_BY_DOCUMENT_ID,
    exports.UPDATE_CASE,
    exports.WORKITEM,
    exports.GET_READ_MESSAGES,
    exports.GET_USERS_IN_SECTION,
  ],
  taxpayer: [exports.PETITION],
};

/**
 *
 * @param userId
 * @param action
 * @param owner
 * @returns {boolean}
 */
exports.isAuthorized = (user, action, owner) => {
  if (user.userId && user.userId === owner) {
    return true;
  }

  const userRole = user.role;
  if (!AUTHORIZATION_MAP[userRole]) {
    return false;
  }

  const actionInRoleAuthorization =
    AUTHORIZATION_MAP[userRole].indexOf(action) > -1;
  return actionInRoleAuthorization;
};
