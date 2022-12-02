const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../models');
const { productsService } = require('../../../services');

const { productsMock, emptyProductsMock } = require('../mocks/products.mock');

describe('productsService unit tests', function () {
  describe('getAll', function () {
    it('should return an array of products', async function () {
      sinon.stub(productsModel, 'getAll').resolves(productsMock);

      const products = await productsService.getAll();

      expect(products).to.be.an('array');
      expect(products).to.have.lengthOf(2);
      products.forEach((product) => {
        expect(product).to.have.all.keys('id', 'name', 'quantity');
      });
    });

    it('should return an empty array when there are no products', async function () {
      sinon.stub(productsModel, 'getAll').resolves(emptyProductsMock);

      const products = await productsService.getAll();

      expect(products).to.be.an('array');
      expect(products).to.be.empty;
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
