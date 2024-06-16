import AdminNavbar from "./adminHeader.component"
import axios from 'axios';


export const AdminLayout = async () => {

    const tokenString = localStorage.getItem('jwtToken');
        const token = tokenString !== null ? JSON.parse(tokenString) : null;
        const response = await axios.get('http://localhost:3000/business', {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

    return  <div>
        <h4>gf</h4>
        { response.status ==401 || response.status==403 ? <h3>You are not authorized to perform this action</h3> : <AdminNavbar />}
        {/* <AdminNavbar /> */}
        {/* <h1>Welcome, Manager!</h1> */}

    </div>
}