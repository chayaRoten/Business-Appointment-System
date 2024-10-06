import { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
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
  const [isOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();

  const isAdminRoute = location.pathname.includes('/admin');

  // Define handleKeyDown first
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setModalIsOpen(false);
    }
  }, []);

  // Define closeModal next
  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);


  useEffect(() => {
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString ? JSON.parse(tokenString) : null;

    if (token) {
      const userData = decodeToken(token);
      setUser(userData);
    } else {
      setUser(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem('jwtToken')]);


  const openModal = () => {
    setModalIsOpen(true);
    document.addEventListener('keydown', handleKeyDown);
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    navigate('/home');
  };

  const handleLoginSuccess = (userData: unknown) => {
    setUser(userData as User);
    closeModal();
    navigate('/home');
  };

  const handleSignUpSuccess = (userData: unknown) => {
    setUser(userData as User);
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