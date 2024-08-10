/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from 'react';
// import '../../styles/header.style.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
// import { faYoutube, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import logo from '../../assets/logo.png';
// import { Link, Outlet } from 'react-router-dom';
// // import i18n from 'i18next';ש
// // import { initReactI18next, useTranslation } from 'react-i18next';
// import i18n from '../../i18n';

// // // Initialize i18next
// // i18n
// //   .use(initReactI18next)
// //   .init({
// //     // resources,
// //     lng: 'en', // default language
// //     fallbackLng: 'en',
// //     interpolation: {
// //       escapeValue: false,
// //     },
// //   });



// const decodeToken = (token) => {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
//   } catch (e) {
//     console.error('Failed to decode token', e);
//     return null;
//   }
// };

// const UserNavbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const tokenString = localStorage.getItem('jwtToken');
//     const token = tokenString ? JSON.parse(tokenString) : null;

//     if (token) {
//       const userData = decodeToken(token);
//       setUser(userData);
//     }
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLanguageChange = (e) => {
//     i18n.changeLanguage(e.target.value);
//   };

//   return (
//     <>
//       <header>
//         <nav className="navbar">
//           <div className="logo">
//             <a href="#"><img src={logo} alt="KEINAN Architecture & Interior Design" /></a>
//           </div>
//           <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
//             <li><a href="/home">בית</a></li>
//             <li><Link to="/about">אודות</Link></li>
//             <li><Link to="/projects">פרוייקטים</Link></li>
//             <li><Link to="/meetings">צור קשר</Link></li>
//             {!user ? (
//               <>
//                 <li><Link to="/signin">התחבר</Link></li>
//                 <li><Link to="/signup">הרשם</Link></li>
//               </>
//             ) : (
//               <li>שלום {user.username}, {user.role === 'admin' ? 'מנהל' : 'משתמש רגיל'}</li>
//             )}
//           </ul>
//           <div className="social-icons">
//             <a href="#"><FontAwesomeIcon icon={faEnvelope} /></a>
//             <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
//             <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
//             <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
//           </div>
//           <div className="language-switch">
//             <select onChange={handleLanguageChange} defaultValue={i18n.language}>
//               <option value="en">English</option>
//               <option value="he">עברית</option>
//               <option value="ar">عربي</option>
//             </select>
//           </div>
//           <div className="hamburger" onClick={toggleMenu}>
//             <FontAwesomeIcon icon={faBars} />
//           </div>
//         </nav>
//       </header>
//       <Outlet />
//     </>
//   );
// };

// export default UserNavbar;



















// import { useEffect, useState, useCallback } from 'react';
// import '../../styles/header.style.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import logo from '../../assets/logo.png';
// import { Link, Outlet } from 'react-router-dom';
// // import i18n from '../../i18n';
// import Modal from 'react-modal';

// // Initialize Modal
// Modal.setAppElement('#root');

// const decodeToken = (token: string) => {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
//   } catch (e) {
//     console.error('Failed to decode token', e);
//     return null;
//   }
// };

// const UserNavbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

//   useEffect(() => {
//     const tokenString = localStorage.getItem('jwtToken');
//     const token = tokenString ? JSON.parse(tokenString) : null;

//     if (token) {
//       const userData = decodeToken(token);
//       setUser(userData);
//     }
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const openModal = () => {
//     setModalIsOpen(true);
//     document.addEventListener('keydown', handleKeyDown);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     document.removeEventListener('keydown', handleKeyDown);
//   };

//   const handleKeyDown = useCallback((event: KeyboardEvent) => {
//     if (event.key) {
//       closeModal();
//     }
//   }, []);

//   // const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//   //   i18n.changeLanguage(e.target.value);
//   // };

//   return (
//     <>
//       <header>
//         <nav className="navbar">
//           <div className="logo">
//             <a href="#"><img src={logo} alt="KEINAN Architecture & Interior Design" /></a>
//           </div>
//           <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
//             <li><a href="/home">בית</a></li>
//             <li><Link to="/about">אודות</Link></li>
//             <li><Link to="/projects">פרוייקטים</Link></li>
//             <li><Link to="/meetings">צור קשר</Link></li>
//             {!user ? (
//               <li>
//                 <FontAwesomeIcon icon={faUserCircle} className="user-icon" onClick={openModal} />
//                 <Modal
//                   isOpen={modalIsOpen}
//                   onRequestClose={closeModal}
//                   className="modal"
//                   overlayClassName="modal-overlay"
//                 >
//                   <button onClick={closeModal} className="close-button">×</button>
//                   <div className="tabs">
//                     <button
//                       className={`tab ${activeTab === 'login' ? 'active' : ''}`}
//                       onClick={() => setActiveTab('login')}
//                     >
//                       התחבר
//                     </button>
//                     <button
//                       className={`tab ${activeTab === 'register' ? 'active' : ''}`}
//                       onClick={() => setActiveTab('register')}
//                     >
//                       הרשם
//                     </button>
//                   </div>
//                   <div className="tab-content">
//                     {activeTab === 'login' ? (
//                       <div className="login-form">
//                         <h2>התחברות</h2>
//                         {/* Form fields for login */}
//                       </div>
//                     ) : (
//                       <div className="register-form">
//                         <h2>הרשמה</h2>
//                         {/* Form fields for registration */}
//                       </div>
//                     )}
//                   </div>
//                 </Modal>
//               </li>
//             ) : (
//               <li>שלום {user.username}, {user.role === 'admin' ? 'מנהל' : 'משתמש רגיל'}</li>
//             )}
//           </ul>
//           <div className="hamburger" onClick={toggleMenu}>
//             <FontAwesomeIcon icon={faBars} />
//           </div>
//         </nav>
//       </header>

//       <Outlet />
//     </>
//   );
// };

// export default UserNavbar;
























































import React, { useEffect, useState, useCallback, useContext } from 'react';
import '../../styles/header.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { AuthContext } from '../../context/auth.context';
import SignIn from '../signIn.component';
import SignUp from '../signUp.component';

// Initialize Modalsi
Modal.setAppElement('#root');

const decodeToken = (token: string) => {
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
  const [user, setUser] = useState<any>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

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

  const openModal = () => {
    setModalIsOpen(true);
    document.addEventListener('keydown', handleKeyDown);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    navigate('/home');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  return (
    <>
      <header>
        <nav className="navbar">
          {/* <div className="logo"> */}
          <a href="#"><img src={logo} alt="KEINAN Architecture & Interior Design" /></a>
          {/* </div> */}
          <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
            <li><Link to="/home">בית</Link></li>
            <li><Link to="/about">אודות</Link></li>
            <li><Link to="/projects">פרוייקטים</Link></li>
            <li><Link to="/meetings">צור קשר</Link></li>
            {!user ? (
              <li>
                <FontAwesomeIcon icon={faUserCircle} className="user-icon" onClick={openModal} />
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  className="modal"
                  overlayClassName="modal-overlay"
                >
                  <button onClick={closeModal} className="close-button">×</button>
                  <div className="tabs">
                    <button
                      className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                      onClick={() => setActiveTab('login')}
                    >
                      התחבר
                    </button>
                    <button
                      className={`tab ${activeTab === 'register' ? 'active' : ''}`}
                      onClick={() => setActiveTab('register')}
                    >
                      הרשם
                    </button>
                  </div>
                  <div className="tab-content">
                    {activeTab === 'login' ? (
                      <SignIn closeModal={closeModal} />
                    ) : (
                      <SignUp closeModal={closeModal} />
                    )}
                  </div>
                </Modal>
              </li>
            ) : (
              <li>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="user-icon"
                  onClick={openModal}
                />
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  className="modal"
                  overlayClassName="modal-overlay"
                >
                  <button onClick={closeModal} className="close-button">×</button>
                  <div className="modal-content">
                    <h2>שלום {user.username}</h2>
                    <p>תפקידך: {user.role === 'admin' ? 'מנהל' : 'משתמש רגיל'}</p>
                    <button onClick={handleSignOut} className="logout-button">התנתק</button>
                  </div>
                </Modal>
              </li>
            )}
          </ul>
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
