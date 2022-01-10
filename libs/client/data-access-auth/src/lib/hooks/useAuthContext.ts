import { useContext } from 'react';
import { AuthContext } from '../components/AuthProvider';

export const useAuthContext = () => {
  return useContext(AuthContext);
};
