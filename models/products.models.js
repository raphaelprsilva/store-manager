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

const update = async (id, productData) => {
  await connection.execute('UPDATE products SET name = ? WHERE id = ?', [
    productData.name,
    id,
  ]);

  return { id: +id, name: productData.name };
};

const remove = async (id) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  getByName,
  update,
  remove,
};
