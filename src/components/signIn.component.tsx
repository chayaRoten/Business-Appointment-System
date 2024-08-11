import React, { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/alerts.style.css';
import '../styles/signIn.style.css';
import '../styles/global.css';


interface SignInProps {
  onSuccess: (userData: any) => void;
  closeModal: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSuccess, closeModal }) => {
  const [credentials, setCredentials] = useState({email:'',  password: '', username: '' });
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();


  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const signIn = authContext?.signIn;

  if (!signIn) {
    return <div>Error: signIn function is not available.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password, username);
      const response = await signIn(email, password, username);
      if (response.success) {
        onSuccess(response.userData);
      }
      Swal.fire({
        title: 'Login successful!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      closeModal();
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
      Swal.fire({
        title: 'Login failed!',
        text: 'Please check your credentials and try again.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>התחבר</h2>
        <div className="form-group">
          <label>שם משתמש</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>מייל</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>סיסמה</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">התחבר</button>
      </form>
    </div>
  );
};

export default SignIn;