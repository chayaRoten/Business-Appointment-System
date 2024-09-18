// import { AuthContext } from "./auth.context";
// import React, { ReactNode } from 'react';

// interface AuthProviderProps {
//     children: ReactNode; // Define the children prop
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//     const signIn = async (email: string, password: string, username: string): Promise<{ success: boolean; userData?: any }> => {
//         console.log(`Signing in with email: ${email}, password: ${password}, username: ${username}`);
//         // Implement your sign-in logic here
//         // For example, send a request to your API
//         return { success: true }; // Placeholder return
//     };
  
//     const signUp = async (email: string, password: string, username: string): Promise<{ success: boolean; userData?: any }> => {
//         console.log(`Signing up with email: ${email}, password: ${password}, username: ${username}`);
//         // Implement your sign-up logic here
//         // For example, send a request to your API
//         return { success: true }; // Placeholder return
//     };
  
//     return (
//         <AuthContext.Provider value={{ signIn, signUp }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
