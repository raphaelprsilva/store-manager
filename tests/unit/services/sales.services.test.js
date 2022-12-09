const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, productsModel } = require('../../../models');
const { salesService } = require('../../../services');
const { productsMock } = require('../mocks/products.mock');
const {
  salesMockNotSorted,
  salesMockSorted,
  saleMock,
  inexistentSaleId,
  emptySalesMock,
} = require('../mocks/sales.mock');

describe('salesService unit tests', function () {
  describe('create', function () {
    it('should return an object with the sale data', async function () {
      sinon.stub(productsModel, 'getById').resolves(productsMock);
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
      expect(sale.message).to.be.deep.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('getAll', function () {
    it('should return an array with all sales sorted', async function () {
      sinon.stub(salesModel, 'getAll').resolves(salesMockNotSorted);

      const sales = await salesService.getAll();

      expect(sales).to.be.an('array');
      expect(sales).to.have.lengthOf(2);
      expect(sales).to.be.deep.equal(salesMockSorted);
    });
  });

  describe('getById', function () {
    it('should return an object with the sale data', async function () {
      sinon.stub(salesModel, 'getById').resolves([saleMock]);

      const sale = await salesService.getById(1);

      expect(sale).to.be.an('object');
      expect(sale).to.have.all.keys(['type', 'message']);
      expect(sale).to.have.property('type', null);
      expect(sale.message).to.be.deep.equal([saleMock]);
    });

    it('should return an object with the error message', async function () {
      sinon.stub(salesModel, 'getById').resolves(emptySalesMock);

      const sale = await salesService.getById(inexistentSaleId);

      expect(sale).to.be.an('object');
      expect(sale).to.have.all.keys(['type', 'message']);
      expect(sale).to.have.property('type', 'SALE_NOT_FOUND');
      expect(sale.message).to.be.deep.equal('Sale not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
