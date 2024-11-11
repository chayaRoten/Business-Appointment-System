// import { useEffect, useState, useCallback } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import Modal from 'react-modal';
// import SignIn from './signIn.component';
// import SignUp from './signUp.component';
// import '../styles/header.style.css';
// import logo from '../assets/logo.png';
// import '../styles/global.css';



// // Initialize Modalsi
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

// const Navbar = () => {
//   const [isOpen] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
//   const navigate = useNavigate();

//   const isAdminRoute = location.pathname.includes('/admin');

//   // Define handleKeyDown first
//   const handleKeyDown = useCallback((event: KeyboardEvent) => {
//     if (event.key === 'Escape') {
//       setModalIsOpen(false);
//     }
//   }, []);

//   // Define closeModal next
//   const closeModal = useCallback(() => {
//     setModalIsOpen(false);
//   }, []);


//   useEffect(() => {
//     const tokenString = localStorage.getItem('jwtToken');
//     const token = tokenString ? JSON.parse(tokenString) : null;

//     if (token) {
//       const userData = decodeToken(token);
//       setUser(userData);
//     } else {
//       setUser(null);
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [localStorage.getItem('jwtToken')]);


//   const openModal = () => {
//     setModalIsOpen(true);
//     document.addEventListener('keydown', handleKeyDown);
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem('jwtToken');
//     setUser(null);
//     navigate('/home');
//   };

//   const handleLoginSuccess = (userData: unknown) => {
//     setUser(userData as User);
//     closeModal();
//     navigate('/home');
//   };

//   const handleSignUpSuccess = (userData: unknown) => {
//     setUser(userData as User);
//     closeModal();
//   };


//   return (
//     <>
//       <header>
//         <nav className="navbar">
//           <a href="/home"><img src={logo} alt="KEINAN Architecture & Interior Design" /></a>
//           <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
//             {!user ? (
//               <li>
//                 <FontAwesomeIcon icon={faUserCircle} className="user-icon" onClick={openModal} />
//                 <Modal
//                   isOpen={modalIsOpen}
//                   onRequestClose={closeModal}
//                   className="modal"
//                   overlayClassName="modal-overlay"
//                   shouldCloseOnOverlayClick={true}
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
//                       <SignIn onSuccess={handleLoginSuccess} closeModal={closeModal} />
//                     ) : (
//                       <SignUp onSuccess={handleSignUpSuccess} closeModal={closeModal} />
//                     )}
//                   </div>
//                 </Modal>
//               </li>
//             ) : (
//               <li>
//                 <FontAwesomeIcon
//                   icon={faUserCircle}
//                   className="user-icon"
//                   onClick={openModal}
//                 />
//                 <Modal
//                   isOpen={modalIsOpen}
//                   onRequestClose={closeModal}
//                   className="modal"
//                   overlayClassName="modal-overlay"
//                 >
//                   <button onClick={closeModal} className="close-button">×</button>
//                   <div className="modal-content">
//                     <h2>שלום {user.username}</h2>
//                     <p>תפקידך: {user.role === 'admin' ? 'מנהל' : 'משתמש רגיל'}</p>
//                     <button onClick={handleSignOut} className="logout-button">התנתק</button>
//                   </div>
//                 </Modal>
//               </li>
//             )}

//             {user && user.role === 'admin' && isAdminRoute && (
//               <>
//                 <li><Link to="/admin/business-details">פרטי עסק</Link></li>
//                 <li><Link to="/admin/business-services">שירותים</Link></li>
//                 <li><Link to="/admin/business-meetings">הפגישות שלי</Link></li>
//                 <li><Link to="/admin/users">הלקוחות שלי</Link></li>
//               </>
//             )}

//             {!isAdminRoute && (
//               <>
//                 <li><Link to="/home">בית</Link></li>
//                 <li><Link to="/about">אודות</Link></li>
//                 <li><Link to="/projects">פרוייקטים</Link></li>
//                 <li><Link to="/meetings">צור קשר</Link></li>
//                 <li><Link to="/my-meetings">הפגישות שלי</Link></li>
//               </>
//             )}

//           </ul>
//         </nav>
//       </header >

//       <Outlet />
//     </>
//   );
// };

// export default Navbar;






import { useState, useCallback } from 'react';
import { AppBar, Toolbar, Tabs, Tab, IconButton, Modal, Box, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import SignIn from './signIn.component';
import SignUp from './signUp.component';
import logo from '../assets/logo.png';
import { teal } from '@mui/material/colors';
import axios from 'axios';

// Initialize Modals
const decodeToken = (token: string): User | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to decode token', e);
    return null;
  }
};

