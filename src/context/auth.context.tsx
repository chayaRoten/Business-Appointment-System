// import { createContext, useState } from 'react';
// import { AuthContextType, AuthProviderProps } from '../interfaces/auth.interface';
// import { User } from '../interfaces/user.interface';

// // Create an AuthContext with an initial value of undefined
// export const AuthContext = createContext<AuthContextType | undefined>(undefined);


// export const AuthProvider = ({ children }: AuthProviderProps) => {
//     const [user, setUser] = useState<User | null>(null);

//     const signIn = async (email: string, password: string, username: string) => {
//         try {
//             const response = await fetch('http://localhost:3000/signin', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email, password, username })
//             });

//             if (response.ok) {
//                 const data = await response.text();
//                 localStorage.setItem("jwtToken" ,JSON.stringify(data)) 
//                 const parsedData = JSON.parse(atob(data.split('.')[1]));
//                 setUser(parsedData.user);
//                 return { success: true, userData: data };
//             } else {
//                 throw new Error('Login failed');
//             }
//         } catch (error) {
//             console.error('Error during login:', error);
//             return { success: false };
//         }
//     };

//     const signUp = async (email: string, password: string, username: string) => {
//         try {
//             const response = await fetch('http://localhost:3000/signup', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email, password, username })
//             });

//             if (response.ok) {
//                 const data = await response.text();
//                 localStorage.setItem("jwtToken" ,JSON.stringify(data)) 
//                 const parsedData = JSON.parse(atob(data.split('.')[1]));
//                 setUser(parsedData.user);
//                 return { success: true, userData: data };
//             } else {
//                 throw new Error('Registration failed');
//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
//             return { success: false };
//         }
//     };

//     return (
//         <AuthContext.Provider value={{ user, signIn, signUp }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };





import { createContext, useState } from 'react';
import { AuthContextType, AuthProviderProps } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

// Create an AuthContext with an initial value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    // State to store the current user
    const [user, setUser] = useState<User | null>(null);

    // Function to handle user sign-in
    const signIn = async (email: string, password: string, username: string) => {
        try {
            // Send a POST request to the server to sign in
            const response = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username }) // Send email, password, and username in the body
            });

            if (response.ok) {
                // Parse the response data and decode the JWT token
                const data = await response.text();
                localStorage.setItem("jwtToken", JSON.stringify(data));
                const parsedData = JSON.parse(atob(data.split('.')[1]));

                // Set the user state with the decoded user information
                setUser(parsedData.user);

                // Return a success response with user data
                return { success: true, userData: parsedData.user };
            } else {
                // Handle failed login attempts
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            return { success: false };
        }
    };

    // Function to handle user sign-up
    const signUp = async (email: string, password: string, username: string) => {
        try {
            // Send a POST request to the server to sign up
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username }) // Send email, password, and username in the body
            });

            if (response.ok) {
                // Parse the response data and decode the JWT token
                const data = await response.text();
                localStorage.setItem("jwtToken", JSON.stringify(data));
                const parsedData = JSON.parse(atob(data.split('.')[1]));

                // Set the user state with the decoded user information
                setUser(parsedData.user);

                // Return a success response with user data
                return { success: true, userData: parsedData.user };
            } else {
                // Handle failed registration attempts
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            return { success: false };
        }
    };

    return (
        // Provide the user, signIn, and signUp functions via the AuthContext
        <AuthContext.Provider value={{ user, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};
