import { expect } from 'chai';
import { initFixtures } from './fixtures/init';
import { execGQLQuery } from '../server/graphql/graphql_controller';
import { Product } from '../common/Interfaces';
import { Store } from '../web_client/model/Store';

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
    store.onProductCountChanged(product, 3);
    expect(store.getProductCount('id1')).to.equal(3);
    expect(store.getProductCount('id2')).to.equal(0);
    expect(store.getCartAsArray).to.eql(
      [
        {
          product: {
            _id: 'id1',
            name: 'nomeProd1',
            code: 'cod1',
          },
          count: 3,
        },
      ],
    );
  });

  it('stock matrix', async () => {
    const store = new Store();
    await store.onSearchValueChange('broca');
    store.onProductCountChanged(store.productsFromSearch[0], 3);
    store.onProductCountChanged(store.productsFromSearch[1], 5);
    store.onProductCountChanged(store.productsFromSearch[2], 7);

    await store.onMatrixPageDisplay();
    expect(store.stockMatrix.products).to.have.lengthOf(3);
    expect(store.stockMatrix.products[0].name).to.equal('Broca grande');
    expect(store.stockMatrix.products[1].name).to.equal('Broca média');
    expect(store.stockMatrix.products[2].name).to.equal('Broca pequena');
    expect(store.stockMatrix.products[2].productPrices).to.eql([500, 1000, 2000]);
  });

});
