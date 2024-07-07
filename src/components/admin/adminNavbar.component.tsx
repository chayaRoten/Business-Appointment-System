import { useState } from 'react';
import '../../styles/header.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import { Link, Outlet } from 'react-router-dom';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <li><Link to="/signin">התחבר</Link></li>
          <li><Link to="/signup">הרשם</Link></li>
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
