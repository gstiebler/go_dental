import { expect } from 'chai';
import { initFixtures } from './fixtures/init';
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

});
