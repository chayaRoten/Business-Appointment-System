import React, { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../context/auth.context';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { signIn } = authContext;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password, username);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed! ' + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>User Name:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default SignIn;
