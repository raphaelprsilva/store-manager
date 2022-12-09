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
        sinon.stub(productsModel, 'getById').resolves([
          {
            id: 1,
            name: 'Product 1',
          },
        ]);

        const product = await productsService.getById(1);

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', null);
        expect(product.message).to.be.deep.equal({
          id: 1,
          name: 'Product 1',
        });

        sinon.restore();
      });

      afterEach(function () {
        sinon.restore();
      });
    });

    describe('On Failure', function () {
      it('should return an object pointing out that product was not found', async function () {
        sinon.stub(productsModel, 'getById').resolves([]);

        const product = await productsService.getById(45303);

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', 'notFound');
        expect(product).to.have.property('message', 'Product not found');

        sinon.restore();
      });

      afterEach(function () {
        sinon.restore();
      });
    });
  });

  describe('create', function () {
    describe('On Success', function () {
      it('should return an object with product data', async function () {
        sinon.stub(productsModel, 'create').resolves({
          id: 42,
          name: 'Product 42',
        });

        const product = await productsService.create({ name: 'Product 42' });

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', null);
        expect(product.message).to.be.deep.equal({
          id: 42,
          name: 'Product 42',
        });
      });
    });

    describe('On Failure', function () {
      it('should return an object when product already exists', async function () {
        sinon.stub(productsModel, 'getByName').resolves([
          {
            id: 1,
            message: 'Product 42',
          },
        ]);

        const product = await productsService.create({ name: 'Product 42' });

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', 'ALREADY_EXISTS');
        expect(product).to.have.property('message', 'Product already exists');
      });

      it('should return an object when "name" is wrong', async function () {
        sinon.stub(productsModel, 'create').resolves({
          type: 'notCreated',
          message: 'Product not created',
        });

        const product = await productsService.create({
          wrongKey: 'Product 42',
        });

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', 'BAD_REQUEST');
        expect(product).to.have.property('message', '"name" is required');
      });

      it('should return an object when "name" is not given', async function () {
        sinon.stub(productsModel, 'create').resolves({
          type: 'notCreated',
          message: 'Product not created',
        });

        const product = await productsService.create({});

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', 'BAD_REQUEST');
        expect(product).to.have.property('message', '"name" is required');
      });

      it('should return an object when "name" is not a string', async function () {
        sinon.stub(productsModel, 'create').resolves({
          type: 'notCreated',
          message: 'Product not created',
        });

        const product = await productsService.create({ name: 42 });

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', 'BAD_REQUEST');
        expect(product).to.have.property('message', '"name" must be a string');
      });

      it('should return an object when "name" is an empty string', async function () {
        sinon.stub(productsModel, 'create').resolves({
          type: 'notCreated',
          message: 'Product not created',
        });

        const product = await productsService.create({ name: '' });

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', 'INVALID_VALUE');
        expect(product).to.have.property(
          'message',
          '"name" is not allowed to be empty'
        );
      });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('update', function () {
    describe('On Success', function () {
      it('should return an object with product data', async function () {
        sinon.stub(productsModel, 'update').resolves({
          id: 42,
          name: 'Product 42',
        });
        sinon.stub(productsModel, 'getById').resolves([
          {
            id: 42,
            name: 'Product 42',
          },
        ]);

        const product = await productsService.update(42, {
          name: 'Product 42',
        });

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', null);
        expect(product.message).to.be.deep.equal({
          id: 42,
          name: 'Product 42',
        });
      });

      afterEach(function () {
        sinon.restore();
      });
    });

    describe('On Failure', function () {
      it('should return an object when product does not exist', async function () {
        sinon.stub(productsModel, 'getById').resolves([]);

        const product = await productsService.update(999, {
          name: 'Product 999',
        });

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', 'PRODUCT_NOT_FOUND');
        expect(product).to.have.property('message', 'Product not found');
      });

      it('should return an object when "name" is wrong', async function () {
        sinon.stub(productsModel, 'update').resolves({
          type: 'notUpdated',
          message: 'Product not updated',
        });

        const product = await productsService.update(42, {
          wrongKey: 'Product 42',
        });

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', 'BAD_REQUEST');
        expect(product).to.have.property('message', '"name" is required');
      });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('remove', function () {
    describe('On Success', function () {
      it('should return an object with product data', async function () {
        sinon.stub(productsModel, 'getById').resolves([
          {
            id: 42,
            name: 'Product 42',
          },
        ]);
        sinon.stub(productsModel, 'remove').resolves();

        const product = await productsService.remove(42);

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', null);
        expect(product.message).to.be.deep.equal('Product deleted');
      });

      afterEach(function () {
        sinon.restore();
      });
    });

    describe('On Failure', function () {
      it('should return an object when product does not exist', async function () {
        sinon.stub(productsModel, 'getById').resolves([]);

        const product = await productsService.remove(999);

        expect(product).to.be.an('object');
        expect(product).to.have.all.keys(['type', 'message']);
        expect(product).to.have.property('type', 'PRODUCT_NOT_FOUND');
        expect(product).to.have.property('message', 'Product not found');
      });

      afterEach(function () {
        sinon.restore();
      });
    });
  });
});
