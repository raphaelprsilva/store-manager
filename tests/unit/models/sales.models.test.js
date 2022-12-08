const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../db/connection');
const { salesModel } = require('../../../models');

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
});
