const { productSchema } = require('./productsSchemas');
const { joiErrorStatus } = require('../../utils/joiErrorMap');

const validateRequestProductSchema = (productData) => {
  const { name } = productData;
  const { error } = productSchema.validate({ name });

  if (error) {
    const joiError = error.details[0].type;
    const validationErrorType = joiErrorStatus[joiError];
    return { type: validationErrorType, message: error.message };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateRequestProductSchema,
};
