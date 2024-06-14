

import { useState } from 'react';
import '../styles/header.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const AdminNavbar = () => {
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
          <li><a href="#">פרטי עסק</a></li>
          <li><a href="#">שירותים</a></li>
          <li><a href="#">רשימת הזמנות</a></li>
          <li><a href="#">רשימת לקוחות</a></li>
        </ul>
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

export default AdminNavbar;