const validateToken = async (token: string): Promise<boolean> => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/meetings`, config);
    return response.status === 200;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  
  const isAdminRoute = location.pathname.includes('/admin');

  // const handleKeyDown = useCallback((event: KeyboardEvent) => {
  //   if (event.key === 'Escape') setModalIsOpen(false);
  // }, []);

  const closeModal = useCallback(() => setModalIsOpen(false), []);



  // useEffect(() => {
  //   // const tokenString = localStorage.getItem('jwtToken');
  //   // const token = tokenString ? JSON.parse(tokenString) : null;
  //   // if (token) {
  //   //   const isValid = validateToken(token);
  //   //   if (isValid) {
  //   //     const userData = decodeToken(token);
  //   //     setUser(userData);
  //   //   }

  //   // } 
  //   // else setUser(null);
  //   const checkUser = async () => {
  //     const tokenString = localStorage.getItem('jwtToken');
  //     const token = tokenString ? JSON.parse(tokenString) : null;

  //     if (token) {
  //       const isValid = await validateToken(token); // חכה לתוצאה של validateToken
  //       if (isValid) {
  //         const userData = decodeToken(token); // פונקציה לדקוד את הטוקן ולשלוף את פרטי המשתמש
  //         setUser(userData);
  //       } else {
  //         setUser(null); // אם הטוקן לא תקף, התנתק את המשתמש
  //       }
  //     } else {
  //       setUser(null); // אם אין טוקן, התנתק את המשתמש
  //     }
  //   };

  //   checkUser();
  // }, []);

  const openModal = async () => {
    // setModalIsOpen(true);
    // document.addEventListener('keydown', handleKeyDown);

    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString ? JSON.parse(tokenString) : null;

    if (token) {
      const isValid = await validateToken(token);
      if (isValid) {
        const userData = decodeToken(token);
        setUser(userData);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setModalIsOpen(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    navigate('/home');
  };

  const handleLoginSuccess = (userData : User) => {
    setUser(userData);
    closeModal();
    navigate('/home');
  };

  const handleSignUpSuccess = (userData : User) => {
    setUser(userData);
    closeModal();
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: teal[700], boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/home"><img src={logo} alt="KEINAN Architecture & Interior Design" style={{ height: '40px' }} /></Link>
          <Tabs value={false}>
            {!isAdminRoute ? (
              <>
                <Tab 
                  label="הפגישות שלי" 
                  component={Link} 
                  to="/my-meetings" 
                  sx={{ 
                    color: 'white', 
                    '&:hover': { color: teal[100] },
                    '&.Mui-selected': { borderBottom: `2px solid ${teal[400]}` }
                  }} 
                />
                <Tab 
                  label="צור קשר" 
                  component={Link} 
                  to="/meetings" 
                  sx={{ 
                    color: 'white', 
                    '&:hover': { color: teal[400] }, 
                    '&.Mui-selected': { borderBottom: `2px solid ${teal[400]}` } 
                  }} 
                />
                <Tab 
                  label="פרוייקטים" 
                  component={Link} 
                  to="/projects" 
                  sx={{ 
                    color: 'white', 
                    '&:hover': { color: teal[100] }, 
                    '&.Mui-selected': { borderBottom: `2px solid ${teal[400]}` } 
                  }} 
                />
                <Tab 
                  label="אודות" 
                  component={Link} 
                  to="/about" 
                  sx={{ 
                    color: 'white', 
                    '&:hover': { color: teal[100] }, 
                    '&.Mui-selected': { borderBottom: `2px solid ${teal[400]}` } 
                  }} 
                />
                <Tab 
                  label="בית" 
                  component={Link} 
                  to="/home" 
                  sx={{ 
                    color: 'white', 
                    '&:hover': { color: teal[100] }, 
                    '&.Mui-selected': { borderBottom: `2px solid ${teal[400]}` } 
                  }} 
                />
              </>
            ) : (
              <>
                <Tab 
                  label="לקוחות" 
                  component={Link} 
                  to="/admin/users" 
                  sx={{ 
                    color: 'white', 
                    '&:hover': { color: teal[100] }, 
                    '&.Mui-selected': { borderBottom: `2px solid ${teal[400]}` } 
                  }} 
                />
                <Tab 
                  label="פגישות" 
                  component={Link} 
                  to="/admin/business-meetings" 
                  sx={{ 
                    color: 'white', 
                    '&:hover': { color: teal[100] }, 
                    '&.Mui-selected': { borderBottom: `2px solid ${teal[400]}` } 
                  }} 
                />
                <Tab 
                  label="שירותים" 
                  component={Link} 
                  to="/admin/business-services" 
                  sx={{ 
                    color: 'white', 
                    '&:hover': { color: teal[100] }, 
                    '&.Mui-selected': { borderBottom: `2px solid ${teal[400]}` } 
                  }} 
                />
                <Tab 
                  label="פרטי עסק" 
                  component={Link} 
                  to="/admin/business-details" 
                  sx={{ 
                    color: 'white', 
                    '&:hover': { color: teal[100] }, 
                    '&.Mui-selected': { borderBottom: `2px solid ${teal[400]}` } 
                  }} 
                />
              </>
            )}
          </Tabs>
          <IconButton onClick={openModal}>
            <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '28px', color: 'white' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Modal open={modalIsOpen} onClose={closeModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 300, bgcolor: 'background.paper', borderRadius: '8px', p: 4, textAlign: 'center',
        }}>
          <Button onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px' }}>×</Button>
          {user ? (
            <>
              <Typography variant="h6" sx={{ color: '#555' }}>שלום {user.username}</Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>תפקידך: {user.role === 'admin' ? 'מנהל' : 'משתמש רגיל'}</Typography> {/* צבע כהה יותר */}
              <Button onClick={handleSignOut} variant="contained" sx={{ mt: 2, backgroundColor: teal[700], color: 'white' }}>התנתק</Button>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
                <Button 
                  onClick={() => setActiveTab('login')} 
                  sx={{ 
                    color: activeTab === 'login' ? teal[700] : '#333',
                    '&:hover': { color: teal[100] }
                  }}
                >
                  התחבר
                </Button>
                <Button 
                  onClick={() => setActiveTab('register')} 
                  sx={{ 
                    color: activeTab === 'register' ? teal[700] : '#333',
                    '&:hover': { color: teal[100] }
                  }}
                >
                  הרשם
                </Button>
              </Box>
              {activeTab === 'login' ? (
                <SignIn onSuccess={handleLoginSuccess} closeModal={closeModal} />
              ) : (
                <SignUp onSuccess={handleSignUpSuccess} closeModal={closeModal} />
              )}
            </>
          )}
        </Box>
      </Modal>

      <Outlet />
    </>
  );
};

export default Navbar;