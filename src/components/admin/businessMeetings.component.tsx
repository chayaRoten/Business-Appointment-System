import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/businessMeetings.css';

const BusinessMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMeeting, setNewMeeting] = useState({ note: '', date: '', startTime: '', clientEmail: '', serviceType: '' , clientName:''});
  const [editMeeting, setEditMeeting] = useState(null);


  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const tokenString = localStorage.getItem('jwtToken');
        const token = tokenString !== null ? JSON.parse(tokenString) : null;
        const config = {
          headers: {
            authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('http://localhost:3000/meetings', config);
        setMeetings(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const handleAddMeeting = async () => {
    try {
      const tokenString = localStorage.getItem('jwtToken');
      const token = tokenString !== null ? JSON.parse(tokenString) : null;
      const config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post('http://localhost:3000/meetings', newMeeting, config);
      setMeetings([...meetings, response.data]);
      setNewMeeting({ note: '', date: '', startTime: '', clientEmail: '', serviceType: '',clientName:'' });
    } catch (error) {
      setError(error);
    }
  };

  const handleEditMeeting = async (id) => {
    try {
      const tokenString = localStorage.getItem('jwtToken');
      const token = tokenString !== null ? JSON.parse(tokenString) : null;
      const config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };

      const response = await axios.put(`http://localhost:3000/meetings/${id}`, editMeeting, config);
      setMeetings(meetings.map(meeting => (meeting.id === id ? response.data : meeting)));
      setEditMeeting(null);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteMeeting = async (id) => {
    try {
      const tokenString = localStorage.getItem('jwtToken');
      const token = tokenString !== null ? JSON.parse(tokenString) : null;
      const config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };

      await axios.delete(`http://localhost:3000/meetings/${id}`, config);
      setMeetings(meetings.filter(meeting => meeting.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading meetings: {error.message}</p>;

  return (
    <div className="meetings-container">
      <h1>רשימת הפגישות</h1>
      <ul className="meetings-list">
        {meetings.map(meeting => (
          <li key={meeting.id} className="meeting-item">
            {editMeeting && editMeeting.id === meeting.id ? (
              <>
                <input
                  type="text"
                  value={editMeeting.note}
                  onChange={(e) => setEditMeeting({ ...editMeeting, details: e.target.value })}
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
                  value={editMeeting.clientName}
                  onChange={(e) => setEditMeeting({ ...editMeeting, startTime: e.target.value })}
                />
                 <input
                  type="text"
                  value={editMeeting.serviceType}
                  onChange={(e) => setEditMeeting({ ...editMeeting, startTime: e.target.value })}
                />
                <input
                  type="email"
                  value={editMeeting.clientEmail}
                  onChange={(e) => setEditMeeting({ ...editMeeting, duration: e.target.value })}
                />
                <button onClick={() => handleEditMeeting(meeting.id)}>Save</button>
              </>
            ) : (
              <>
                <h2>{meeting.note}</h2>
                <p>Date: {new Date(meeting.date).toLocaleDateString()}</p>
                <p>Time: {meeting.startTime}</p>
                <p>Duration: {meeting.serviceType}</p>
                <p>Name: {meeting.clientName}</p>
                <p>Email: {meeting.clientEmail}</p>
                <button onClick={() => setEditMeeting(meeting)}>Edit</button>
                <button onClick={() => handleDeleteMeeting(meeting.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2>Add New Meeting</h2>
      <input
        type="text"
        placeholder="note"
        value={newMeeting.note}
        onChange={(e) => setNewMeeting({ ...newMeeting, note: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date"
        value={newMeeting.date}
        onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
      />
      <input
        type="time"
        placeholder="Start Time"
        value={newMeeting.startTime}
        onChange={(e) => setNewMeeting({ ...newMeeting, startTime: e.target.value })}
      />
      <input
        type="text"
        placeholder="ServiceType"
        value={newMeeting.serviceType}
        onChange={(e) => setNewMeeting({ ...newMeeting, duration: e.target.value })}
      />
      <input
        type="text"
        placeholder="ClientEmail"
        value={newMeeting.clientEmail}
        onChange={(e) => setNewMeeting({ ...newMeeting, duration: e.target.value })}
      />
      <input
        type="text"
        placeholder="ClientName"
        value={newMeeting.clientName}
        onChange={(e) => setNewMeeting({ ...newMeeting, duration: e.target.value })}
      />
      <button onClick={handleAddMeeting}>Add Meeting</button>
    </div>
  );
};

export default BusinessMeetings;
