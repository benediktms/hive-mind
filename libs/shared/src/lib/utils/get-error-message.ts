import dayjs from 'dayjs';

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(
  error: unknown,
  options: { addTimeStamp: boolean } = { addTimeStamp: false }
) {
  if (options.addTimeStamp) {
    const formatedDate = dayjs().format('DD-MM-YYYY HH:mm:ss:SSS');

    return `${formatedDate} - ${toErrorWithMessage(error).message}`;
  }

  return toErrorWithMessage(error).message;
}
