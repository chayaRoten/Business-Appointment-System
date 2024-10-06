import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/users.style.css';
import '../../styles/global.css';


const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const tokenString = localStorage.getItem('jwtToken');
        const token = tokenString !== null ? JSON.parse(tokenString) : null;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, config);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error)
          setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div className="users-container">
      <h1>Customer List</h1>
      <ul className="users-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;