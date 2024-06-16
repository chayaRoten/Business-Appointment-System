import  { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/businessMeetings.css';

const BusinessMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading meetings: {error.message}</p>;

  return (
    <div className="meetings-container">
      <h1>Upcoming Meetings</h1>
      <ul className="meetings-list">
        {meetings.map(meeting => (
          <li key={meeting.id} className="meeting-item">
            <h2>{meeting.details}</h2>
            <p>Date: {new Date(meeting.date).toLocaleDateString()}</p>
            <p>Time: {meeting.startTime}</p>
            <p>Duration: {meeting.duration}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessMeetings;
