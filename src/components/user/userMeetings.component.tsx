import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Select, MenuItem, InputLabel, FormControl, TextField, Paper, CircularProgress, Grid } from '@mui/material';
import { teal } from '@mui/material/colors';
import { SelectChangeEvent } from '@mui/material';

const UserMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceTypes>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder] = useState('date');
  const [filters, setFilters] = useState({ serviceType: '', dateRange: '' });

  useEffect(() => {
    const fetchMeetingsAndServices = async () => {
      try {
        const tokenString = localStorage.getItem('jwtToken');
        const token = tokenString !== null ? JSON.parse(tokenString) : null;
        const config = {
          headers: {
            authorization: `Bearer ${token}`
          }
        };

        // Fetch meetings
        const meetingsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/meetings`, config);
        setMeetings(meetingsResponse.data);

        // Fetch service types
        const servicesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/services`, config);
        const services = servicesResponse.data.reduce((acc: { [x: string]: unknown; }, service: { id: string | number; name: unknown; }) => {
          acc[service.id] = service.name;
          return acc;
        }, {});
        setServiceTypes(services);

        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchMeetingsAndServices();
  }, []);

  const handleFilterChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const filteredMeetings = Array.isArray(meetings) ? meetings.filter(meeting => {
    const meetsServiceType = filters.serviceType ? meeting.serviceType === filters.serviceType : true;
    const meetsDateRange = filters.dateRange ? new Date(meeting.date) >= new Date(filters.dateRange) : true;
    return meetsServiceType && meetsDateRange;
  }) : [];

  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    if (sortOrder === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
  });

  if (loading) return <Box sx={{ textAlign: 'center', marginTop: 4 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ color: 'red', textAlign: 'center', marginTop: 4 }}><Typography variant="h6">Error loading meetings: {error}</Typography></Box>;

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto', color: '#333', backgroundColor: 'transparent', direction: 'rtl' }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 3, color: teal[500], fontWeight: 600 }}>רשימת הפגישות</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 3, gap: 2, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200, backgroundColor: '#fafafa', borderRadius: 1, boxShadow: 1 }}>
            <InputLabel>סוג שירות</InputLabel>
            <Select
              name="serviceType"
              value={filters.serviceType}
              onChange={handleFilterChange}
              label="סוג שירות"
              sx={{ backgroundColor: '#fafafa', color: '#333', fontSize: 16, '& .MuiSelect-icon': { color: teal[500] }}}
            >
              <MenuItem value="">בחר סוג שירות</MenuItem>
              {Object.entries(serviceTypes).map(([id, name]) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="date"
            name="dateRange"
            value={filters.dateRange}
            onChange={handleDateChange}
            label="סנן לפי תאריך"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{
              backgroundColor: '#fafafa',
              color: '#333',
              fontSize: 16,
              flex: 1,
              '& .MuiOutlinedInput-root': { backgroundColor: '#fafafa' }
            }}
          />
        </Box>
      </Box>

      {filteredMeetings.length === 0 ? (
        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Typography variant="h6" sx={{ color: '#bbb' }}>אין לך פגישות.</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: teal[500],
              '&:hover': { backgroundColor: teal[600] },
              marginTop: 2,
            }}
            href="/meetings"
          >
            לקביעת פגישה לחץ כאן
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          {sortedMeetings.map(meeting => (
            <Grid item xs={12} sm={6} md={3} key={meeting.id}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: '#ffffff',
                  borderRadius: 2,
                  boxShadow: 3,
                  color: '#333',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
                  minWidth: 270,
                  height: 'auto',
                }}
              >
                <Typography variant="h6" sx={{ color: teal[500], marginBottom: 1, fontWeight: 600 }}>פגישה עם {meeting.clientName}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>סוג שירות:</strong> {serviceTypes[meeting.serviceType] || meeting.serviceType}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>תאריך:</strong> {new Date(meeting.date).toLocaleDateString()}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>שעה:</strong> {meeting.startTime}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>שם:</strong> {meeting.clientName}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>אימייל:</strong> <span style={{ direction: 'ltr' }}>{meeting.clientEmail}</span></Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>הערה:</strong> {meeting.note}</Typography>
                <Typography variant="body2" sx={{ color: teal[500], marginTop: 1 }}>משך הפגישה: 45 דקות</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default UserMeetings;