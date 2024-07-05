import React, { useEffect, useState } from 'react';
import AdminNavbar from "./adminHeader.component";
import axios from 'axios';

export const AdminLayout = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenString = localStorage.getItem('jwtToken');
        const token = tokenString !== null ? JSON.parse(tokenString) : null;
        const response = await axios.get('http://localhost:3000/business', {
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
      {isAuthorized ? <AdminNavbar /> : <h3>You are not authorized to perform this action</h3>}
    </div>
  );
};
