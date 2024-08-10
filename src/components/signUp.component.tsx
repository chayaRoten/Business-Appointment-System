import React, { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../context/auth.context';
import '../styles/signUp.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const SignUp: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const signUp = authContext?.signUp;

  if (!signUp) {
    return <div>Error: signUp function is not available.</div>;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, username);
      Swal.fire({
        title: 'Registration successful!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      closeModal();
      navigate('/home');
    } catch (error) {
      console.error('Registration failed', error);
      Swal.fire({
        title: 'Registration failed!',
        text: 'Please check your details and try again.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>הרשמה</h2>
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
        <button type="submit">הרשם</button>
      </form>
    </div>
  );
};

export default SignUp;