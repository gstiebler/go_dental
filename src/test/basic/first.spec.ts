import { expect } from 'chai';
import * as http from 'http';
// import { createServer } from '../init';
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

});
