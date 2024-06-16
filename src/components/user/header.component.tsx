import { useState } from 'react';
import '../../styles/header.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <a href="#"><img src={logo} alt="KEINAN Architecture & Interior Design" /></a>
        </div>
        <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
          <li><a href="#">בית</a></li>
          <li><a href="#">אודות</a></li>
          <li><a href="#">פרוייקטים</a></li>
          <li><a href="#">ממליצים</a></li>
          <li><a href="#">צור קשר</a></li>
          <li><a href="#">קביעת פגישה</a></li>
          <li><Link to="/signin">התחבר</Link></li>
          <li><Link to="/signup">הרשם</Link></li>
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
  );
};

export default Navbar;
