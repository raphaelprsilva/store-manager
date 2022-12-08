const joiErrorStatus = {
  'any.required': 'BAD_REQUEST',
  'string.min': 'INVALID_VALUE',
  'number.base': 'BAD_REQUEST',
  'number.min': 'INVALID_VALUE',
  'string.base': 'BAD_REQUEST',
  'string.empty': 'INVALID_VALUE',
  'number.empty': 'INVALID_VALUE',
};

module.exports = {
  joiErrorStatus,
};
