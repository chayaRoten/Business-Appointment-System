import { useEffect, useState } from 'react';
import '../../styles/header.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/logo.png';
import { Link, Outlet } from 'react-router-dom';
// import i18n from 'i18next';
// import { initReactI18next, useTranslation } from 'react-i18next';
import i18n from '../../i18n';

// // Initialize i18next
// i18n
//   .use(initReactI18next)
//   .init({
//     // resources,
//     lng: 'en', // default language
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false,
//     },
//   });



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

const UserNavbar = () => {
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

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
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
            {!user ? (
              <>
                <li><Link to="/signin">התחבר</Link></li>
                <li><Link to="/signup">הרשם</Link></li>
              </>
            ) : (
              <li>שלום {user.username}, {user.role === 'admin' ? 'מנהל' : 'משתמש רגיל'}</li>
            )}
          </ul>
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
          <div className="language-switch">
            <select onChange={handleLanguageChange} defaultValue={i18n.language}>
              <option value="en">English</option>
              <option value="he">עברית</option>
              <option value="ar">عربي</option>
            </select>
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
