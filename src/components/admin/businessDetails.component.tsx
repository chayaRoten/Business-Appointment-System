import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/businessDetails.style.css';
import '../../styles/global.css';

const BusinessDetails = () => {
  const [businessDetails, setBusinessDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formDetails, setFormDetails] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [creationError, setCreationError] = useState(null);

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
        if (response.data.length > 0) {
          const data = response.data[0];
          setBusinessDetails(data);
          setFormDetails({
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCreateClick = () => {
    if (!businessDetails) {
      setIsCreating(true);
    } else {
      setCreationError('פרטי עסק כבר קיימים. ניתן לערוך את הפרטים הקיימים בלבד.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSaveClick = async () => {
    try {
      const tokenString = localStorage.getItem('jwtToken');
      const token = tokenString !== null ? JSON.parse(tokenString) : null;
      await axios.put('http://localhost:3000/business', formDetails, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setBusinessDetails(formDetails);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateSaveClick = async () => {
    try {
      const tokenString = localStorage.getItem('jwtToken');
      const token = tokenString !== null ? JSON.parse(tokenString) : null;
      await axios.post('http://localhost:3000/business', formDetails, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setBusinessDetails(formDetails);
      setIsCreating(false);
    } catch (err) {
      setCreationError(err.message);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  if (loading) {
    return <div className="loading">טוען...</div>;
  }

  if (error) {
    return <div className="error">שגיאה: {error}</div>;
  }

  return (
    <div className="business-details-container">
      {isCreating ? (
        <div className="edit-form">
          <h2>צור פרטי עסק חדשים</h2>
          <label>
            <strong>שם העסק:</strong>
            <input
              type="text"
              name="name"
              value={formDetails.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>כתובת:</strong>
            <input
              type="text"
              name="address"
              value={formDetails.address}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>טלפון:</strong>
            <input
              type="text"
              name="phone"
              value={formDetails.phone}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>דואר אלקטרוני:</strong>
            <input
              type="email"
              name="email"
              value={formDetails.email}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleCreateSaveClick}>צור</button>
          <button onClick={handleCancelClick}>בטל</button>
          {creationError && <div className="error">{creationError}</div>}
        </div>
      ) : isEditing ? (
        <div className="edit-form">
          <h2>ערוך פרטי עסק</h2>
          <label>
            <strong>שם העסק:</strong>
            <input
              type="text"
              name="name"
              value={formDetails.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>כתובת:</strong>
            <input
              type="text"
              name="address"
              value={formDetails.address}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>טלפון:</strong>
            <input
              type="text"
              name="phone"
              value={formDetails.phone}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>דואר אלקטרוני:</strong>
            <input
              type="email"
              name="email"
              value={formDetails.email}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleSaveClick}>שמור</button>
          <button onClick={handleCancelClick}>בטל</button>
        </div>
      ) : (
        <div>
          <h2>פרטי עסק</h2>
          {businessDetails ? (
            <>
              <p><strong>שם העסק:</strong> {businessDetails.name}</p>
              <p><strong>כתובת:</strong> {businessDetails.address}</p>
              <p><strong>טלפון:</strong> {businessDetails.phone}</p>
              <p><strong>דואר אלקטרוני:</strong> {businessDetails.email}</p>
              <button onClick={handleEditClick}>ערוך</button>
            </>
          ) : (
            <>
              <p>לא נמצאו פרטי עסק.</p>
              <button onClick={handleCreateClick}>צור פרטי עסק חדשים</button>
            </>
          )}
          {creationError && <div className="error">{creationError}</div>}
        </div>
      )}
    </div>
  );
};

export default BusinessDetails;
