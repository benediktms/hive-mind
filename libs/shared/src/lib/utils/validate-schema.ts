import { z, ZodType, ZodError } from 'zod';

export function validateSchema<S extends ZodType, T extends z.infer<S>>(
  schema: S,
  input: T
): { data: T; errors: string[] } {
  try {
    schema.parse(input);
  } catch (e) {
    const errors = (e as ZodError).issues.map(err => err.message);

    return { data: input, errors };
  }

  return { data: input, errors: [] };
}
