import axios, { AxiosError, AxiosResponse } from 'axios';

export type QueryResponse<T> = [error: string | null, data: T | null];

const getError = (error: AxiosError) => {
  if (error.isAxiosError && error.response) {
    return error.response.data;
  }

  return 'Unexpected error';
};

const refreshTokens = async () => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URI}/refresh_token`,
    undefined,
    { withCredentials: true }
  );
};

const handleRequest = async (
  request: () => Promise<AxiosResponse>
): Promise<AxiosResponse> => {
  try {
    return await request();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any)?.response?.status === 401) {
      try {
        await refreshTokens();
        return await request();
      } catch (innerError) {
        getError(innerError as AxiosError);
      }
    }

    throw getError(error as AxiosError);
  }
};

export const fetcher = async <T>(url: string): Promise<QueryResponse<T>> => {
  try {
    const request = () => axios.get(url, { withCredentials: true });
    const { data } = await handleRequest(request);
    return [null, data];
  } catch (e) {
    const error = e as Error;
    return [error.message, null];
  }
};
