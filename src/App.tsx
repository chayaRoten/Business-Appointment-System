import './App.css'
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
// import { Outlet } from 'react-router-dom'
import Navbar from './components/user/header.component';
import { Admin } from './components/admin/adminLayout.component';
import BusinessDetails from './components/admin/businessDetails.component';
import { AuthProvider } from './context/auth.context';
import SignIn from './components/signIn.component';
import SignUp from './components/signUp.component';
import { Home } from './components/user/home.component';

function App() {

  return (
    <>
       <Outlet />
    </>
  )
}

export default App
