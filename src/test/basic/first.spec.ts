import { expect } from 'chai';
import * as http from 'http';
import { createServer } from '../init';
import { initFixtures } from '../fixtures/init';
import { execGQLQuery } from '../../server/graphql/graphql_controller';
import { Store } from '../../web_client/model/Store';

const queryFn = async (query: string) => (await execGQLQuery(query)).data;
const constructorFn = function () { return 0; };

describe('first', () => {

  // let server: http.Server;

  before(async () => {
    await initFixtures();
    // server = await createServer();
  });

  it('first', () => {
    expect(1).to.be.equal(1);
  });

  it('graphql', async () => {
    const queryBunnies = 'query { bunnies { _id, name, count } }';
    const res = await execGQLQuery(queryBunnies);
    expect(res.data.bunnies).to.have.lengthOf(2);
    expect(res.data.bunnies[0].name).to.equal('bunny 1');
  });

  it('model', async () => {
    const store = new Store(queryFn, constructorFn);
    await store.loadBunnies();
    expect(store.bunnies).to.have.lengthOf(2);
    expect(store.bunnies[0].name).to.equal('bunny 1');
  });

  it('one bunny', async () => {
    const store = new Store(queryFn, constructorFn);
    await store.loadBunnies();
    const id = store.bunnies[0]._id;
    await store.loadBunny(id);
    expect(store.selectedBunny.name).to.equal('bunny 1');
    expect(store.selectedBunny.count).to.equal(3);
  });

});
