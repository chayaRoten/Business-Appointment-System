import  { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/businessServices.css'; 

const BusinessServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const tokenString = localStorage.getItem('jwtToken');
        const token = tokenString !== null ? JSON.parse(tokenString) : null;
        const config = {
          headers: {
            authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('http://localhost:3000/services', config);
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading services: {error.message}</p>;

  return (
    <div className="services-container">
      <h1>השירותים שלנו</h1>
      <ul className="services-list">
        {services.map(service => (
          <li key={service.id} className="service-item">
            <h2>{service.name}</h2>
            {/* <p>{service.description}</p> */}
            <p>Price: {service.cost}$</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessServices;
