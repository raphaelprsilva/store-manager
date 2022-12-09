const express = require('express');
const bodyParser = require('body-parser');

const { productsRouter, salesRouter } = require('./routes');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use('/*', (_request, response) => {
  response.status(404).json({ message: 'Not found' });
});

module.exports = app;
