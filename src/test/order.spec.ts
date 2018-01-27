import { expect } from 'chai';
import { initFixtures } from './fixtures/init';
import { Store } from '../web_client/model/Store';
import { Order } from '../server/db/schemas/Order';
import { UserPayment } from '../server/db/schemas/UserPayment';
import { DentalPayment } from '../server/db/schemas/DentalPayment';
import * as chaiAsPromised from 'chai-as-promised';
import * as logger from 'winston';

describe('order', () => {

  before(async () => {
    await initFixtures();
  });

  it('send order', async () => {
    const store = new Store();
    await store.onSearchValueChange('broca');
    store.onProductQtyChanged(store.productsFromSearch[0], 5);
    store.onProductQtyChanged(store.productsFromSearch[1], 3);
    store.onProductQtyChanged(store.productsFromSearch[2], 2);
    await store.onMatrixPageDisplay();
    store.onDentalOfProductSelected(store.stockMatrix.products[0].id, store.stockMatrix.dentals[0]._id); // 5 x 2.803 = 14.015
    store.onDentalOfProductSelected(store.stockMatrix.products[1].id, store.stockMatrix.dentals[2]._id); // 3 * 4.900 = 14.700
    store.onDentalOfProductSelected(store.stockMatrix.products[2].id, store.stockMatrix.dentals[0]._id); // 2 * 500 = 1.000
    await store.onOrderRequested();
    const orders: any[] = await Order.find();
    const userPayments: any[] = await UserPayment.find();
    const dentalPayments: any[] = await DentalPayment.find();

    expect(userPayments[0].amount).equal(29715.0); // 14.015 + 14.700 + 1.000

    expect(dentalPayments[0].amount).equal(15015.0); // 14.015 + 1.000
    expect(dentalPayments[1].amount).equal(14700.0);

    expect(orders[0].products[0].price).equal(2803.0);
    expect(orders[0].products[1].price).equal(4900.0);
    expect(orders[0].products[2].price).equal(500.0);

    expect(orders[0].products[0].qty).equal(5);
    expect(orders[0].products[1].qty).equal(3);
    expect(orders[0].products[2].qty).equal(2);
  });

  it('invalid qty', async () => {
    const store = new Store();
    await store.onSearchValueChange('broca');
    store.onProductQtyChanged(store.productsFromSearch[0], 13);
    await store.onMatrixPageDisplay();
    store.onDentalOfProductSelected(store.stockMatrix.products[0].id, store.stockMatrix.dentals[0]._id);
    await expect(store.onOrderRequested()).to.be.rejectedWith();
  });

  it('invalid price', async () => {
    const store = new Store();
    await store.onSearchValueChange('broca');
    store.onProductQtyChanged(store.productsFromSearch[0], 5);
    await store.onMatrixPageDisplay();
    store.stockMatrix.products[0].productPrices[0] = 3.0; // invalid modification of the price
    store.onDentalOfProductSelected(store.stockMatrix.products[0].id, store.stockMatrix.dentals[0]._id);
    await expect(store.onOrderRequested()).to.be.rejectedWith();
  });

});
