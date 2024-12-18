import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { teal } from '@mui/material/colors';
import '../../styles/global.css';

const BusinessDetails = () => {
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formDetails, setFormDetails] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    about: '',
  });
  const [creationError, setCreationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const tokenString = localStorage.getItem('jwtToken');
        const token = tokenString !== null ? JSON.parse(tokenString) : null;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/business`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        if (response.data.length > 0) {
          const data = response.data[0];
          setBusinessDetails(data);
          setFormDetails({
            id: data.id,
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            about: data.about || '',
          });
        }
      } catch (err) {
        setError((err as Error).message);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSaveClick = async () => {
    try {
      console.log(formDetails);

      const tokenString = localStorage.getItem('jwtToken');
      const token = tokenString !== null ? JSON.parse(tokenString) : null;

      if (!token) {
        setError('לא נמצא טוקן');
        return;
      }

      const response = await axios.put(`${import.meta.env.VITE_API_URL}/business`, formDetails, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setBusinessDetails(formDetails);
        setIsEditing(false);
      } else {
        setError('היתה בעיה בעדכון פרטי העסק');
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleCreateSaveClick = async () => {
    try {
      const tokenString = localStorage.getItem('jwtToken');
      const token = tokenString !== null ? JSON.parse(tokenString) : null;
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/business`, formDetails, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setBusinessDetails(response.data);
        setIsCreating(false);
      } else {
        setCreationError('היתה בעיה ביצירת פרטי העסק');
      }
    } catch (err) {
      setCreationError((err as Error).message);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}><CircularProgress color="primary" /></Box>;
  }

  if (error) {
    return <Box sx={{ textAlign: 'center', color: '#ff4d4d', fontSize: '18px' }}>שגיאה: {error}</Box>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 3, backgroundColor: '#fafafa', borderRadius: 2, boxShadow: 3 }}>
      {isCreating ? (
        <Box sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" sx={{ marginBottom: 2, color: teal[500] }}>צור פרטי עסק חדשים</Typography>
          <TextField
            label="שם העסק"
            name="name"
            value={formDetails.name}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="כתובת"
            name="address"
            value={formDetails.address}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="טלפון"
            name="phone"
            value={formDetails.phone}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="דואר אלקטרוני"
            name="email"
            value={formDetails.email}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="אודות"
            name="about"
            value={formDetails.about}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateSaveClick}
              sx={{ backgroundColor: teal[500], '&:hover': { backgroundColor: teal[600] }, width: '48%' }}
            >
              צור
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelClick}
              sx={{ width: '48%' }}
            >
              בטל
            </Button>
          </Box>
          {creationError && <Box sx={{ color: '#ff4d4d', marginTop: 2 }}>{creationError}</Box>}
        </Box>
      ) : isEditing ? (
        <Box sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" sx={{ marginBottom: 2, color: teal[500] }}>ערוך פרטי עסק</Typography>
          <TextField
            label="שם העסק"
            name="name"
            value={formDetails.name}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="כתובת"
            name="address"
            value={formDetails.address}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="טלפון"
            name="phone"
            value={formDetails.phone}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="דואר אלקטרוני"
            name="email"
            value={formDetails.email}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="אודות"
            name="about"
            value={formDetails.about}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
              sx={{ backgroundColor: teal[500], '&:hover': { backgroundColor: teal[600] }, width: '48%' }}
            >
              שמור
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelClick}
              sx={{ width: '48%' }}
            >
              בטל
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" sx={{ marginBottom: 2, color: teal[500] }}>פרטי עסק</Typography>
          {businessDetails ? (
            <>
              <Typography variant="body1"><strong>שם העסק:</strong> {businessDetails.name}</Typography>
              <Typography variant="body1"><strong>כתובת:</strong> {businessDetails.address}</Typography>
              <Typography variant="body1"><strong>טלפון:</strong> {businessDetails.phone}</Typography>
              <Typography variant="body1"><strong>דואר אלקטרוני:</strong> {businessDetails.email}</Typography>
              <Typography variant="body1"><strong>אודות:</strong> {businessDetails.about}</Typography> {/* הצגת about */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditClick}
                sx={{ marginTop: 2, backgroundColor: teal[500], '&:hover': { backgroundColor: teal[600] } }}
              >
                ערוך
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body1">לא נמצאו פרטי עסק.</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateClick}
                sx={{ marginTop: 2, backgroundColor: teal[500], '&:hover': { backgroundColor: teal[600] } }}
              >
                צור פרטי עסק חדשים
              </Button>
            </>
          )}
          {creationError && <Box sx={{ color: '#ff4d4d', marginTop: 2 }}>{creationError}</Box>}
        </Box>
      )}
    </Box>
  );
};

export default BusinessDetails;