import { expect } from 'chai';
import { initFixtures } from './fixtures/init';
import { Store } from '../web_client/model/Store';
import { Order } from '../server/db/schemas/Order';
import * as logger from 'winston';

describe('stock', () => {

  before(async () => {
    await initFixtures();
  });

  it('stock matrix', async () => {
    const store = new Store();
    await store.onSearchValueChange('broca');
    store.onProductQtyChanged(store.productsFromSearch[0], 3);
    store.onProductQtyChanged(store.productsFromSearch[1], 5);
    store.onProductQtyChanged(store.productsFromSearch[2], 7);

    await store.onMatrixPageDisplay();
    expect(store.stockMatrix.products).to.have.lengthOf(3);
    expect(store.stockMatrix.products[0].name).to.equal('Broca grande');
    expect(store.stockMatrix.products[1].name).to.equal('Broca média');
    expect(store.stockMatrix.products[2].name).to.equal('Broca pequena');
    const prices = [...store.stockMatrix.products[2].productPrices];
    expect(prices).to.eql([500, 1000, 2000]);
  });

  it('asked qty greather than available', async () => {
    const store = new Store();
    await store.onSearchValueChange('broca');
    // dental 1 has only 17 items in stock
    store.onProductQtyChanged(store.productsFromSearch[0], 20);
    await store.onMatrixPageDisplay();
    const prices = [...store.stockMatrix.products[0].productPrices];
    expect(prices).to.eql([undefined, undefined, 3294]);
  });

});
