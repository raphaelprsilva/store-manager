const salesMock = [
  {
    saleId: 1,
    date: '2021-09-01T00:00:00.000Z',
    productId: 1,
    quantity: 1,
  },
  {
    saleId: 2,
    date: '2021-09-01T00:00:00.000Z',
    productId: 2,
    quantity: 2,
  },
];

const saleMock = {
  saleId: 1,
  date: '2021-09-01T00:00:00.000Z',
  productId: 1,
  quantity: 1,
};

const salesMockNotSorted = [
  {
    saleId: 2,
    date: '2021-09-01T00:00:00.000Z',
    productId: 2,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-01T00:00:00.000Z',
    productId: 1,
    quantity: 1,
  },
];

const salesMockSorted = [
  {
    saleId: 1,
    date: '2021-09-01T00:00:00.000Z',
    productId: 1,
    quantity: 1,
  },
  {
    saleId: 2,
    date: '2021-09-01T00:00:00.000Z',
    productId: 2,
    quantity: 2,
  },
];

const inexistentSaleId = 42;

const emptySalesMock = [];

module.exports = {
  salesMock,
  emptySalesMock,
  salesMockNotSorted,
  salesMockSorted,
  saleMock,
  inexistentSaleId,
};
