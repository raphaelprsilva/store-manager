const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../models');
const { salesService } = require('../../../services');

describe('salesService unit tests', function () {
  describe('create', function () {
    it('should return an object with the sale data', async function () {
      sinon.stub(salesModel, 'create').resolves({ id: 1 });
      sinon.stub(salesModel, 'insert').resolves();

      const sale = await salesService.create([
        {
          productId: 1,
          quantity: 2,
        },
      ]);

      expect(sale).to.be.an('object');
      expect(sale).to.have.all.keys(['type', 'message']);
      expect(sale).to.have.property('type', null);
      expect(sale.message).to.be.deep.equal({
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 2,
          },
        ],
      });
    });

    it('should return an object with the error message', async function () {
      sinon.stub(salesModel, 'create').resolves({ id: 1 });
      sinon.stub(salesModel, 'insert').resolves();

      const wrongId = 130;
      const sale = await salesService.create([
        {
          productId: wrongId,
          quantity: 2,
        },
      ]);

      expect(sale).to.be.an('object');
      expect(sale).to.have.all.keys(['type', 'message']);
      expect(sale).to.have.property('type', 'PRODUCT_NOT_FOUND');
      expect(sale.message).to.be.deep.equal('Product not found');
    });

    it('should return an object with the error message when productId is not given', async function () {
      sinon.stub(salesModel, 'create').resolves({ id: 1 });
      sinon.stub(salesModel, 'insert').resolves();

      const sale = await salesService.create([
        {
          quantity: 2,
        },
      ]);

      expect(sale).to.be.an('object');
      expect(sale).to.have.all.keys(['type', 'message']);
      expect(sale).to.have.property('type', 'BAD_REQUEST');
      expect(sale.message).to.be.deep.equal('"productId" is required');
    });

    it('should return an object with the error message when quantity is negative', async function () {
      sinon.stub(salesModel, 'create').resolves({ id: 1 });
      sinon.stub(salesModel, 'insert').resolves();

      const sale = await salesService.create([
        {
          productId: 1,
          quantity: -2,
        },
      ]);

      expect(sale).to.be.an('object');
      expect(sale).to.have.all.keys(['type', 'message']);
      expect(sale).to.have.property('type', 'INVALID_VALUE');
      expect(sale.message).to.be.deep.equal('"quantity" must be greater than or equal to 1');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
