const { productsModel } = require('../models');
const {
  validateRequestProductSchema,
} = require('./validations/productsValidations');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const [product] = await productsModel.getById(id);

  if (!product) {
    return { type: 'notFound', message: 'Product not found' };
  }

  return { type: null, message: product };
};

const create = async (productData) => {
  const validationResult = validateRequestProductSchema(productData);
  if (validationResult.type) return validationResult;

  const productAlreadyExists = await productsModel.getByName(productData.name);

  if (productAlreadyExists.length) {
    return { type: 'ALREADY_EXISTS', message: 'Product already exists' };
  }

  const newProductCreated = await productsModel.create(productData);

  return { type: null, message: newProductCreated };
};

const update = async (id, productData) => {
  const validationResult = validateRequestProductSchema(productData);

  if (validationResult.type) return validationResult;

  const productAlreadyExists = await productsModel.getById(id);

  if (!productAlreadyExists.length) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const productUpdated = await productsModel.update(id, productData);

  return { type: null, message: productUpdated };
};

const remove = async (id) => {
  const productAlreadyExists = await productsModel.getById(id);

  if (!productAlreadyExists.length) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  await productsModel.remove(id);

  return { type: null, message: 'Product deleted' };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
