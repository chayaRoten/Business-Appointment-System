import { AuthContext } from "./auth.context";

export const AuthProvider: React.FC = ({ children }) => {
    const signIn = async (email: string, password: string, username: string) => {
      // Implement your sign-in logic here
    };
  
    const signUp = async (email: string, password: string, username: string) => {
      // Implement your sign-up logic here
    };
  
    return (
      <AuthContext.Provider value={{ signIn, signUp }}>
        {children}
      </AuthContext.Provider>
    );
  };
  