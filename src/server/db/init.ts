import * as mongoose from 'mongoose';
import * as logger from 'winston';

export let mongoURL;
export let db;
export async function init({
      dbHost,
      dbName,
      port,
      user,
      pass,
    }) {
  mongoURL = `mongodb://${user}:${pass}@${dbHost}:${port}/${dbName}?ssl=true&replicaSet=GoDental-shard-0&authSource=admin&retryWrites=true`;
  console.log(mongoURL);
  logger.info('MongoDB URI: ' + mongoURL);
  (<any>mongoose).Promise = global.Promise;

  await mongoose.disconnect();

  const options = {
    useMongoClient: true
  };
  try {
    db = await mongoose.connect(mongoURL, options);
    logger.info('Connected to MongoDB');

    /*
    mongoose.set( "debug", (coll, method, query, doc, options) => {
      if (method === 'ensureIndex') { return }
      console.log(`db.${coll}.${method}(`);
      console.log(JSON.stringify(query, null, 2));
      console.log(')');
      console.log('doc: ' + JSON.stringify(doc, null, 2));
    } );
    */
  } catch(error) {
    logger.error(error);
  }
  logger.debug('MongoDB db initialized at ');
}

export function disconnect() {
  return mongoose.disconnect();
}
