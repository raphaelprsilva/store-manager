const joiErrorStatus = {
  'any.required': 'BAD_REQUEST',
  'string.min': 'INVALID_VALUE',
  'number.base': 'BAD_REQUEST',
  'number.min': 'BAD_REQUEST',
  'string.base': 'BAD_REQUEST',
  'string.empty': 'INVALID_VALUE',
};

module.exports = {
  joiErrorStatus,
};
