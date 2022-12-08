const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService, salesService } = require('../../../services');
const { productsController, salesController } = require('../../../controllers');

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
});
