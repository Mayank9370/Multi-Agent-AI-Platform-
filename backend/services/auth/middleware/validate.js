/**
 * @file middleware/validate.js
 * @description Zod-based request body validation middleware factory.
 *
 * Usage:
 *   import { validate } from '../middleware/validate.js';
 *   import { z } from 'zod';
 *
 *   const schema = z.object({ credential: z.string().min(1) });
 *   router.post('/google', validate(schema), controller);
 *
 * On validation failure, calls next(ValidationError) with a structured array
 * of field-level error messages — caught by the central error handler.
 */

import { z } from 'zod';
import { ValidationError } from '../../../shared/errors.js';

/**
 * Returns an Express middleware that validates `req.body` against the given Zod schema.
 *
 * @param {import('zod').ZodSchema} schema - Zod schema to validate against.
 * @returns {import('express').RequestHandler}
 */
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map(
      (e) => `${e.path.join('.')}: ${e.message}`
    );
    return next(new ValidationError('Request validation failed.', errors));
  }

  // Replace req.body with the parsed/coerced output — ensures downstream
  // code gets the cleaned data (trimmed strings, type-coerced numbers, etc.)
  req.body = result.data;
  next();
};

// ─── Reusable Zod schemas ────────────────────────────────────────────────────

/** Validates POST /auth/google body. */
export const googleLoginSchema = z.object({
  credential: z
    .string({ required_error: 'Google credential is required.' })
    .min(1, 'Google credential cannot be empty.'),
});
