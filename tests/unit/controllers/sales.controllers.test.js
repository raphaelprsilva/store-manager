const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../services');
const { salesController } = require('../../../controllers');

describe('salesController unit tests', function () {
  describe('create', function () {
    it('should return a response with status 201 and a JSON with the created sale', async function () {
      const req = {};
      const res = {};

      req.body = sinon.stub().returns({});
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'create').resolves({
        type: null,
        message: {
          id: 1,
          itensSold: [
            {
              productId: 1,
              quantity: 2,
            },
          ],
        },
      });

      await salesController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 1,
        itensSold: [
          {
            productId: 1,
            quantity: 2,
          },
        ],
      });

      sinon.restore();
    });

    it('should return a response with status 404 and a JSON with the error message', async function () {
      const req = {};
      const res = {};

      req.body = sinon.stub().returns({});
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'create').resolves({
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      });

      await salesController.create(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });

      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('getAll', function () {
    it('should return a response with status 200 and a JSON with all sales', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves([
        {
          id: 1,
          itensSold: [
            {
              productId: 1,
              quantity: 2,
            },
          ],
        },
      ]);

      await salesController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([
        {
          id: 1,
          itensSold: [
            {
              productId: 1,
              quantity: 2,
            },
          ],
        },
      ]);

      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('getById', function () {
    it('should return a response with status 200 and a JSON with the sale', async function () {
      const req = {};
      const res = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves({
        type: null,
        message: [
          {
            date: '2021-09-01T00:00:00.000Z',
            productId: 1,
            quantity: 2,
          },
        ],
      });

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([
        {
          date: '2021-09-01T00:00:00.000Z',
          productId: 1,
          quantity: 2,
        },
      ]);

      sinon.restore();
    });

    it('should return a response with status 404 and a JSON with the error message', async function () {
      const req = {};
      const res = {};

      req.params = { id: 42 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves({
        type: 'SALE_NOT_FOUND',
        message: 'Sale not found',
      });

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Sale not found',
      });

      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('update', function () {
    it('should return a response with status 200 and a JSON with the updated sale', async function () {
      const req = {};
      const res = {};

      req.params = { id: 1 };
      req.body = sinon.stub().returns({});
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'update').resolves({
        type: null,
        message: {
          id: 1,
          itensSold: [
            {
              productId: 1,
              quantity: 2,
            },
          ],
        },
      });

      await salesController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        id: 1,
        itensSold: [
          {
            productId: 1,
            quantity: 2,
          },
        ],
      });

      sinon.restore();
    });

    it('should return a response with status 404 and a JSON with the error message', async function () {
      const req = {};
      const res = {};

      req.params = { id: 42 };
      req.body = sinon.stub().returns({});
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'update').resolves({
        type: 'SALE_NOT_FOUND',
        message: 'Sale not found',
      });

      await salesController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Sale not found',
      });

      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
