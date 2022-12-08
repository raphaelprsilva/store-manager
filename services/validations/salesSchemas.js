const Joi = require('joi');

const saleItemSchema = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const saleSchema = Joi.array().items(saleItemSchema);

module.exports = {
  saleItemSchema,
  saleSchema,
};
