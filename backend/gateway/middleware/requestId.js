/**
 * @file middleware/requestId.js
 * @description Assigns a unique request ID to every incoming request.
 *
 * Generated at the gateway and forwarded as `x-request-id` to all downstream
 * services. Downstream services read this header and include it in their log
 * lines, making it possible to trace a single failed request across multiple
 * services (auth, chat, future services) by grepping one ID.
 *
 * If the client already sends an `x-request-id` (e.g. from a CLI tool or
 * testing harness), we honour it rather than overwriting — this allows
 * end-to-end tracing from the client side when needed.
 */

import { randomUUID } from 'crypto';

/**
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const requestId = (req, res, next) => {
  req.id = req.headers['x-request-id'] || randomUUID();
  // Reflect the ID back in the response so clients can correlate logs.
  res.setHeader('x-request-id', req.id);
  // Forward to downstream via req.headers so express-http-proxy passes it along.
  req.headers['x-request-id'] = req.id;
  next();
};

export default requestId;