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

  describe('getById', function () {
    describe('When product does exists', function () {
      it('should return an array with product data', async function () {
        sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);

        const product = await productsModel.getById(1);

        expect(product).to.be.an('array');
        expect(product).to.have.lengthOf(1);
      });
    });

    describe('When product does not exists', function () {
      it('should return an array with product data', async function () {
        sinon.stub(connection, 'execute').resolves([[]]);

        const product = await productsModel.getById(644165);

        expect(product).to.be.an('array');
        expect(product).to.have.lengthOf(0);
      });
    });
  });

  describe('create', function () {
    describe('When product is successfully created', function () {
      it('should return an object with product data', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

        const newProductCreated = await productsModel.create({
          name: 'Produto X',
        });

        expect(newProductCreated).to.be.deep.equal({
          id: 42,
          name: 'Produto X',
        });
      });
    });
  });

  describe('getByName', function () {
    describe('When product does exists', function () {
      it('should return an array with product data', async function () {
        sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);

        const product = await productsModel.getByName('Produto 1');

        expect(product).to.be.an('array');
        expect(product).to.have.lengthOf(1);
      });
    });

    describe('When product does not exists', function () {
      it('should return an array with product data', async function () {
        sinon.stub(connection, 'execute').resolves([[]]);

        const product = await productsModel.getByName('Produto 1');

        expect(product).to.be.an('array');
        expect(product).to.have.lengthOf(0);
      });
    });
  });

  describe('update', function () {
    describe('When product is successfully updated', function () {
      it('should return an object with product data', async function () {
        sinon.stub(connection, 'execute').resolves();

        const productUpdated = await productsModel.update(42, {
          name: 'Produto X',
        });

        expect(productUpdated).to.be.deep.equal({
          id: 42,
          name: 'Produto X',
        });
      });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
