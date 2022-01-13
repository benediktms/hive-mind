import { useProvideAuth } from '../hooks/useProvideAuth';

export const AuthProvider: React.FC = ({ children }) => {
  const { AuthContext, token, setToken } = useProvideAuth();

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
