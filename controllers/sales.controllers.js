const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const create = async (req, res) => {
  const products = req.body;

  const { type, message } = await salesService.create(products);

  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }

  res.status(201).json(message);
};

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  res.status(200).json(sales);
};

module.exports = {
  create,
  getAll,
};
