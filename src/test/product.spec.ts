import { expect } from 'chai';
import { constructorFn, queryFn } from './init';
import { initFixtures } from './fixtures/init';
import { execGQLQuery } from '../server/graphql/graphql_controller';
import { Store } from '../web_client/model/Store';

describe('product', () => {

  before(async () => {
    await initFixtures();
  });

  it('typeahead', async () => {
    const store = new Store(queryFn, constructorFn);
    await store.loadTypeaheadProducts('broca');
    expect(store.productsFromSearch[0].name).to.be.equal('Broca grande');
    expect(store.productsFromSearch[1].name).to.be.equal('Broca média');
    expect(store.productsFromSearch[2].name).to.be.equal('Broca pequena');

    expect(store.productsFromSearch[0].description).to.be.equal('tamanho é grande');
    expect(store.productsFromSearch[0].code).to.be.equal('codigo5');
  });

});
