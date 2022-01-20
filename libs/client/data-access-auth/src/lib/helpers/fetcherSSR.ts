import { QueryResponse } from './fetcher';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IncomingMessage, ServerResponse } from 'http';
import { getErrorMessage } from '@grp-org/shared';

const SET_COOKIE_HEADER = 'Set-Cookie';

const getError = (error: AxiosError) => {
  if (error.isAxiosError && error.response) {
    return error.response.data;
  }

  return getErrorMessage(error);
};

const refreshTokens = async (req: IncomingMessage, res: ServerResponse) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URI}/refresh_token`,
    undefined,
    {
      withCredentials: true,
    }
  );

  const cookies = response.headers[SET_COOKIE_HEADER];
  req.headers.cookie = cookies;
  res.setHeader(SET_COOKIE_HEADER, cookies);
};

const handleRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
  request: () => Promise<AxiosResponse>
): Promise<AxiosResponse> => {
  try {
    return await request();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any)?.response?.status === 401) {
      console.log(getErrorMessage(error));

      try {
        await refreshTokens(req, res);
        return await request();
      } catch (innerError) {
        console.log(getErrorMessage(innerError));
        getError(innerError as AxiosError);
      }
    }

    throw getError(error as AxiosError);
  }
};

// FIXME: Credentials never reach the server
export const fetcherSSR = async <T>(
  req: IncomingMessage,
  res: ServerResponse,
  url: string
): Promise<QueryResponse<T>> => {
  try {
    const request = () => axios.get(url, { withCredentials: true });
    const { data } = await handleRequest(req, res, request);
    return [null, data];
  } catch (e) {
    return [getErrorMessage(e), null];
  }
};
