import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/businessServices.style.css';
import '../../styles/global.css';

const BusinessServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newService, setNewService] = useState({ name: '', cost: '' });
  const [editService, setEditService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  const getTokenConfig = () => {
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString ? JSON.parse(tokenString) : null;
    return {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
  };

  // שימוש ב-useCallback כדי למנוע שינוי מיותר של הפונקציה updateServices
  const updateServices = useCallback(async () => {
    try {
      const config = getTokenConfig();
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/services`, config);
      setServices(response.data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []); // ה-useCallback מבטיח שהפונקציה לא תשתנה אלא אם כן אחד מהתנאים שלה ישתנו

  useEffect(() => {
    updateServices();
  }, [updateServices]); // עכשיו ה-useEffect יפול על updateServices בצורה נכונה

  // שאר הקוד נשאר כמו שהיה
  const handleAddService = async () => {
    try {
      const config = getTokenConfig();
      await axios.post(`${import.meta.env.VITE_API_URL}/services`, newService, config);
      setNewService({ name: '', cost: '' });
      setShowModal(false);
      updateServices(); // Refresh services list
    } catch (error) {
      setError((error as Error).message);
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
      updateServices(); // Refresh services list
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleDeleteService = async (id: number) => {
    try {
      const config = getTokenConfig();
      await axios.delete(`${import.meta.env.VITE_API_URL}/services/${id}`, config);
      updateServices(); // Refresh services list
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>Error loading services: {typeof error === 'string' ? error : 'An error occurred'}</p>;
  }

  // Handle changes to the input fields
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (modalMode === 'add') {
      setNewService({ ...newService, name: e.target.value });
    } else if (editService) {
      setEditService({ ...editService, name: e.target.value });
    }
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (modalMode === 'add') {
      setNewService({ ...newService, cost: e.target.value });
    } else if (editService) {
      setEditService({ ...editService, cost: parseFloat(e.target.value) });
    }
  };

  return (
    <div className="services-container">
      <h1>השירותים שלנו</h1>
      <div className="sort-options">
        <button className="add-service" onClick={() => { setModalMode('add'); setShowModal(true); }}>Add New Service</button>
      </div>
      <ul className="services-list">
        {services.map(service => (
          <li key={service.id} className="service-item">
            <h2>{service.name}</h2>
            <p>Price: {service.cost}$</p>
            <p>Id: {service.id}</p>
            <button onClick={() => { setEditService(service); setModalMode('edit'); setShowModal(true); }}>Edit</button>
            <button onClick={() => handleDeleteService(service.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalMode === 'add' ? 'Add Service' : 'Edit Service'}</h2>
            <input
              type="text"
              placeholder="Service Name"
              value={modalMode === 'add' ? newService.name : (editService ? editService.name : '')}
              onChange={handleNameChange}
            />
            <input
              type="number"
              placeholder="Service Cost"
              value={modalMode === 'add' ? newService.cost : editService ? editService.cost : 0}
              onChange={handleCostChange}
            />
            {modalMode === 'add' ? (
              <button onClick={handleAddService}>Add</button>
            ) : (
              <button onClick={handleEditService}>Save</button>
            )}
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessServices;