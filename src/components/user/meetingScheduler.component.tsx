import { useState, useEffect } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import { teal } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

interface CustomJwtPayload extends JwtPayload {
  username?: string;
  email?: string;
}

const MeetingScheduler = () => {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString ? JSON.parse(tokenString) : null;
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setClientName(decoded.username || '');
      setClientEmail(decoded.email || '');
    } catch (error) {
      console.error('Invalid token', error);
    }

    const fetchServiceTypes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/services`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setServiceTypes(response.data);
      } catch (error) {
        console.error('Failed to fetch service types', error);
      }
    };

    fetchServiceTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString !== null ? JSON.parse(tokenString) : null;
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
    const newMeeting = {
      startTime: time,
      serviceType,
      date,
      note,
      clientName,
      clientEmail
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/meetings`, newMeeting, config);
      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          title: 'הפגישה נקבעה בהצלחה',
          icon: 'success',
          confirmButtonText: 'אישור',
          customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            confirmButton: 'swal2-confirm'
          }
        });
        setServiceType('');
        setDate('');
        setTime('');
        setNote('');
        setClientName('');
        setClientEmail('');
        navigate("/home");
      } else {
        throw new Error('Failed to schedule meeting');
      }
    } catch (error) {
      Swal.fire({
        title: 'שגיאה',
        text: 'נכשל קביעת פגישה',
        icon: 'error',
        confirmButtonText: 'ניסיון שוב',
        customClass: {
          popup: 'swal2-popup',
          title: 'swal2-title',
          confirmButton: 'swal2-confirm'
        }
      });
      console.error(error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (!isAuthorized) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h6" sx={{ color: '#b30000' }}>אין גישה לעמוד</Typography>
        <Typography variant="body1" sx={{ color: '#ffffff' }}>
          <a href="/signin" style={{ color: '#b30000' }}>התחבר</a> / <a href="/signup" style={{ color: '#b30000' }}>הרשם</a> בכדי לקבוע פגישה
        </Typography>
      </Box>
    );
  }

  // Prerequisite: Business details manually entered here.
  const businessDetails = {
    name: "קינן אדריכלים - משרד אדריכלות ועיצוב פנים מנוסה ומקצועי",
    address: " תל אביב שד' רוטשילד 31/24",
    phone: "073-7597161",
    email: "http://www.keinan-arch.com",
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      {/* Business contact section */}
      <Box sx={{ marginTop: 4, backgroundColor: '#fafafa', padding: '16px', borderRadius: '8px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>פרטי העסק</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>שם העסק: {businessDetails.name}</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>כתובת: {businessDetails.address}</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>טלפון: {businessDetails.phone}</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>מייל: {businessDetails.email}</Typography>
        
        {/* Only one button to open the dialog */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          sx={{
            backgroundColor: teal[500],
            '&:hover': { backgroundColor: teal[600] },
            fontSize: '16px',
            padding: '12px 30px',
            marginTop: 2
          }}
        >
          קבע פגישה עם העסק
        </Button>
      </Box>

      {/* Dialog for scheduling a meeting */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          direction: 'rtl',
          '& .MuiDialog-paper': {
            width: '350px',
            padding: '16px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: teal[500], color: '#ffffff' }}>
          קביעת פגישה
          <IconButton onClick={handleCloseDialog} sx={{ color: '#ffffff' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#ffffff', color: '#333333' }}>
          <form onSubmit={handleSubmit}>
            {/* Form inputs for scheduling a meeting */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>סוג השירות</InputLabel>
              <Select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                label="סוג השירות"
                required
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: '#333333',
                }}
              >
                <MenuItem value="">בחר סוג שירות</MenuItem>
                {Array.isArray(serviceTypes) && serviceTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Other input fields */}
            <TextField
              label="תאריך"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              fullWidth
              sx={{
                marginBottom: 2,
                backgroundColor: '#f5f5f5',
                color: '#333333',
              }}
            />

            <TextField
              label="זמן"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              fullWidth
              sx={{
                marginBottom: 2,
                backgroundColor: '#f5f5f5',
                color: '#333333',
              }}
            />

            <TextField
              label="הערה לבעל העסק"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              fullWidth
              multiline
              rows={3}
              sx={{
                marginBottom: 2,
                backgroundColor: '#f5f5f5',
                color: '#333333',
              }}
            />

            <TextField
              label="שם לקוח"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              sx={{
                marginBottom: 2,
                backgroundColor: '#f5f5f5',
                color: '#333333',
              }}
            />

            <TextField
              label="מייל"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              sx={{
                marginBottom: 2,
                backgroundColor: '#f5f5f5',
                color: '#333333',
              }}
            />

            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: teal[500],
                  '&:hover': { backgroundColor: teal[600] },
                  padding: '12px 24px',
                  fontSize: '16px',
                }}
              >
                קבע פגישה
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MeetingScheduler;