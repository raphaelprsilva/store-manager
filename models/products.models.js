const connection = require('../db/connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

module.exports = {
  getAll,
};
