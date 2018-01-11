import { expect } from 'chai';
import * as http from 'http';
import { constructorFn, queryFn } from './init';
import { initFixtures, } from './fixtures/init';
import { execGQLQuery } from '../server/graphql/graphql_controller';
import { Store } from '../web_client/model/Store';

describe('product', () => {

  before(async () => {
    await initFixtures();
  });

  it('typeahead', async () => {
    const store = new Store(queryFn, constructorFn);
    await store.loadTypeaheadProducts('broca');
    expect(store.productTypeaheadSrc[0].name).to.be.equal('Broca grande');
    expect(store.productTypeaheadSrc[1].name).to.be.equal('Broca média');
    expect(store.productTypeaheadSrc[2].name).to.be.equal('Broca pequena');
  });

});
