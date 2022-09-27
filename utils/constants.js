const CODE = {
  SUCCESS_CREATED: 201,
  NOT_VALID_DATA: 400,
  NOT_AUTHORIZED: 401,
  AUTHORIZED_NO_ACCESS: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

const LINK_REGEXP = /https?:\/\/(w{3}\.)?([\w-]+\.)+\w+(\/[\w\-.~:?#[\]@!$&'()*+,;=]+)*\/?/;

const MONGO_ID_REGEXP = /[a-f0-9]{24}/;

module.exports = {
  CODE,
  LINK_REGEXP,
  MONGO_ID_REGEXP,
};
