import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/meetings.style.css';
import '../../styles/global.css';

const UserMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceTypes>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder] = useState('date'); // State for sorting
  const [filters, setFilters] = useState({ serviceType: '', dateRange: '' }); // State for filters

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
        const meetingsResponse = await axios.get('http://localhost:3000/meetings', config);
        setMeetings(meetingsResponse.data);

        // Fetch service types
        const servicesResponse = await axios.get('http://localhost:3000/services', config);
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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading meetings: {error}</p>;

  return (
    <div className="meetings-container">
      <h1>רשימת הפגישות</h1>

      <div className="filter-options">
        <label htmlFor="serviceType"> סנן לפי סוג שירות: </label>
        <select id="serviceType" name="serviceType" value={filters.serviceType} onChange={handleFilterChange}>
          <option value="">בחר סוג שירות</option>
          {Object.entries(serviceTypes).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>

        <label htmlFor="dateRange"> סנן לפי תאריך: </label>
        <input
          type="date"
          id="dateRange"
          name="dateRange"
          value={filters.dateRange}
          onChange={handleDateChange}
        />
      </div>
      {filteredMeetings.length === 0 ? (
        <div className="no-meetings-message">
          <p>אין לך פגישות.</p>
          <a href="/meetings" className="schedule-link">לקביעת פגישה לחץ כאן</a>
        </div>
      ) : (
      <ul className="meetings-list">
        {sortedMeetings.map(meeting => (
          <li key={meeting.id} className="meeting-item">
            <p><strong>סוג שירות:</strong> {serviceTypes[meeting.serviceType] || meeting.serviceType}</p>
            <p><strong>תאריך:</strong> {new Date(meeting.date).toLocaleDateString()}</p>
            <p><strong>שעה:</strong> {meeting.startTime}</p>
            <p><strong>שם:</strong> {meeting.clientName}</p>
            <p><strong>אימייל:</strong> <span className="meeting-email">{meeting.clientEmail}</span></p>
            <p><strong>הערה:</strong> {meeting.note}</p>
            <p className="duration">משך הפגישה: 45 דקות</p>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default UserMeetings;
