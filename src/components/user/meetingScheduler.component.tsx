import React, { useState, useEffect } from 'react';
import '../../styles/meetingScheduler.css';
import axios from 'axios';

const MeetingScheduler = ({ addMeeting }) => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [error, setError] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    try {
      const tokenString = localStorage.getItem('jwtToken');
      const token = tokenString !== null ? JSON.parse(tokenString) : null;
      if (!token) {
        setIsAuthorized(false);
        return;
      }
    } catch (error) {
      setIsAuthorized(false);
      console.error('Failed to fetch service types', error);
    }

    const fetchServiceTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/services', {
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

  const handleSubmit = async (e) => {
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
      serviceType,
      date,
      time,
      note,
      clientName,
      clientEmail
    };

    try {
      const response = await axios.post('http://localhost:3000/meetings', newMeeting, config);
      if (response.status === 201 || response.status === 200) {
        addMeeting(newMeeting);
        setServiceType('');
        setDate('');
        setTime('');
        setNote('');
        setClientName('');
        setClientEmail('');
      } else {
        throw new Error('Failed to schedule meeting');
      }
    } catch (error) {
      setError('Failed to schedule meeting');
    }
  };

  if (!isAuthorized) {
    return <div>
      <p>אין גישה לעמוד</p>
      <p><a href="/signin">התחבר</a> / <a href="/signup">הרשם</a> בכדי לקבוע פגישה</p>
    </div>;
  }

  return (
    <div className="meeting-scheduler">
      <h2>קביעת פגישה</h2>
      <form onSubmit={handleSubmit}>
        <label>
          סוג השירות:
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
          >
            <option value="">בחר סוג שירות</option>
            {serviceTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </label>
        <label>
          תאריך:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          זמן:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
        <label>
          הערה לבעל העסק:
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <label>
          שם לקוח:
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </label>
        <label>
          מייל:
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">קבע פגישה</button>
      </form>
    </div>
  );
};

export default MeetingScheduler;
