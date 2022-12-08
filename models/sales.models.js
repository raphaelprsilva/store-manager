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

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id AS saleId, date, product_id AS productId, quantity FROM sales_products
        JOIN sales
          ON (sales.id = sales_products.sale_id)`,
  );

  return sales;
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id AS productId, quantity FROM sales_products
        JOIN sales
          ON (sales.id = sales_products.sale_id)
        WHERE sale_id = ?`,
    [id],
  );

  return sale;
};

module.exports = {
  insert,
  create,
  getAll,
  getById,
};
