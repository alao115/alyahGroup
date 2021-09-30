/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { success, info, error as Err } from 'consola';
import createError from 'http-errors';

export function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

export function onError({ error, port }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      Err(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Err(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export function onListening({ server }) {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;

  success(`Listening on ${addr.port}`);
}

export function handle404(req, res, next) {
  next(createError.NotFound('Route not found'));
}

export function basicErrorHandler(err, req, res, next) {
  // set locals, only providing error in development

  /* if (res.headersSent) return next(err);

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {}; */

  res.status(err.status || 500);
  err.message = req.app.get('env') === 'development' ? err.message : createError.InternalServerError();
  res.send({ error: { status: err.status, message: err.message } });
}
