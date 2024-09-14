import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import SignIn from './signIn.component';
import SignUp from './signUp.component';
import '../styles/header.style.css';
import logo from '../assets/logo.png';
import '../styles/global.css';



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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const isAdminRoute = location.pathname.includes('/admin');

  useEffect(() => {
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString ? JSON.parse(tokenString) : null;

    if (token) {
      const userData = decodeToken(token);
      setUser(userData);
    } else {
      setUser(null); // Ensure user state is reset if there's no token
    }
  }, [user]);

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

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    closeModal();
  };

  const handleSignUpSuccess = (userData: any) => {
    setUser(userData);
    closeModal();
  };


  return (
    <>
      <header>
        <nav className="navbar">
          <a href="/home"><img src={logo} alt="KEINAN Architecture & Interior Design" /></a>
          <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
            {!user ? (
              <li>
                <FontAwesomeIcon icon={faUserCircle} className="user-icon" onClick={openModal} />
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  className="modal"
                  overlayClassName="modal-overlay"
                  shouldCloseOnOverlayClick={true}
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
                      <SignIn onSuccess={handleLoginSuccess} closeModal={closeModal} />
                    ) : (
                      <SignUp onSuccess={handleSignUpSuccess} closeModal={closeModal} />
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

            {user && user.role === 'admin' && isAdminRoute && (
              <>
                <li><Link to="/admin/business-details">פרטי עסק</Link></li>
                <li><Link to="/admin/business-services">שירותים</Link></li>
                <li><Link to="/admin/business-meetings">הפגישות שלי</Link></li>
                <li><Link to="/admin/users">הלקוחות שלי</Link></li>
              </>
            )}

            {!isAdminRoute && (
              <>
                <li><Link to="/home">בית</Link></li>
                <li><Link to="/about">אודות</Link></li>
                <li><Link to="/projects">פרוייקטים</Link></li>
                <li><Link to="/meetings">צור קשר</Link></li>
                <li><Link to="/my-meetings">הפגישות שלי</Link></li>
              </>
            )}

          </ul>
        </nav>
      </header >

      <Outlet />
    </>
  );
};

export default Navbar;

















































// import React, { useEffect, useState } from 'react';
// import { AppBar, Toolbar, IconButton, Menu, MenuItem, Modal, Box, Button, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import SignIn from './signIn.component';
// import SignUp from './signUp.component';
// import logo from '../assets/logo.png';

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

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const navigate = useNavigate();

//   const isAdminRoute = location.pathname.includes('/admin');

//   useEffect(() => {
//     const tokenString = localStorage.getItem('jwtToken');
//     const token = tokenString ? JSON.parse(tokenString) : null;

//     if (token) {
//       const userData = decodeToken(token);
//       setUser(userData);
//     }
//   }, []);

//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem('jwtToken');
//     setUser(null);
//     navigate('/home');
//     handleMenuClose();
//   };

//   const handleLoginSuccess = (userData: any) => {
//     setUser(userData);
//     setModalIsOpen(false);
//   };

//   const handleSignUpSuccess = (userData: any) => {
//     setUser(userData);
//     setModalIsOpen(false);
//   };

//   return (
//     <>
//       {/* יישור כללי של כל הניווט לימין (מימין לשמאל) */}
//       <AppBar position="fixed" sx={{ bgcolor: '#800020', direction: 'rtl' }}> {/* צבע בורדו ויישור לימין */}
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           {/* תיבה שמיישרת את התוכן לימין */}
//           <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}> {/* יישור לימין */}
//             <Link to="/home">
//               <img src={logo} alt="Logo" style={{ height: '40px', marginLeft: '10px' }} />
//             </Link>
//             <Box sx={{ display: 'flex', mr: 2 }}>
//               {isAdminRoute ? (
//                 <>
//                   <Button color="inherit" component={Link} to="/admin/business-details">פרטי עסק</Button>
//                   <Button color="inherit" component={Link} to="/admin/business-services">שירותים</Button>
//                   <Button color="inherit" component={Link} to="/admin/business-meetings">הפגישות שלי</Button>
//                   <Button color="inherit" component={Link} to="/admin/users">הלקוחות שלי</Button>
//                 </>
//               ) : (
//                 <>
//                   <Button color="inherit" component={Link} to="/home">בית</Button>
//                   <Button color="inherit" component={Link} to="/about">אודות</Button>
//                   <Button color="inherit" component={Link} to="/projects">פרוייקטים</Button>
//                   <Button color="inherit" component={Link} to="/meetings">צור קשר</Button>
//                   <Button color="inherit" component={Link} to="/my-meetings">הפגישות שלי</Button>
//                 </>
//               )}
//             </Box>
//           </Box>
//           {user ? (
//             <>
//               <IconButton color="inherit" onClick={handleMenuOpen}>
//                 <AccountCircle />
//               </IconButton>
//               <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//               >
//                 <MenuItem onClick={handleSignOut}>התנתק</MenuItem>
//               </Menu>
//             </>
//           ) : (
//             <Button color="inherit" onClick={() => setModalIsOpen(true)}>התחבר / הרשם</Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Modal
//         open={modalIsOpen}
//         onClose={() => setModalIsOpen(false)}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 1, textAlign: 'center' }}>
//           <Button onClick={() => setActiveTab('login')} variant={activeTab === 'login' ? 'contained' : 'outlined'} sx={{ mr: 1 }}>התחבר</Button>
//           <Button onClick={() => setActiveTab('register')} variant={activeTab === 'register' ? 'contained' : 'outlined'}>הרשם</Button>
//           {activeTab === 'login' ? (
//             <SignIn onSuccess={handleLoginSuccess} />
//           ) : (
//             <SignUp onSuccess={handleSignUpSuccess} />
//           )}
//         </Box>
//       </Modal>

//       <Outlet />
//     </>
//   );
// };

// export default Navbar;
