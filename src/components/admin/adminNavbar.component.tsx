import { useEffect, useState } from 'react';
import '../../styles/header.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import { Link, Outlet } from 'react-router-dom';


const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to decode token', e);
    return null;
  }
};



const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  

  useEffect(() => {
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString ? JSON.parse(tokenString) : null;
  
    if (token) {
      const userData = decodeToken(token);
      setUser(userData);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <header>
      <nav className="navbar">
        <div className="logo">
          <a href="#"><img src={logo} alt="KEINAN Architecture & Interior Design" /></a>
        </div>
        <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
        <li><Link to="/admin/business-detail">פרטי עסק</Link></li>
        <li><Link to="/admin/business-services">שירותים</Link></li>
        <li><Link to="/admin/business-meetings">רשימת פגישות</Link></li>
        <li><Link to="/admin/users">רשימת לקוחות</Link></li>
        {!user ? (
              <> </>
            ) : (
              <li>שלום {user.username}, {user.role === 'admin' ? 'מנהל' : 'משתמש רגיל'}</li>
            )}
        </ul>
        <div className="language-switch">
          <button>He</button>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </nav>
    </header>
    <Outlet />
    </>
  );
};

export default AdminNavbar;
