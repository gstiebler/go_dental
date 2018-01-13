import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as winston from 'winston';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as MongoInit from './db/init';
import { schema } from './graphql/graphql_controller';

const HTTP_CODES = {
  success : 200,
  notFound : 404,
  error: 500,
};

// load environment variables from .env file in the root of the project (where package.json is)
dotenv.config();

MongoInit.init({
  dbHost: process.env.MONGODB_HOST,
  dbName: process.env.MONGODB_DB_NAME,
  port: process.env.MONGODB_PORT,
});

// import { router as routes } from './routes/index';
// import { router as users } from './routes/users' ;

export let app = express();

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, '../../dist')));

// app.use('/', routes);
// app.use('/users', users);

// log requests
app.use(bodyParser.json());
if (process.env.SHOW_GRAPHQL_QUERIES) {
  app.use((req, res, next) => {
    winston.info(req.body);
    next();
  });
}

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const err = new Error('Not Found');
  (err as any).status = HTTP_CODES.notFound;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || HTTP_CODES.error);
    res.render('error', {
      error: err,
      message: err.message,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || HTTP_CODES.error);
  res.render('error', {
    error: {},
    message: err.message,
  });
});

process.on('uncaughtException', (err) => {
  winston.error(err.stack);
});

console.log('App initialized');

export default app;
