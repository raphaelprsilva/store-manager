const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../db/connection');
const { productsModel } = require('../../../models');
const { productsMock, emptyProductsMock } = require('../mocks/products.mock');

describe.only('productsModel unit tests', function () {
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

  describe('getById', function () {
    describe('On success', function () {
      it('should return an array with product data', async function () {
        const stub = sinon.stub(connection, 'execute');
        stub.resolves([productsMock[0]]);

        const product = await productsModel.getById(1);

        expect(product).to.be.deep.equal(productsMock[0]);
      });
    });

    describe('On failure', function () {
      it('should return an empty array', async function () {
        const stub = sinon.stub(connection, 'execute');
        stub.resolves([emptyProductsMock]);

        const nonExistendProductId = 54820;
        const product = await productsModel.getById(nonExistendProductId);

        expect(product).to.be.deep.equal(emptyProductsMock);
      });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
