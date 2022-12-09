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

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.getById(id);

  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }

  res.status(200).json(message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const { type, message } = await salesService.update(id, sale);

  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }

  res.status(200).json(message);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
