import React, { useState } from 'react';
import '../../styles/meetingScheduler.css';

const MeetingScheduler = ({ addMeeting }) => {
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMeeting = {
      serviceType,
      date,
      time,
      note,
      clientName,
      clientPhone,
    };
    addMeeting(newMeeting);
    setServiceType('');
    setDate('');
    setTime('');
    setNote('');
    setClientName('');
    setClientPhone('');
  };

  return (
    <div className="meeting-scheduler">
      <h2>קביעת פגישה</h2>
      <form onSubmit={handleSubmit}>
        <label>
          סוג השירות:
          <input
            type="text"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
          />
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
          טלפון:
          <input
            type="tel"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            required
          />
        </label>
        <button type="submit">קבע פגישה</button>
      </form>
    </div>
  );
};

export default MeetingScheduler;
