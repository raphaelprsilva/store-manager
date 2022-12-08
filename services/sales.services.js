const { salesModel, productsModel } = require('../models');
const {
  validateRequestSalesSchema,
} = require('./validations/salesValidations');

const create = async (sale) => {
  const validationResult = validateRequestSalesSchema(sale);

  if (validationResult.type) return validationResult;

  const productsPromises = sale.map(async (s) => {
    const [product] = await productsModel.getById(s.productId);
    return product;
  });
  const productsCheck = await Promise.all(productsPromises);
  const hasNotSomeProductInDb = productsCheck.some((p) => !p);

  if (hasNotSomeProductInDb) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const { id } = await salesModel.create();

  const salesPromise = sale.map(
    (s) => salesModel.insert({ saleId: id, ...s }),
  );

  await Promise.all(salesPromise);

  return { type: null, message: { id, itemsSold: sale } };
};

module.exports = {
  create,
};
