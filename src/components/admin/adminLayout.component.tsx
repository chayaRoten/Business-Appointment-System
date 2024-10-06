import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar.component';

export const AdminLayout = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenString = localStorage.getItem('jwtToken');
        const token = tokenString !== null ? JSON.parse(tokenString) : null;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/business`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

        if (response.status === 401 || response.status === 403) {
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    fetchData();
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthorized ? <Navbar /> : <h3>You are not authorized to perform this action <br />
        <a href="/signin">התחבר</a> / <a href="/signup">הרשם</a>
      </h3>}
    </div>
  );
};