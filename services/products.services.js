const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

module.exports = {
  getAll,
};
