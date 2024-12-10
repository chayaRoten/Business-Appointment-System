// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../../styles/users.style.css';
// import '../../styles/global.css';


// const Users = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const tokenString = localStorage.getItem('jwtToken');
//         const token = tokenString !== null ? JSON.parse(tokenString) : null;
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         };

//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, config);
//         setUsers(response.data);
//         setLoading(false);
//       } catch (error) {
//         if (error instanceof Error)
//           setError(error);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading users: {error.message}</p>;

//   return (
//     <div className="users-container">
//       <h1>Customer List</h1>
//       <ul className="users-list">
//         {users.map(user => (
//           <li key={user.id} className="user-item">
//             <h2>{user.username}</h2>
//             <p>Email: {user.email}</p>
//             <p>Role: {user.role}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Users;


import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import { teal } from '@mui/material/colors';
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
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, config);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', color: '#ff4d4d', fontSize: '18px' }}>
        Error loading users: {error.message}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: 3,
        backgroundColor: '#fafafa',
        borderRadius: 2,
        boxShadow: 3,
        marginTop: '60px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'flex-start',
        }}
      >
        {users.map((user) => (
          <Box
            key={user.id}
            sx={{
              backgroundColor: '#ffffff',
              padding: 2,
              borderRadius: 2,
              boxShadow: 1,
              width: '250px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              },
            }}
          >
            <Typography variant="h6" sx={{ color: teal[500] }}>
              {user.username}
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              <strong>Role:</strong> {user.role}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Users;