import { useEffect } from 'react';

export const useGetRefreshToken = (setToken: (newToken: string) => void) => {
  const apiUrl = process.env['NEXT_PUBLIC_API_URI'];

  useEffect(() => {
    fetch(`${apiUrl}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (res) => {
        const { ok, accessToken } = await res.json();
        if (ok) setToken(accessToken);

        return accessToken;
      })
      .catch((e) => {
        console.error(e);
      });
  }, [apiUrl, setToken]);
};
