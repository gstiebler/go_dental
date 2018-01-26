import { expect } from 'chai';
import { initFixtures } from './fixtures/init';
import { execGQLQuery } from '../server/graphql/graphql_controller';
import { Product } from '../common/Interfaces';
import { Store } from '../web_client/model/Store';
import { Order } from '../server/db/schemas/Order';
import { UserPayment } from '../server/db/schemas/UserPayment';
import { DentalPayment } from '../server/db/schemas/DentalPayment';

describe('product', () => {

  before(async () => {
    await initFixtures();
  });

  it('typeahead', async () => {
    const store = new Store();
    await store.onSearchValueChange('broca');
    expect(store.productsFromSearch[0].name).to.be.equal('Broca grande');
    expect(store.productsFromSearch[1].name).to.be.equal('Broca média');
    expect(store.productsFromSearch[2].name).to.be.equal('Broca pequena');

    expect(store.productsFromSearch[0].description).to.be.equal('tamanho é grande');
    expect(store.productsFromSearch[0].code).to.be.equal('codigo5');
  });

  it('product count', async () => {
    const store = new Store();
    const product:Product = {
      _id: 'id1',
      name: 'nomeProd1',
      code: 'cod1',
    };
    store.onProductQtyChanged(product, 3);
    expect(store.getProductQty('id1')).to.equal(3);
    expect(store.getProductQty('id2')).to.equal(0);
    expect(store.getCartAsArray).to.eql(
      [
        {
          product: {
            _id: 'id1',
            name: 'nomeProd1',
            code: 'cod1',
          },
          qty: 3,
          dentalId: '',
        },
      ],
    );
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

  it('send order', async () => {
    const store = new Store();
    await store.onSearchValueChange('broca');
    store.onProductQtyChanged(store.productsFromSearch[2], 2);
    await store.onMatrixPageDisplay();
    store.onDentalOfProductSelected(store.stockMatrix.products[0].id, store.stockMatrix.dentals[0]._id);
    await store.onOrderRequested();
    const orders: any[] = await Order.find();
    const userPayments: any[] = await UserPayment.find();
    const dentalPayments: any[] = await DentalPayment.find();
    expect(userPayments[0].amount).equal(1000.0);
    expect(dentalPayments[0].amount).equal(1000.0);
    expect(orders[0].products[0].price).equal(500.0);
    expect(orders[0].products[0].qty).equal(2);
  })

});
