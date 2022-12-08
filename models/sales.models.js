const connection = require('../db/connection');

const insert = async (product) => {
  const sale = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [product.saleId, product.productId, product.quantity],
  );

  return sale;
};

const create = async () => {
  const [resultSale] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  return { id: resultSale.insertId };
};

module.exports = {
  insert,
  create,
};
