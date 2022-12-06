const connection = require('../db/connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return product;
};

const getByName = async (name) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );
  return product;
};

const create = async (productData) => {
  const [resultProduct] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [productData.name],
  );

  return { id: resultProduct.insertId, name: productData.name };
};

module.exports = {
  getAll,
  getById,
  create,
  getByName,
};
