import { validateSchema } from '@hive-mind/shared';
import React, { ReactNode } from 'react';
import { z, ZodType } from 'zod';

export function addTextFieldError<S extends ZodType, T extends z.infer<S>>(
  schema: S,
  input: T
): {
  error: boolean;
  helperText: string | ReactNode | undefined;
} {
  const issues = validateSchema(schema, input).errors;

  if (!issues.length) {
    return {
      error: false,
      helperText: undefined,
    };
  }

  return {
    error: true,
    helperText: (
      <>
        {issues.map((val, i) => (
          <>
            <span key={i}>{val}</span>
            <br />
          </>
        ))}
      </>
    ),
  };
}
