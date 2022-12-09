const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const { productsRouter, salesRouter } = require('./routes');

const swaggerFile = require('./swagger-output.json');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    swaggerOptions: { persistAuthorization: true },
  }),
);

app.use('/*', (_request, response) => {
  response.status(404).json({ message: 'Not found' });
});

module.exports = app;
