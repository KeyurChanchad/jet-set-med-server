const secrek_key = 'JetSetMed@123';

const mongoURL = "mongodb://127.0.0.1:27017";

const encryptDecryptKey = "JetSetMed@123";

const ResponseCodes = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };
  
  const UserResponseCodes = {
    USER_SUCCESS: 2001,
    USER_NOT_FOUND: 2002,
    USER_PASSWORD_KEY_ERROR: 2003,
    USER_ALREADY_EXIST: 2004,
    USER_PASSWORD_MATCH_ERROR: 2008,
    USER_FETCH_FAILED: 2009,
    USER_DELETED_ERROR: 2010,
    PASSWORD_SHOULD_NOT_SAME: 2011,
  };
module.exports = { secrek_key, mongoURL, encryptDecryptKey, ResponseCodes, UserResponseCodes }