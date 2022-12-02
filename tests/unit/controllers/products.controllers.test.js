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
});
