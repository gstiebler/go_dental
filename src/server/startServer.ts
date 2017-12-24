import app from './app';
import * as winston from 'winston';
import * as http from 'http';

const port = process.env.SERVER_PORT;

export default function() {
  const httpServer = http.createServer(app);

  httpServer.listen(port, () => {
    winston.info('Server listening on port ' + port);
  });

  return httpServer;
}

