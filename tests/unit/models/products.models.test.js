const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../db/connection');
const { productsModel } = require('../../../models');
const { productsMock, emptyProductsMock } = require('../mocks/products.mock');

describe('productsModel unit tests', function () {
  describe('getAll', function () {
    it('should return an array of products', async function () {
      const stub = sinon.stub(connection, 'execute');
      stub.resolves([productsMock]);

      const products = await productsModel.getAll();

      expect(products).to.be.an('array');
      expect(products).to.have.lengthOf(2);
      products.forEach((product) => {
        expect(product).to.have.all.keys('id', 'name', 'quantity');
      });
    });

    it('should return an empty array when there are no products', async function () {
      const stub = sinon.stub(connection, 'execute');
      stub.resolves([emptyProductsMock]);

      const products = await productsModel.getAll();

      expect(products).to.be.an('array');
      expect(products).to.be.empty;
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
