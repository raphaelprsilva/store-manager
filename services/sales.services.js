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

  const salesPromise = sale.map((s) => salesModel.insert({ saleId: id, ...s }));

  await Promise.all(salesPromise);

  return { type: null, message: { id, itemsSold: sale } };
};

const getAll = async () => {
  const sales = await salesModel.getAll();

  const sortedSalesBySaleId = sales.sort((a, b) => a.saleId - b.saleId);
  const sortedSalesByProductId = sortedSalesBySaleId.sort(
    (a, b) => a.productId - b.productId,
  );

  return sortedSalesByProductId;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  console.log('🚀 ~ file: sales.services.js:44 ~ sale', sale);
  const saleSize = sale.length;

  if (!saleSize) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

module.exports = {
  create,
  getAll,
  getById,
};
