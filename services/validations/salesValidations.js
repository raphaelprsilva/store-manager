const { saleSchema } = require('./salesSchemas');
const { joiErrorStatus } = require('../../utils/joiErrorMap');

const validateRequestSalesSchema = (sale) => {
  const { error } = saleSchema.validate(sale);

  if (error) {
    const regex = /\[.*\]./g;
    const cleannedErrorMessage = error.message.replace(regex, '');
    const joiError = error.details[0].type;
    const validationErrorType = joiErrorStatus[joiError];
    return { type: validationErrorType, message: cleannedErrorMessage };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateRequestSalesSchema,
};
