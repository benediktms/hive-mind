// from https://stackoverflow.com/questions/68240884/error-object-inside-catch-is-of-type-unkown

interface INormalizedError {
  /**
   * Original error.
   */
  err: unknown;

  /**
   * Is error instance?
   */
  isError: boolean;

  /**
   * Error object.
   */
  error?: Error;

  /**
   * Call stack.
   */
  stack?: Error['stack'];

  /**
   * Error message.
   */
  message: string;

  toString(): string;
}

/**
 * Normalize error.
 *
 * @param err Error instance.
 * @returns Normalized error object.
 */
export function normalizeError(err: unknown): Readonly<INormalizedError> {
  const result: INormalizedError = {
    err,
    message: '',
    isError: false,
    toString() {
      return this.message;
    },
  };

  if (err instanceof Error) {
    result.error = err;
    result.message = err.message;
    result.stack = err.stack;
    result.isError = true;
    result.toString = () => err.toString();
  } else if (typeof err === 'string') {
    result.error = new Error(err);
    result.message = err;
    result.stack = result.error.stack;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const aErr = err as any;

    if (typeof err === 'object') {
      result.message = aErr?.message ? aErr.message : String(aErr);
      result.toString = () => {
        const m =
          typeof err?.toString === 'function' ? err.toString() : result.message;
        return m === '[object Object]' ? result.message : m;
      };
    } else if (typeof err === 'function') {
      return normalizeError(err());
    } else {
      result.message = String(`[${typeof err}] ${aErr}`);
    }

    result.error = new Error(result.message);
    result.stack = aErr?.stack ? aErr.stack : result.error.stack;
  }

  return result;
}
