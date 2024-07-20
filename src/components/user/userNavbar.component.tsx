import { useEffect, useState } from 'react';
import '../../styles/header.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/logo.png';
import { Link, Outlet } from 'react-router-dom';


const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString ? JSON.parse(tokenString) : null;

    if (token) {
      const userData = {
        name: token.name,
        role: token.role
      };
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
            <li><a href="/home">בית</a></li>
            <li><Link to="/about">אודות</Link></li>
            <li><Link to="/projects">פרוייקטים</Link></li>
            <li><Link to="/meetings">צור קשר</Link></li>
            {/* <li><Link to="/signin">התחבר</Link></li> */}
            {/* <li><Link to="/signup">הרשם</Link></li> */}
            {!user ? (
              <>
                <li><Link to="/signin">התחבר</Link></li>
                <li><Link to="/signup">הרשם</Link></li>
              </>
            ) : (
              <li>שלום {user.name}, {user.role === 'admin' ? 'מנהל' : 'משתמש רגיל'}</li>
            )}
          </ul>
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
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

export default UserNavbar;
