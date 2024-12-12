// import { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';
// import '../../styles/businessServices.style.css';
// import '../../styles/global.css';

// const BusinessServices = () => {
//   const [services, setServices] = useState<Service[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [newService, setNewService] = useState({ name: '', cost: '' });
//   const [editService, setEditService] = useState<Service | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

//   const getTokenConfig = () => {
//     const tokenString = localStorage.getItem('jwtToken');
//     const token = tokenString ? JSON.parse(tokenString) : null;
//     return {
//       headers: {
//         authorization: `Bearer ${token}`
//       }
//     };
//   };

//   // שימוש ב-useCallback כדי למנוע שינוי מיותר של הפונקציה updateServices
//   const updateServices = useCallback(async () => {
//     try {
//       const config = getTokenConfig();
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}/services`, config);
//       setServices(response.data);
//     } catch (error) {
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError('An unknown error occurred');
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, []); // ה-useCallback מבטיח שהפונקציה לא תשתנה אלא אם כן אחד מהתנאים שלה ישתנו

//   useEffect(() => {
//     updateServices();
//   }, [updateServices]); // עכשיו ה-useEffect יפול על updateServices בצורה נכונה

//   // שאר הקוד נשאר כמו שהיה
//   const handleAddService = async () => {
//     try {
//       const config = getTokenConfig();
//       await axios.post(`${import.meta.env.VITE_API_URL}/services`, newService, config);
//       setNewService({ name: '', cost: '' });
//       setShowModal(false);
//       updateServices(); // Refresh services list
//     } catch (error) {
//       setError((error as Error).message);
//     }
//   };

//   const handleEditService = async () => {
//     if (!editService?.name || !editService?.cost) {
//       alert('Please fill out all fields');
//       return;
//     }
//     try {
//       const config = getTokenConfig();
//       await axios.put(`${import.meta.env.VITE_API_URL}/services/${editService.id}`, editService, config);
//       setEditService(null);
//       setShowModal(false);
//       updateServices(); // Refresh services list
//     } catch (error) {
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError('An unknown error occurred');
//       }
//     }
//   };

//   const handleDeleteService = async (id: number) => {
//     try {
//       const config = getTokenConfig();
//       await axios.delete(`${import.meta.env.VITE_API_URL}/services/${id}`, config);
//       updateServices(); // Refresh services list
//     } catch (error) {
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError('An unknown error occurred');
//       }
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) {
//     return <p>Error loading services: {typeof error === 'string' ? error : 'An error occurred'}</p>;
//   }

//   // Handle changes to the input fields
//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (modalMode === 'add') {
//       setNewService({ ...newService, name: e.target.value });
//     } else if (editService) {
//       setEditService({ ...editService, name: e.target.value });
//     }
//   };

//   const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (modalMode === 'add') {
//       setNewService({ ...newService, cost: e.target.value });
//     } else if (editService) {
//       setEditService({ ...editService, cost: parseFloat(e.target.value) });
//     }
//   };

//   return (
//     <div className="services-container">
//       <h1>השירותים שלנו</h1>
//       <div className="sort-options">
//         <button className="add-service" onClick={() => { setModalMode('add'); setShowModal(true); }}>Add New Service</button>
//       </div>
//       <ul className="services-list">
//         {services.map(service => (
//           <li key={service.id} className="service-item">
//             <h2>{service.name}</h2>
//             <p>Price: {service.cost}$</p>
//             <p>Id: {service.id}</p>
//             <button onClick={() => { setEditService(service); setModalMode('edit'); setShowModal(true); }}>Edit</button>
//             <button onClick={() => handleDeleteService(service.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>{modalMode === 'add' ? 'Add Service' : 'Edit Service'}</h2>
//             <input
//               type="text"
//               placeholder="Service Name"
//               value={modalMode === 'add' ? newService.name : (editService ? editService.name : '')}
//               onChange={handleNameChange}
//             />
//             <input
//               type="number"
//               placeholder="Service Cost"
//               value={modalMode === 'add' ? newService.cost : editService ? editService.cost : 0}
//               onChange={handleCostChange}
//             />
//             {modalMode === 'add' ? (
//               <button onClick={handleAddService}>Add</button>
//             ) : (
//               <button onClick={handleEditService}>Save</button>
//             )}
//             <button onClick={() => setShowModal(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BusinessServices;










import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Modal, TextField, CircularProgress } from '@mui/material';
import { teal } from '@mui/material/colors';

interface Service {
  id: string;
  name: string;
  cost: number;
}

const BusinessServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
const [newService, setNewService] = useState<{ name: string; cost: number }>({ name: '', cost: 0 });
  const [editService, setEditService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const getTokenConfig = () => {
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString ? JSON.parse(tokenString) : null;
    return {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
  };

  const updateServices = useCallback(async () => {
    try {
      const config = getTokenConfig();
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/services`, config);
      setServices(response.data);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateServices();
  }, [updateServices]);

  const handleAddService = async () => {
    try {
      const config = getTokenConfig();
      await axios.post(`${import.meta.env.VITE_API_URL}/services`, newService, config);
      setNewService({ name: '', cost: 0 });
      setShowModal(false);
      updateServices();
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An unknown error occurred'));
    }
  };

  const handleEditService = async () => {
    if (!editService?.name || !editService?.cost) {
      alert('Please fill out all fields');
      return;
    }
    try {
      const config = getTokenConfig();
      await axios.put(`${import.meta.env.VITE_API_URL}/services/${editService.id}`, editService, config);
      setEditService(null);
      setShowModal(false);
      updateServices();
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An unknown error occurred'));
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const config = getTokenConfig();
      await axios.delete(`${import.meta.env.VITE_API_URL}/services/${id}`, config);
      updateServices();
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An unknown error occurred'));
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading services: {error.message}</Typography>;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (modalMode === 'add') {
      setNewService({ ...newService, name: e.target.value });
    } else if (editService) {
      setEditService({ ...editService, name: e.target.value });
    }
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (modalMode === 'add') {
      setNewService({ ...newService, cost: parseFloat(e.target.value) });
    } else if (editService) {
      setEditService({ ...editService, cost: parseFloat(e.target.value) });
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: 'auto', backgroundColor: 'transparent' }}>
      <Typography variant="h4" align="center" sx={{ color: teal[500], marginBottom: 4 }}>
        השירותים שלנו
      </Typography>
      <Box sx={{ textAlign: 'right', marginBottom: 3 }}>
        <Button variant="contained" sx={{ backgroundColor: teal[500] }} onClick={() => { setModalMode('add'); setShowModal(true); }}>
          הוסף שירות חדש
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {services.map((service) => (
          <Box
            key={service.id}
            sx={{
              backgroundColor: '#ffffff',
              color: '#333333',
              borderRadius: 2,
              padding: 2,
              flex: '1 1 calc(25% - 16px)',
              boxShadow: 2,
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
            }}
          >
            <Typography variant="h6">{service.name}</Typography>
            <Typography variant="body1">מחיר: {service.cost}$</Typography>
            <Typography variant="body2">Id: {service.id}</Typography>
            <Box sx={{ marginTop: 1 }}>
              <Button variant="contained" sx={{ backgroundColor: teal[500] }} onClick={() => { setEditService(service); setModalMode('edit'); setShowModal(true); }}>
                ערוך
              </Button>
              <Button variant="outlined" sx={{ borderColor: teal[500], color: teal[500] }} onClick={() => handleDeleteService(service.id)}>
                מחק
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={{
          backgroundColor: '#ffffff', padding: 3, borderRadius: 2, width: '100%', maxWidth: 500, margin: 'auto', marginTop: '10%',
        }}>
          <Typography variant="h6" sx={{ color: teal[500], marginBottom: 2 }}>
            {modalMode === 'add' ? 'הוסף שירות' : 'ערוך שירות'}
          </Typography>
          <TextField
            label="שם השירות"
            variant="outlined"
            fullWidth
            value={modalMode === 'add' ? newService.name : (editService ? editService.name : '')}
            onChange={handleNameChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="מחיר השירות"
            variant="outlined"
            fullWidth
            value={modalMode === 'add' ? newService.cost : (editService ? editService.cost : '')}
            onChange={handleCostChange}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {modalMode === 'add' ? (
              <Button variant="contained" sx={{ backgroundColor: teal[500] }} onClick={handleAddService}>
                הוסף
              </Button>
            ) : (
              <Button variant="contained" sx={{ backgroundColor: teal[500] }} onClick={handleEditService}>
                שמור
              </Button>
            )}
            <Button variant="outlined" sx={{ borderColor: teal[500], color: teal[500] }} onClick={() => setShowModal(false)}>
              סגור
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BusinessServices;
