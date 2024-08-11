import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/businessDetails.style.css';
import '../../styles/global.css';

const BusinessDetails = () => {
  const [businessDetails, setBusinessDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const tokenString = localStorage.getItem('jwtToken');
        const token = tokenString !== null ? JSON.parse(tokenString) : null;
        const response = await axios.get('http://localhost:3000/business', {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setBusinessDetails(response.data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, []);

  if (loading) {
    return <div className="loading">טוען...</div>;
  }

  if (error) {
    return <div className="error">שגיאה: {error}</div>;
  }

  return (
    <div className="business-details-container">
      {businessDetails ? (
        <div>
          <h2>פרטי עסק</h2>
          <p><strong>שם העסק:</strong> {businessDetails.name}</p>
          <p><strong>כתובת:</strong> {businessDetails.address}</p>
          <p><strong>טלפון:</strong> {businessDetails.phone}</p>
          <p><strong>דואר אלקטרוני:</strong> {businessDetails.email}</p>

        </div>
      ) : (
        <div>לא נמצאו פרטים</div>
      )}
    </div>
  );
};

export default BusinessDetails;
