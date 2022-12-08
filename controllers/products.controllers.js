const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);

  if (type) {
    return res.status(404).json({ message });
  }

  return res.status(200).json(message);
};

const create = async (req, res) => {
  const { name } = req.body;
  const productData = { name };
  const { type, message } = await productsService.create(productData);

  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }

  return res.status(201).json(message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  const { type, message } = await productsService.update(id, productData);

  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }

  res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
