import { createContext, useState } from 'react';
import { AuthContextType, AuthProviderProps } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const signIn = async (email: string, password: string, username: string) => {
        try {
            const response = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username })
            });

            if (response.ok) {
                const data = await response.text();
                localStorage.setItem("jwtToken" ,JSON.stringify(data)) 
                const parsedData = JSON.parse(atob(data.split('.')[1]));
                setUser(parsedData.user);
                
                
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    };

    const signUp = async (email: string, password: string, username: string) => {
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username })
            });

            if (response.ok) {
                const data = await response.text();
                localStorage.setItem("jwtToken" ,JSON.stringify(data)) 
                const parsedData = JSON.parse(atob(data.split('.')[1]));
                setUser(parsedData.user);
                
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};
