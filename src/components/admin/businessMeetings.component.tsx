// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../../styles/meetings.style.css';
// import '../../styles/global.css';

// const BusinessMeetings = () => {
//   const [meetings, setMeetings] = useState<Meeting[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [newMeeting, setNewMeeting] = useState({
//     note: '',
//     date: '',
//     startTime: '',
//     clientEmail: '',
//     serviceType: '',
//     clientName: ''
//   });
//   const [editMeeting, setEditMeeting] = useState<Meeting | null>(null);
//   const [services, setServices] = useState<Service[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [serviceTypes, setServiceTypes] = useState<ServiceType>({} as ServiceType);
//   const [sortOrder, setSortOrder] = useState<string>('date');
//   const [filters, setFilters] = useState({
//     serviceType: '',
//     dateRange: '',
//     clientName: ''
//   });

//   const getTokenConfig = () => {
//     const tokenString = localStorage.getItem('jwtToken');
//     const token = tokenString ? JSON.parse(tokenString) : null;
//     return {
//       headers: {
//         authorization: `Bearer ${token}`
//       }
//     };
//   };

//   const fetchData = async () => {
//     try {
//       const config = getTokenConfig();

//       // Fetch meetings
//       const meetingsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/meetings`, config);
//       setMeetings(meetingsResponse.data);

//       // Fetch service types
//       const servicesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/services`, config);
//       const servicesMap = servicesResponse.data.reduce((acc: { [x: string]: unknown; }, service: { id: string | number; name: unknown; }) => {
//         acc[service.id] = service.name;
//         return acc;
//       }, {});

//       setServices(servicesResponse.data); // Adjust if the API response structure is different
//       setServiceTypes(servicesMap);

//       setLoading(false);
//     } catch (error) {
//       setError((error as Error).message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   });

