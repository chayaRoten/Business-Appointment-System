import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/meetings.style.css';
import '../../styles/global.css';

const BusinessMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMeeting, setNewMeeting] = useState({
    note: '',
    date: '',
    startTime: '',
    clientEmail: '',
    serviceType: '',
    clientName: ''
  });
  const [editMeeting, setEditMeeting] = useState(null);
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [serviceTypes, setServiceTypes] = useState({});
  const [sortOrder, setSortOrder] = useState('date');
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
      const meetingsResponse = await axios.get('http://localhost:3000/meetings', config);
      setMeetings(meetingsResponse.data);

      // Fetch service types
      const servicesResponse = await axios.get('http://localhost:3000/services', config);
      const services = servicesResponse.data.reduce((acc, service) => {
        acc[service.id] = service.name;
        return acc;
      }, {});
      setServiceTypes(services);
      setServices(servicesResponse.data); // Store services if needed

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddMeeting = async () => {
    try {
      const config = getTokenConfig();
      const response = await axios.post('http://localhost:3000/meetings', newMeeting, config);
      setMeetings([...meetings, response.data]);
      setNewMeeting({
        note: '',
        date: '',
        startTime: '',
        clientEmail: '',
        serviceType: '',
        clientName: ''
      });
      setShowModal(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleEditMeeting = async (id) => {
    if (!editMeeting.date || !editMeeting.startTime || !editMeeting.clientName || !editMeeting.serviceType || !editMeeting.clientEmail) {
      alert('אנא מלא את כל השדות');
      return;
    }
    try {
      const config = getTokenConfig();
      console.log(editMeeting);
      const response = await axios.put(`http://localhost:3000/meetings/${id}`, editMeeting, config);
      setMeetings(meetings.map(meeting => (meeting.id === id ? response.data : meeting)));
      setEditMeeting(null);
    } catch (error) {
      console.error('Error updating meeting:', error);
      setError(error);
    }
  };

  const handleDeleteMeeting = async (id) => {
    try {
      const config = getTokenConfig();
      await axios.delete(`http://localhost:3000/meetings/${id}`, config);
      setMeetings(meetings.filter(meeting => meeting.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  // Filter and sort meetings
  const filteredMeetings = meetings.filter(meeting => {
    const meetsServiceType = filters.serviceType ? meeting.serviceType === filters.serviceType : true;
    const meetsDateRange = filters.dateRange ? new Date(meeting.date) >= new Date(filters.dateRange) : true;
    const meetsClientName = filters.clientName ? meeting.clientName.toLowerCase().includes(filters.clientName.toLowerCase()) : true;
    return meetsServiceType && meetsDateRange && meetsClientName;
  });

  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    if (sortOrder === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOrder === 'clientName') {
      return a.clientName.localeCompare(b.clientName);
    }
    return 0;
  });

  if (loading) return <p>טוען...</p>;
  if (error) return <p>שגיאה בהטענת הפגישות: {error.message}</p>;

  return (
    <div className="meetings-container">
      <h1>רשימת הפגישות</h1>

      <div className="sort-options">
        <label htmlFor="sortOrder"> סדר לפי: </label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="date">תאריך</option>
          <option value="clientName">שם לקוח</option>
        </select>
      </div>

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
          onChange={handleFilterChange}
        />
      </div>

      <ul className="meetings-list">
        {sortedMeetings.map(meeting => (
          <li key={meeting.id} className="meeting-item">
            {editMeeting && editMeeting.id === meeting.id ? (
              <div className="meeting-form">
                <input
                  type="text"
                  placeholder="הערה"
                  value={editMeeting.note}
                  onChange={(e) => setEditMeeting({ ...editMeeting, note: e.target.value })}
                />
                <input
                  type="date"
                  value={editMeeting.date}
                  onChange={(e) => setEditMeeting({ ...editMeeting, date: e.target.value })}
                />
                <input
                  type="time"
                  value={editMeeting.startTime}
                  onChange={(e) => setEditMeeting({ ...editMeeting, startTime: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="שם הלקוח"
                  value={editMeeting.clientName}
                  onChange={(e) => setEditMeeting({ ...editMeeting, clientName: e.target.value })}
                />
                <select
                  value={editMeeting.serviceType}
                  onChange={(e) => setEditMeeting({ ...editMeeting, serviceType: e.target.value })}
                >
                  <option value="">בחר סוג שירות</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
                <input
                  type="email"
                  placeholder="אימייל לקוח"
                  value={editMeeting.clientEmail}
                  onChange={(e) => setEditMeeting({ ...editMeeting, clientEmail: e.target.value })}
                />
                <button onClick={() => handleEditMeeting(meeting.id)}>שמור</button>
                <button onClick={() => setEditMeeting(null)}>ביטול</button>
              </div>
            ) : (
              <div className="meeting-details">
                <p><strong>סוג שירות:</strong> {serviceTypes[meeting.serviceType]}</p>
                <p><strong>תאריך:</strong> {meeting.date}</p>
                <p><strong>שעה התחלה:</strong> {meeting.startTime}</p>
                <p><strong>שם לקוח:</strong> {meeting.clientName}</p>
                <p><strong>אימייל לקוח:</strong> {meeting.clientEmail}</p>
                <p><strong>הערה:</strong> {meeting.note}</p>
                <button onClick={() => setEditMeeting(meeting)}>ערוך</button>
                <button onClick={() => handleDeleteMeeting(meeting.id)}>מחק</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>הוסף פגישה</h2>
            <input
              type="text"
              placeholder="הערה"
              value={newMeeting.note}
              onChange={(e) => setNewMeeting({ ...newMeeting, note: e.target.value })}
            />
            <input
              type="date"
              value={newMeeting.date}
              onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
            />
            <input
              type="time"
              value={newMeeting.startTime}
              onChange={(e) => setNewMeeting({ ...newMeeting, startTime: e.target.value })}
            />
            <input
              type="text"
              placeholder="שם הלקוח"
              value={newMeeting.clientName}
              onChange={(e) => setNewMeeting({ ...newMeeting, clientName: e.target.value })}
            />
            <select
              value={newMeeting.serviceType}
              onChange={(e) => setNewMeeting({ ...newMeeting, serviceType: e.target.value })}
            >
              <option value="">בחר סוג שירות</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
            <input
              type="email"
              placeholder="אימייל לקוח"
              value={newMeeting.clientEmail}
              onChange={(e) => setNewMeeting({ ...newMeeting, clientEmail: e.target.value })}
            />
            <button onClick={handleAddMeeting}>הוסף</button>
            <button onClick={() => setShowModal(false)}>סגור</button>
          </div>
        </div>
      )}

      <button onClick={() => setShowModal(true)}>הוסף פגישה חדשה</button>
    </div>
  );
};

export default BusinessMeetings;
