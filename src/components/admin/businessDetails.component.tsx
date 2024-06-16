import  { useEffect, useState } from 'react';
import axios from 'axios';

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
    return <div>טוען...</div>;
  }

  if (error) {
    return <div>שגיאה: {error}</div>;
  }

  return (
    <div>
      {businessDetails ? (
        <div>
          <h2>פרטי עסק</h2>
          <p><strong>שם העסק:</strong> {businessDetails.name}</p>
          <p><strong>כתובת:</strong> {businessDetails.address}</p>
          <p><strong>טלפון:</strong> {businessDetails.phone}</p>
          <p><strong>דואר אלקטרוני:</strong> {businessDetails.email}</p>
          {/* ניתן להוסיף פרטים נוספים בהתאם למידע מהשרת */}
        </div>
      ) : (
        <div>לא נמצאו פרטים</div>
      )}
    </div>
  );
};

export default BusinessDetails;
