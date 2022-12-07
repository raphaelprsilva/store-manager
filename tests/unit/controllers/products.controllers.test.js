const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../services');
const { productsController } = require('../../../controllers');

const { productsMock, emptyProductsMock } = require('../mocks/products.mock');

describe('productsController unit tests', function () {
  describe('getAll', function () {
    describe('When has products', function () {
      it('should return a response with status 200 and a JSON with all products registered', async function () {
        const res = {};
        const req = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'getAll').resolves(productsMock);
        await productsController.getAll(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productsMock);

        sinon.restore();
      });
    });

    describe('When has no products', function () {
      it('should return a response with status 200 and an empty array', async function () {
        const res = {};
        const req = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'getAll').resolves(emptyProductsMock);
        await productsController.getAll(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(emptyProductsMock);

        sinon.restore();
      });
    });
  });

  describe('getById', function () {
    describe('When product exists', async function () {
      it('should return a response with status 200 and product data', async function () {
        const req = {};
        const res = {};

        req.params = sinon.stub().returns(1);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'getById').resolves({
          type: null,
          message: productsMock[0],
        });

        await productsController.getById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productsMock[0]);
      });
    });

    describe('When product does not exists', async function () {
      it('should return a response with status 404 and message indicating that', async function () {
        const req = {};
        const res = {};

        req.params = sinon.stub().returns(45230);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'getById').resolves({
          type: 'notFound',
          message: 'Product not found',
        });

        await productsController.getById(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({
          message: 'Product not found',
        });
      });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('create', function () {
    describe('When product is created', function () {
      it('should return a response with status 201 and product data', async function () {
        const req = {};
        const res = {};

        req.body = sinon.stub().returns({ name: 'Test Product' });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'create').resolves({
          type: null,
          message: productsMock[0],
        });

        await productsController.create(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(productsMock[0]);
      });
    });

    describe('When product is not created', function () {
      it('should return a response with status 422 and message indicating that', async function () {
        const req = {};
        const res = {};

        req.body = sinon.stub().returns({ name: '' });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'create').resolves({
          type: 'INVALID_VALUE',
          message: '"name" is not allowed to be empty',
        });

        await productsController.create(req, res);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({
          message: '"name" is not allowed to be empty',
        });

        sinon.restore();
      });

      it('should return a response with status 409 and message indicating that', async function () {
        const req = {};
        const res = {};

        req.body = sinon.stub().returns({ name: 'Test Product' });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'create').resolves({
          type: 'ALREADY_EXISTS',
          message: 'Product already exists',
        });

        await productsController.create(req, res);

        expect(res.status).to.have.been.calledWith(409);
        expect(res.json).to.have.been.calledWith({
          message: 'Product already exists',
        });
      });

      it('should return a response with status 500 and message indicating that', async function () {
        const req = {};
        const res = {};

        req.body = sinon.stub().returns({ name: 'Test Product' });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'create').resolves({
          type: 'serverError',
          message: 'Internal server error',
        });

        await productsController.create(req, res);

        expect(res.status).to.have.been.calledWith(500);
        expect(res.json).to.have.been.calledWith({
          message: 'Internal server error',
        });
      });
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
