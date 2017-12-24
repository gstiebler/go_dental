import * as MongoInit from './init';
import * as dotenv from 'dotenv';
import { initFixtures } from '../../test/fixtures/init';

export async function seed() {
  dotenv.config();
  await MongoInit.init({
    dbHost: process.env.MONGODB_HOST,
    dbName: process.env.MONGODB_DB_NAME,
    port: process.env.MONGODB_PORT,
  });

  await initFixtures();

  await MongoInit.disconnect();
}
