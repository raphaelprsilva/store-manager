const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../db/connection');
const { salesModel } = require('../../../models');

const { salesMock, emptySalesMock, saleMock } = require('../mocks/sales.mock');

describe('salesModel unit tests', function () {
  describe('create', function () {
    describe('When sale is successfully created', function () {
      it('should return an object with sale data', async function () {
        const stub = sinon.stub(connection, 'execute');
        stub.onCall(0).resolves([{ insertId: 1 }]);
        stub.onCall(1).resolves([{}]);

        const sale = await salesModel.create();

        expect(sale).to.be.an('object');
        expect(sale).to.have.all.keys('id');
      });

      afterEach(function () {
        sinon.restore();
      });
    });
  });

  describe('insert', function () {
    describe('When sale is successfully created', function () {
      it('should return an object with sale data', async function () {
        const stub = sinon.stub(connection, 'execute');
        stub.resolves([{}]);

        const sale = await salesModel.insert({
          saleId: 1,
          productId: 1,
          quantity: 1,
        });

        expect(sale).to.be.an('array');
      });

      afterEach(function () {
        sinon.restore();
      });
    });

    describe('When sale is not successfully created', function () {
      it('should return an object with sale data', async function () {
        const stub = sinon.stub(connection, 'execute');
        stub.resolves([]);

        const sale = await salesModel.insert({
          saleId: 1,
          productId: 1,
          quantity: 1,
        });

        expect(sale).to.be.an('array');
        expect(sale).to.be.empty;
      });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('getAll', function () {
    describe('When sales are successfully retrieved', function () {
      it('should return an array of sales', async function () {
        const stub = sinon.stub(connection, 'execute');
        stub.resolves([salesMock]);

        const sales = await salesModel.getAll();

        expect(sales).to.be.an('array');
        expect(sales).to.have.lengthOf(2);
        expect(sales).to.be.deep.equal(salesMock);
      });

      afterEach(function () {
        sinon.restore();
      });
    });

    describe('When sales are not successfully retrieved', function () {
      it('should return an empty array', async function () {
        const stub = sinon.stub(connection, 'execute');
        stub.resolves([emptySalesMock]);

        const sales = await salesModel.getAll();

        expect(sales).to.be.an('array');
        expect(sales).to.be.empty;
      });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('getById', function () {
    describe('When sale is successfully retrieved', function () {
      it('should return an object with sale data', async function () {
        const stub = sinon.stub(connection, 'execute');
        stub.resolves([[saleMock]]);

        const sale = await salesModel.getById(1);

        expect(sale).to.be.an('array');
        expect(sale).to.have.lengthOf(1);
        expect(sale).to.be.deep.equal([saleMock]);
      });

      afterEach(function () {
        sinon.restore();
      });
    });

    describe('When sale is not successfully retrieved', function () {
      it('should return an empty array', async function () {
        const stub = sinon.stub(connection, 'execute');
        stub.resolves([emptySalesMock]);

        const sale = await salesModel.getById(1);

        expect(sale).to.be.an('array');
        expect(sale).to.be.empty;
      });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('update', function () {
    describe('When sale is successfully updated', function () {
      it('should return an object with sale data', async function () {
        const stub = sinon.stub(connection, 'execute');
        stub.resolves([{}]);

        const sale = await salesModel.update(1, {
          productId: 1,
          quantity: 10,
        });

        expect(sale).to.be.an('object');
        expect(sale).to.be.empty;
      });

      afterEach(function () {
        sinon.restore();
      });
    });
  });
});