//   const handleAddMeeting = async () => {
//     try {
//       const config = getTokenConfig();
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/meetings`, newMeeting, config);
//       setMeetings([...meetings, response.data]);
//       setNewMeeting({
//         note: '',
//         date: '',
//         startTime: '',
//         clientEmail: '',
//         serviceType: '',
//         clientName: ''
//       });
//       setShowModal(false);
//     } catch (error) {
//       setError((error as Error).message);
//     }
//   };

//   const handleEditMeeting = async (id: number) => {
//     if (editMeeting === null) {
//       console.error('EditMeeting is null');
//       return;
//     }
//     if (!editMeeting.date || !editMeeting.startTime || !editMeeting.clientName || !editMeeting.serviceType || !editMeeting.clientEmail) {
//       alert('אנא מלא את כל השדות');
//       return;
//     }
//     try {
//       const config = getTokenConfig();
//       console.log(editMeeting);
//       const response = await axios.put(`${import.meta.env.VITE_API_URL}/meetings/${id}`, editMeeting, config);
//       setMeetings(meetings.map(meeting => (meeting.id === id ? response.data : meeting)));
//       setEditMeeting(null);
//     } catch (error) {
//       console.error('Error updating meeting:', error);
//       setError((error as Error).message);
//     }
//   };

//   const handleDeleteMeeting = async (id: number) => {
//     try {
//       const config = getTokenConfig();
//       await axios.delete(`${import.meta.env.VITE_API_URL}/meetings/${id}`, config);
//       setMeetings(meetings.filter(meeting => meeting.id !== id));
//     } catch (error) {
//       setError((error as Error).message);
//     }
//   };

//   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSortOrder(e.target.value);
//   };

//   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };


//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   // Filter and sort meetings
//   const filteredMeetings = meetings.filter(meeting => {
//     const meetsServiceType = filters.serviceType ? meeting.serviceType === filters.serviceType : true;
//     const meetsDateRange = filters.dateRange ? new Date(meeting.date) >= new Date(filters.dateRange) : true;
//     const meetsClientName = filters.clientName ? meeting.clientName.toLowerCase().includes(filters.clientName.toLowerCase()) : true;
//     return meetsServiceType && meetsDateRange && meetsClientName;
//   });

//   const sortedMeetings = [...filteredMeetings].sort((a: Meeting, b: Meeting) => {
//     if (sortOrder === 'date') {
//       return new Date(a.date).getTime() - new Date(b.date).getTime();
//     } else if (sortOrder === 'clientName') {
//       return a.clientName.localeCompare(b.clientName);
//     }
//     return 0;
//   });

//   if (loading) return <p>טוען...</p>;
//   if (error) return <p>שגיאה בהטענת הפגישות: {error}</p>;

//   return (
//     <div className="meetings-container">
//       <h1>רשימת הפגישות</h1>

//       <div className="sort-options">
//         <label htmlFor="sortOrder"> סדר לפי: </label>
//         <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
//           <option value="date">תאריך</option>
//           <option value="clientName">שם לקוח</option>
//         </select>
//       </div>

//       <div className="filter-options">
//         <label htmlFor="serviceType"> סנן לפי סוג שירות: </label>
//         <select id="serviceType" name="serviceType" value={filters.serviceType} onChange={handleFilterChange}>
//           <option value="">בחר סוג שירות</option>
//           {Object.entries(serviceTypes).map(([id, name]) => (
//             <option key={id} value={id}>{name}</option>
//           ))}
//         </select>

//         <label htmlFor="dateRange"> סנן לפי תאריך: </label>
//         <input
//           type="date"
//           id="dateRange"
//           name="dateRange"
//           value={filters.dateRange}
//           onChange={handleDateChange}
//         />
//       </div>

//       <ul className="meetings-list">
//         {sortedMeetings.map(meeting => (
//           <li key={meeting.id} className="meeting-item">
//             {editMeeting && editMeeting.id === meeting.id ? (
//               <div className="meeting-form">
//                 <input
//                   type="text"
//                   placeholder="הערה"
//                   value={editMeeting.note}
//                   onChange={(e) => setEditMeeting({ ...editMeeting, note: e.target.value })}
//                 />
//                 <input
//                   type="date"
//                   value={editMeeting.date}
//                   onChange={(e) => setEditMeeting({ ...editMeeting, date: e.target.value })}
//                 />
//                 <input
//                   type="time"
//                   value={editMeeting.startTime}
//                   onChange={(e) => setEditMeeting({ ...editMeeting, startTime: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   placeholder="שם הלקוח"
//                   value={editMeeting.clientName}
//                   onChange={(e) => setEditMeeting({ ...editMeeting, clientName: e.target.value })}
//                 />
//                 <select
//                   value={editMeeting.serviceType}
//                   onChange={(e) => setEditMeeting({ ...editMeeting, serviceType: e.target.value })}
//                 >
//                   <option value="">בחר סוג שירות</option>
//                   {services.map(service => (
//                     <option key={service.id} value={service.id}>{service.name}</option>
//                   ))}
//                 </select>
//                 <input
//                   type="email"
//                   placeholder="אימייל לקוח"
//                   value={editMeeting.clientEmail}
//                   onChange={(e) => setEditMeeting({ ...editMeeting, clientEmail: e.target.value })}
//                 />
//                 <button onClick={() => handleEditMeeting(meeting.id)}>שמור</button>
//                 <button onClick={() => setEditMeeting(null)}>ביטול</button>
//               </div>
//             ) : (
//               <div className="meeting-details">
//                 <p><strong>סוג שירות:</strong> {serviceTypes[meeting.serviceType]}</p>
//                 <p><strong>תאריך:</strong> {meeting.date}</p>
//                 <p><strong>שעה התחלה:</strong> {meeting.startTime}</p>
//                 <p><strong>שם לקוח:</strong> {meeting.clientName}</p>
//                 <p><strong>אימייל לקוח:</strong> {meeting.clientEmail}</p>
//                 <p><strong>הערה:</strong> {meeting.note}</p>
//                 <button onClick={() => setEditMeeting(meeting)}>ערוך</button>
//                 <button onClick={() => handleDeleteMeeting(meeting.id)}>מחק</button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>הוסף פגישה</h2>
//             <input
//               type="text"
//               placeholder="הערה"
//               value={newMeeting.note}
//               onChange={(e) => setNewMeeting({ ...newMeeting, note: e.target.value })}
//             />
//             <input
//               type="date"
//               value={newMeeting.date}
//               onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
//             />
//             <input
//               type="time"
//               value={newMeeting.startTime}
//               onChange={(e) => setNewMeeting({ ...newMeeting, startTime: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="שם הלקוח"
//               value={newMeeting.clientName}
//               onChange={(e) => setNewMeeting({ ...newMeeting, clientName: e.target.value })}
//             />
//             <select
//               value={newMeeting.serviceType}
//               onChange={(e) => setNewMeeting({ ...newMeeting, serviceType: e.target.value })}
//             >
//               <option value="">בחר סוג שירות</option>
//               {services.map(service => (
//                 <option key={service.id} value={service.id}>{service.name}</option>
//               ))}
//             </select>
//             <input
//               type="email"
//               placeholder="אימייל לקוח"
//               value={newMeeting.clientEmail}
//               onChange={(e) => setNewMeeting({ ...newMeeting, clientEmail: e.target.value })}
//             />
//             <button onClick={handleAddMeeting}>הוסף</button>
//             <button onClick={() => setShowModal(false)}>סגור</button>
//           </div>
//         </div>
//       )}

//       <button onClick={() => setShowModal(true)}>הוסף פגישה חדשה</button>
//     </div>
//   );
// };

// export default BusinessMeetings;


















import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress, TextField, Select, MenuItem, Typography, FormControl, InputLabel, Modal, Grid, SelectChangeEvent } from '@mui/material';
import '../../styles/global.css';

const BusinessMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMeeting, setNewMeeting] = useState({
    note: '',
    date: '',
    startTime: '',
    clientEmail: '', // added email field
    serviceType: '',
    clientName: ''
  });
  const [editMeeting, setEditMeeting] = useState<Meeting | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [showModal, setShowModal] = useState(false); // Modal for adding new meeting
  const [editModalOpen, setEditModalOpen] = useState(false); // Modal for editing meeting
  const [serviceTypes, setServiceTypes] = useState<ServiceType>({} as ServiceType);
  const [sortOrder, setSortOrder] = useState<string>('date');
  const [filters, setFilters] = useState({
    serviceType: '',
    dateRange: '',
    clientName: ''
  });

  const getTokenConfig = () => {
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString ? JSON.parse(tokenString) : null;
    return {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
  };

  const fetchData = async () => {
    try {
      const config = getTokenConfig();

      // Fetch meetings
      const meetingsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/meetings`, config);
      setMeetings(meetingsResponse.data);

      // Fetch service types
      const servicesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/services`, config);
      const servicesMap = servicesResponse.data.reduce((acc: { [x: string]: unknown; }, service: { id: string | number; name: unknown; }) => {
        acc[service.id] = service.name;
        return acc;
      }, {});

      setServices(servicesResponse.data);
      setServiceTypes(servicesMap);

      setLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const handleAddMeeting = async () => {
    try {
      console.log("Data being sent:", newMeeting);
      const config = getTokenConfig();
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/meetings`, newMeeting, config);
      setMeetings([...meetings, response.data]);
      setNewMeeting({
        note: '',
        date: '',
        startTime: '',
        clientEmail: '', // Reset email after adding
        serviceType: '',
        clientName: ''
      });
      setShowModal(false); // Close modal after adding a meeting

    } catch (error) {
      setError(`שגיאה ביצירת פגישה: ${(error as Error).message}`);
    }
  };

  const handleEditMeeting = async (id: number) => {
    if (editMeeting === null) {
      console.error('EditMeeting is null');
      return;
    }
    if (!editMeeting.date || !editMeeting.startTime || !editMeeting.clientName || !editMeeting.serviceType || !editMeeting.clientEmail) {
      alert('אנא מלא את כל השדות');
      return;
    }
    try {
      const config = getTokenConfig();
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/meetings/${id}`, editMeeting, config);
      setMeetings(meetings.map(meeting => (meeting.id === id ? response.data : meeting)));
      setEditModalOpen(false); // Close edit modal after updating
    } catch (error) {
      setError(`שגיאה בעדכון הפגישה: ${(error as Error).message}`);
    }
  };

  const handleDeleteMeeting = async (id: number) => {
    try {
      const config = getTokenConfig();
      await axios.delete(`${import.meta.env.VITE_API_URL}/meetings/${id}`, config);
      setMeetings(meetings.filter(meeting => meeting.id !== id));
    } catch (error) {
      setError(`שגיאה במחיקת הפגישה: ${(error as Error).message}`);
    }
  };

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    setSortOrder(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter and sort meetings
  const filteredMeetings = meetings.filter(meeting => {
    const meetsServiceType = filters.serviceType ? meeting.serviceType === filters.serviceType : true;
    const meetsDateRange = filters.dateRange ? new Date(meeting.date) >= new Date(filters.dateRange) : true;
    const meetsClientName = filters.clientName ? meeting.clientName.toLowerCase().includes(filters.clientName.toLowerCase()) : true;
    return meetsServiceType && meetsDateRange && meetsClientName;
  });

  const sortedMeetings = [...filteredMeetings].sort((a: Meeting, b: Meeting) => {
    if (sortOrder === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortOrder === 'clientName') {
      return a.clientName.localeCompare(b.clientName);
    }
    return 0;
  });

  if (loading) return <CircularProgress color="primary" />;
  if (error) return <Typography color="error">שגיאה בהטענת הפגישות: {error}</Typography>;

  return (
    <Box sx={{ maxWidth: '1000px', margin: '0 auto', padding: 3, backgroundColor: '#fafafa', borderRadius: 2, boxShadow: 3, marginTop: '60px' }}>

      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" sx={{ width: '100%', backgroundColor: 'teal' }} onClick={() => setShowModal(true)}>
          הוסף פגישה
        </Button>
      </Box>

      {/* Filter and Sort Controls */}
      <Box sx={{ marginBottom: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <TextField
              label="שם לקוח"
              value={filters.clientName}
              onChange={handleInputChange}
              name="clientName"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>סוג שירות</InputLabel>
              <Select
                value={filters.serviceType}
                onChange={handleSelectChange}
                name="serviceType"
              >
                <MenuItem value="">בחר סוג שירות</MenuItem>
                {services.map(service => (
                  <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="תאריך אחרי"
              type="date"
              value={filters.dateRange}
              onChange={handleDateChange}
              name="dateRange"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>מיון לפי</InputLabel>
              <Select value={sortOrder} onChange={handleSortChange}>
                <MenuItem value="date">תאריך</MenuItem>
                <MenuItem value="clientName">שם לקוח</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Modal for adding new meeting */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, maxWidth: '400px', margin: 'auto', top: '20%', position: 'relative' }}>
          <Typography variant="h6" gutterBottom>הוסף פגישה חדשה</Typography>

          <TextField
            label="הערה"
            value={newMeeting.note}
            onChange={(e) => setNewMeeting({ ...newMeeting, note: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="תאריך"
            type="date"
            value={newMeeting.date}
            onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="שעה התחלה"
            type="time"
            value={newMeeting.startTime}
            onChange={(e) => setNewMeeting({ ...newMeeting, startTime: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="שם לקוח"
            value={newMeeting.clientName}
            onChange={(e) => setNewMeeting({ ...newMeeting, clientName: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="אימייל לקוח" // New email field
            value={newMeeting.clientEmail}
            onChange={(e) => setNewMeeting({ ...newMeeting, clientEmail: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Select
            value={newMeeting.serviceType}
            onChange={(e) => setNewMeeting({ ...newMeeting, serviceType: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="">בחר סוג שירות</MenuItem>
            {services.map(service => (
              <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>
            ))}
          </Select>

          <Button variant="contained" color="primary" onClick={handleAddMeeting} sx={{ width: '100%' }}>
            הוסף פגישה
          </Button>

        </Box>
      </Modal>

      {/* Modal for editing meeting */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, maxWidth: '400px', margin: 'auto', top: '20%', position: 'relative' }}>
          <Typography variant="h6" gutterBottom>ערוך פגישה</Typography>

          <TextField
            label="הערה"
            value={editMeeting?.note || ''}
            onChange={(e) => setEditMeeting({ ...editMeeting!, note: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="תאריך"
            type="date"
            value={editMeeting?.date || ''}
            onChange={(e) => setEditMeeting({ ...editMeeting!, date: e.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="שעה התחלה"
            type="time"
            value={editMeeting?.startTime || ''}
            onChange={(e) => setEditMeeting({ ...editMeeting!, startTime: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="שם לקוח"
            value={editMeeting?.clientName || ''}
            onChange={(e) => setEditMeeting({ ...editMeeting!, clientName: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="אימייל לקוח" // Edit email field
            value={editMeeting?.clientEmail || ''}
            onChange={(e) => setEditMeeting({ ...editMeeting!, clientEmail: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Select
            value={editMeeting?.serviceType || ''}
            onChange={(e) => setEditMeeting({ ...editMeeting!, serviceType: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="">בחר סוג שירות</MenuItem>
            {services.map(service => (
              <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>
            ))}
          </Select>

          <Button variant="contained" color="primary" onClick={() => handleEditMeeting(editMeeting!.id)} sx={{ width: '100%' }}>
            ערוך פגישה
          </Button>

        </Box>
      </Modal>

      {/* Display meetings in a grid layout */}
      <Grid container spacing={3}>
        {sortedMeetings.map(meeting => (
          <Grid item xs={12} sm={6} md={4} key={meeting.id}>
            <Box sx={{ padding: 2, border: '1px solid #ddd', borderRadius: 2, backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>שם לקוח:</strong> {meeting.clientName}</Typography>
              <Typography variant="body2"><strong>תאריך:</strong> {meeting.date}</Typography>
              <Typography variant="body2"><strong>שעה התחלה:</strong> {meeting.startTime}</Typography>
              <Typography variant="body2"><strong>סוג שירות:</strong> {serviceTypes[meeting.serviceType]}</Typography>
              <Typography variant="body2"><strong>הערה:</strong> {meeting.note}</Typography>
              <Typography variant="body2"><strong>אימייל לקוח:</strong> {meeting.clientEmail}</Typography> {/* Display email */}

              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setEditMeeting(meeting);
                  setEditModalOpen(true);
                }}
                sx={{ marginTop: 1 }}
              >
                ערוך
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteMeeting(meeting.id)}
                sx={{ marginTop: 1 }}
              >
                מחק
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BusinessMeetings;
