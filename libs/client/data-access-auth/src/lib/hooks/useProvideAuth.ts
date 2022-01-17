import { User } from '@grp-org/client-data-access-gql';
import axios from 'axios';
import { createContext, useEffect, useRef, useState } from 'react';

export type Token = string | null;

type AuthContext = {
  token: Token;
  setToken: (newToken: Token) => void;
};

export const useProvideAuth = () => {
  const [token, setToken] = useState<Token>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const mounted = useRef(false);

  const AuthContext = createContext<AuthContext>({
    token,
    setToken,
  });

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3001';

    axios
      .post(`${apiUrl}/refresh_token`, undefined, {
        withCredentials: true,
      })
      .then(async (res) => {
        const { ok, accessToken } = res.data;

        if (ok && !!accessToken.length && !mounted.current) {
          setToken(accessToken);
        }
      })
      .catch((e) => {
        console.error(e);
      });

    return () => {
      mounted.current = true;
    };
  }, []);

  const isAuthenticated = () => {
    const isTrue = token !== null && !!currentUser;
    console.log('isAuthenticated', isTrue);
    return isTrue;
  };

  const getAuthHeaders = () => {
    if (!token) return null;

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  return {
    AuthContext,
    token,
    setToken,
    currentUser,
    setCurrentUser,
    isAuthenticated,
    getAuthHeaders,
  };
};
