import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/businessServices.style.css';
import '../../styles/global.css';

const BusinessServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newService, setNewService] = useState({ name: '', cost: '' });
  const [editService, setEditService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [serviceIdToFetch, setServiceIdToFetch] = useState('');

  const getTokenConfig = () => {
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString ? JSON.parse(tokenString) : null;
    return {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
  };

  const updateServices = async () => {
    try {
      const config = getTokenConfig();
      const response = await axios.get('http://localhost:3000/services', config);
      setServices(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateServices();
  }, []);

  const handleAddService = async () => {
    try {
      const config = getTokenConfig();
      await axios.post('http://localhost:3000/services', newService, config);
      setNewService({ name: '', cost: '' });
      setShowModal(false);
      updateServices(); // Refresh services list
    } catch (error) {
      setError(error);
    }
  };

  const handleEditService = async () => {
    if (!editService.name || !editService.cost) {
      alert('Please fill out all fields');
      return;
    }
    try {
      const config = getTokenConfig();
      await axios.put(`http://localhost:3000/services/${editService.id}`, editService, config);
      setEditService(null);
      setShowModal(false);
      updateServices(); // Refresh services list
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const config = getTokenConfig();
      await axios.delete(`http://localhost:3000/services/${id}`, config);
      updateServices(); // Refresh services list
    } catch (error) {
      setError(error);
    }
  };

  const fetchServiceById = async (id) => {
    try {
      const config = getTokenConfig();
      const response = await axios.get(`http://localhost:3000/services/${id}`, config);
      setEditService(response.data);
      setModalMode('edit');
      setShowModal(true);
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading services: {error.message}</p>;

  return (
    <div className="services-container">
      <h1>השירותים שלנו</h1>
      <div className="sort-options">
        <button className="add-service" onClick={() => { setModalMode('add'); setShowModal(true); }}>Add New Service</button>
        <input
          type="text"
          placeholder="Service ID"
          value={serviceIdToFetch}
          onChange={(e) => setServiceIdToFetch(e.target.value)}
        />
        <button onClick={() => fetchServiceById(serviceIdToFetch)}>Fetch Service by ID</button>
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
              value={modalMode === 'add' ? newService.name : editService.name}
              onChange={(e) => modalMode === 'add'
                ? setNewService({ ...newService, name: e.target.value })
                : setEditService({ ...editService, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Service Cost"
              value={modalMode === 'add' ? newService.cost : editService.cost}
              onChange={(e) => modalMode === 'add'
                ? setNewService({ ...newService, cost: e.target.value })
                : setEditService({ ...editService, cost: e.target.value })}
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
