# Business Appointment System

A web-based system for managing business appointments, designed for both business owners and customers.  
Business owners can manage business details, services, appointments, and customer data, while customers can schedule appointments and view business information.

## Features

### Admin Interface:
- Protected by authentication (username and password).
- Manage business details (contact info, services, etc.).
- Add, edit, and cancel appointments.
- View customer list and appointment history.

### User Interface:
- View business details and services.
- Schedule an appointment with service type, date, time, and notes for the business owner.
- View appointment confirmation.

### Admin Functions:
- Appointments can be sorted by date or customer name.
- Customers cannot cancel appointments; they must contact the business owner.

## Technologies Used:
- **Frontend:** React
- **Backend:** Node.js
- **Authentication:** Custom authentication for admin login
- **State Management:** React state or Context API

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/Business-Appointment-System.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run the app:
   ```
   npm start
   ```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
