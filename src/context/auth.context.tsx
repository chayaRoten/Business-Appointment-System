import { createContext, useState } from 'react';
import { AuthContextType, AuthProviderProps } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

// Create an AuthContext with an initial value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // State to store the current user
    const [user, setUser] = useState<User | null>(null);

    // Function to handle user sign-in
    const signIn = async (email: string, password: string, username: string): Promise<{ success: boolean; userData?: unknown }> => {
        try {
            // Send a POST request to the server to sign in
            const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
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
    const signUp = async (email: string, password: string, username: string): Promise<{ success: boolean; userData?: unknown; error?: string }> => {
        try {
            // Send a POST request to the server to sign up            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username }) // Send email, password, and username in the body
            });

            const data = await response.text(); // Get the response text

            if (response.ok) {
                if (data === "User Already Exist. Please Login") {
                    throw new Error('User already exists. Please login instead.');
                }

                // If the user is successfully registered, save the JWT token
                localStorage.setItem("jwtToken", JSON.stringify(data));
                const parsedData = JSON.parse(atob(data.split('.')[1]));

                // Set the user state with the decoded user information
                setUser(parsedData.user);

                // Return a success response with user data
                return { success: true, userData: parsedData.user };
            } else if (response.status === 409) {
                return { success: false, error: 'User already exists. Please login instead.' };
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            return { success: false, error: (error as Error).message };
        }
    };

    return (
        // Provide the user, signIn, and signUp functions via the AuthContext
        <AuthContext.Provider value={{ user, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};