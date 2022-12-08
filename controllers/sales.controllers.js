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

module.exports = {
  create,
};
