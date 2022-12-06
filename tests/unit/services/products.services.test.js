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

  describe('getById', function () {
    describe('On Success', function () {
      it('should return an object with product data', async function () {
        sinon.stub(productsModel, 'getById').resolves({
          type: null,
          message: productsMock[0],
        });

        const product = await productsModel.getById(1);

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', null);
        expect(product).to.have.property('message', productsMock[0]);
      });
    });

    describe('On Failure', function () {
      it('should return an object pointing out that product was not found', async function () {
        sinon.stub(productsModel, 'getById').resolves({
          type: 'notFound',
          message: 'Product not found',
        });

        const product = await productsModel.getById(45303);

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', 'notFound');
        expect(product).to.have.property('message', 'Product not found');
      });
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
