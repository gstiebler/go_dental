import { expect } from 'chai';
import { constructorFn, queryFn } from './init';
import { initFixtures } from './fixtures/init';
import { execGQLQuery } from '../server/graphql/graphql_controller';
import { Store, Product } from '../web_client/model/Store';

describe('product', () => {

  before(async () => {
    await initFixtures();
  });

  it('typeahead', async () => {
    const store = new Store(queryFn);
    await store._loadTypeaheadProducts('broca');
    expect(store.productsFromSearch[0].name).to.be.equal('Broca grande');
    expect(store.productsFromSearch[1].name).to.be.equal('Broca média');
    expect(store.productsFromSearch[2].name).to.be.equal('Broca pequena');

    expect(store.productsFromSearch[0].description).to.be.equal('tamanho é grande');
    expect(store.productsFromSearch[0].code).to.be.equal('codigo5');
  });

  it('product count', async () => {
    const store = new Store(queryFn);
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
      ]
    );

  });

});
