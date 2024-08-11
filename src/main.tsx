import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import { AdminLayout } from './components/admin/adminLayout.component.tsx';
import './index.css'
import { Home } from './components/user/home.component.tsx';
import BusinessDetails from './components/admin/businessDetails.component.tsx';
import SignIn from './components/signIn.component.tsx';
import SignUp from './components/signUp.component.tsx';
import { AuthProvider } from './context/auth.context.tsx';
import BusinessServices from './components/admin/businessServices.component.tsx';
import BusinessMeetings from './components/admin/businessMeetings.component.tsx';
import Users from './components/admin/users.component.tsx';
import AboutBusiness from './components/user/aboutBusiness.component.tsx';
import { UserLayout } from './components/user/userLayout.component.tsx';
import Projects from './components/user/projects.component.tsx';
import MeetingScheduler from './components/user/meetingScheduler.component.tsx';
import UserMeetings from './components/user/userMeetings.component.tsx';

const router = createBrowserRouter([
  {
    path: "",
    Component: App,
    children: [
      {
        path: "/",
        Component: UserLayout,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "signin",
        element: <AuthProvider><div><SignIn></SignIn></div></AuthProvider>,
      },
      {
        path: "signup",
        element: <AuthProvider><div><SignUp></SignUp></div></AuthProvider>,
      },
      {
        path: "/about",
        Component: AboutBusiness,
      },
      {
        path: "/projects",
        Component: Projects,
      },
      {
        path: "/meetings",
        Component: MeetingScheduler,
      },
      {
        path: "/my-meetings",
        Component: UserMeetings,
      }
    ]
  },
  {
  path: "admin",
    Component: AdminLayout,
    children: [
      {
        path: "business-details",
        Component: BusinessDetails,
      },
      {
        path: "business-services",
        Component: BusinessServices,
      },
      {
        path: "business-meetings",
        Component: BusinessMeetings,
      },
      {
        path: "users",
        Component: Users,
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
