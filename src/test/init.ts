import * as MongoInit from '../server/db/init';
import * as mongoose from 'mongoose';
import * as winston from 'winston';
import * as dotenv from 'dotenv';
import * as http from 'http';
import app from '../server/app';
import { db } from '../server/db/init';
import { execGQLQuery } from '../server/graphql/graphql_controller';

// load environment variables from .env file in the root of the project (where package.json is)
dotenv.config();

before(async () => {
  await MongoInit.init({
    dbHost: process.env.MONGODB_HOST,
    dbName: process.env.MONGODB_TEST_DB_NAME,
    port: process.env.MONGODB_PORT,
  });
});

after((done) => {
  mongoose.disconnect(done);
});

export async function createServer(): Promise<http.Server> {
  const server = http.createServer(app);
  server.listen(process.env.SERVER_PORT);
  server.on('error', (err) => {
    winston.error(err.stack);
  });
  return server;
}

export async function queryFn(query: string) {
  try {
    const res = await execGQLQuery(query);
    if (res.data) {
      return res.data
    } else {
      console.error(res.errors);
    }
  } catch(error) {
    console.error(error);
  }
}

export const constructorFn = function () { return 0; };
